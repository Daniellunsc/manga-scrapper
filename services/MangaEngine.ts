import MangaEngineInterface from "../Interfaces";
import { Manga } from "../models";

export default class MangaEngineService implements MangaEngineInterface {
    searchByTerm(term: String) {
        console.log('searchByTerm');
    }

    searchVolumes(manga: Manga) {
        console.log('searchVolumes');
    }
}