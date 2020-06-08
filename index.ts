import {Manga, MangaBuilder} from './models';

async function run(): Promise<void> {
     const myManga: Manga = new MangaBuilder().name("Kimetsu").build();
     console.log(myManga)
}

run();