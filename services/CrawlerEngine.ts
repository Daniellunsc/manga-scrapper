import {launch, Page, } from 'puppeteer';
import fs from "fs";
import Axios from "axios";

// TODO: mover para constantes
const IMAGE_SELECTOR = "#reader-wrapper > div.reader-content.fit.horizontal > div.manga-page > div.manga-image > img";
const BUTTON_NEXT_SELECTOR = "#reader-wrapper > div:nth-child(10) > div.page-navigation-wrapper > div > div.page-next"

export default class CrawlerEngine {
    static async downloadAllImages(page: Page, totalPages: number) {
        return new Promise(async (resolve, reject) => {
            let actualPage = 1;
            while(actualPage <= totalPages) {
                const imageFile = await page.$eval(IMAGE_SELECTOR, ((element: any) => element.getAttribute('src')))
                let filePath = `./prints/page_${actualPage}.png`
                await downloadImage(imageFile, filePath)
                await page.$eval(BUTTON_NEXT_SELECTOR, ((element: any) => element.click()))
                actualPage++;
            }
            resolve();
        })
    }
}

// TODO: mover essa função para BaseRequest em APis
async function downloadImage (url: string, path: string) {
    const writer = fs.createWriteStream(path)

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
}