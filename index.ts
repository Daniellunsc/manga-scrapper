import { Manga, Chapter } from './models';
import MangaEngineService from './services/MangaEngine';
import CrawlerEngine from "./services/CrawlerEngine";
const puppeteer = require('puppeteer');

async function run(): Promise<void> {
  const myManga: Array<Manga> = await MangaEngineService.searchByTerm('Naruto');
  const myVolumes: Array<Chapter> = await MangaEngineService.searchVolumes(myManga[0].id_serie, '1');
  const targetVolume = myVolumes[0];
  console.log(targetVolume);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://mangalivre.net/${targetVolume.link}`)
  // TODO: mover para constantes
  const totalPages = await page.$eval('#reader-wrapper > div:nth-child(10) > div.page-navigation-wrapper > div > div.page-navigation > span > em:nth-child(2)', ((e: any) => e.innerHTML))
  await CrawlerEngine.downloadAllImages(page, parseInt(totalPages)).then(() => console.log('images finished'))
}



run().then(() => console.log('finished'));
