import { Manga } from "../models";

export default interface MangaEngine {
    searchByTerm(term: String): any;

    searchVolumes(manga: Manga): any;
}