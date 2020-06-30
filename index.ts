import CrawlerEngine from "./services/CrawlerEngine";

async function run(): Promise<void> {
  await CrawlerEngine.downloadAllVolumesFromMangaByTerm("One Punch Man");
  console.log('DONE!');
}



run().then(() => console.log('finished'));
