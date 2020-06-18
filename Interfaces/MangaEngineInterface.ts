import { Manga, Chapter } from '../models';

export default interface MangaEngine {
    searchByTerm(term: string): Array<Manga>;

    searchVolumes(manga: Manga): Array<Chapter>;
}