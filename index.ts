import { Manga, Chapter } from './models';
import MangaEngineService from './services/MangaEngine';

async function run(): Promise<void> {
  const myManga: Array<Manga> = await MangaEngineService.searchByTerm('Kimetsu no Yaiba');
  const myVolumes: Array<Chapter> = await MangaEngineService.searchVolumes(myManga[0].id_serie, '1');
  const targetVolume = myVolumes[0];
  console.log(targetVolume);
}

run();
