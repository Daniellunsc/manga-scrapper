import {Page, } from 'puppeteer';
import fs from "fs";
import Axios from "axios";
import {Chapter, Manga} from "../models";
import {launch} from 'puppeteer';
import {MangaEngineService} from "./index";

// TODO: mover para constantes
const IMAGE_SELECTOR = "#reader-wrapper > div.reader-content.fit.horizontal > div.manga-page > div.manga-image > img";
const BUTTON_NEXT_SELECTOR = "#reader-wrapper > div:nth-child(10) > div.page-navigation-wrapper > div > div.page-next"
const TOTAL_PAGES_SELECTOR =  "#reader-wrapper > div:nth-child(10) > div.page-navigation-wrapper > div > div.page-navigation > span > em:nth-child(2)"
const BASEPATH = './downloads'
const MANGA_LIVRE_BASE = "https://mangalivre.net/"

export default class CrawlerEngine {

    static async downloadAllVolumesFromManga(manga: Manga): Promise<void> {
        const volumes: Array<Chapter> = await MangaEngineService.searchAllVolumes(manga.id_serie);
        const browser = await launch();
        const page = await browser.newPage();
        for(const volume of volumes) {
            await page.goto(`${MANGA_LIVRE_BASE}${volume.link}`, {timeout: 0, waitUntil: "load"})
            const totalPages = await page.$eval(TOTAL_PAGES_SELECTOR, ((e: Element) => e.innerHTML))
            const imagesToDownload = await CrawlerEngine.fetchImagesLinks(page, parseInt(totalPages));
            await CrawlerEngine.downloadImageList(imagesToDownload, manga, volume);
        }
    }

    static async downloadAllVolumesFromMangaByTerm(term: string): Promise<void> {
        const mangaList: Array<Manga> = await MangaEngineService.searchByTerm(term);
        const manga = mangaList[0];
        await this.downloadAllVolumesFromManga(manga)
    }


    static buildImagePath(imageFullPathString: string, chapterId: string, fullPath: string): string{
        const imageIdentifier = imageFullPathString.split('/').pop();
        const imageName = `${chapterId}_${imageIdentifier}`
        return `${fullPath}${imageName}`
    }

    static async fetchImagesLinks(page: Page, totalPages: number): Promise<Array<string>> {
        let actualPage = 1;
        const imageArray: Array<string> = [];
        while(actualPage <= totalPages) {
            const imageFile: string | null = await page.$eval(IMAGE_SELECTOR, ((element: Element) => element.getAttribute('src')))
            if(imageFile) {
                imageArray.push(imageFile);
            }
            actualPage++;
            await page.$eval(BUTTON_NEXT_SELECTOR, ((element: any) => element.click()));
        }
        return imageArray;
    }

    static async downloadImageList(images: Array<string>, manga: Manga, chapter: Chapter): Promise<void> {
        const fullPath = `${BASEPATH}/${manga.name}/${chapter.number}/`
        const missingFiles = await this.findMissingFilesInAVolume(images, fullPath, chapter);

        console.log(`Chapter ${chapter.number} have: ${missingFiles.length} missing files`)
        if(missingFiles.length > 0) {
            console.log(`Downloading chapter ${chapter.number}º missing files`)
            missingFiles.map(async image => {
                const imageIdentifier = image.split('/').pop();
                const imageName = `${chapter.id_chapter}_${imageIdentifier}`
                await this.downloadImage(image, `${fullPath}${imageName}`)
            })
        }
    }

    static findMissingFilesInAVolume(images: Array<string>, fullPath: string, chapter: Chapter): Promise<Array<string>> {
        return new Promise(async (resolve) =>  {
            const imagesToDownload: Array<string> = [];
            if(fs.existsSync(fullPath)) {
                images.map((image, index) => {
                    const fullPathWithFile = this.buildImagePath(image, chapter.id_chapter, fullPath);
                    if(!fs.existsSync(fullPathWithFile)) {
                        imagesToDownload.push(image)
                    }
                    if(index === images.length - 1) {
                        resolve(imagesToDownload)
                    }
                })
            }
            await this.createFolderIfNotExists(fullPath);
            resolve(images)
        })
    }

    static async downloadImage(url: string, imagePath: string): Promise<void> {
        const writer = fs.createWriteStream(imagePath);
        try {
            const response = await Axios({
                url,
                method: 'GET',
                responseType: 'stream'
            })
            response.data.pipe(writer)
            return new Promise((resolve, reject) => {
                writer.on('finish', resolve)
                writer.on('error', reject)
            })
        } catch (e) {
            return;
        }
    }

    static async createFolderIfNotExists(folder: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if(!fs.existsSync(folder)) {
                fs.mkdir(folder, {recursive: true}, (error) => {
                    if(error) {
                        console.trace();
                        console.error('Error on folder creating')
                        reject()
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        })

    }
}

