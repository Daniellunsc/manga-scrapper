import {Manga, MangaBuilder} from './models';
import MangaEngineService from './services/MangaEngine';

async function run(): Promise<void> {
     const myManga: any = await MangaEngineService.searchByTerm('Kimetsu');
     console.log(myManga)
}

run();