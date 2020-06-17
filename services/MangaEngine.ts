import MangaEngineInterface from "../Interfaces";
import { Manga } from "../models";
import MangaRequestAPI from "../Apis/MangaRequestAPI";

export default class MangaEngineService implements MangaEngineInterface {
    searchByTerm(term: String) {
        throw new Error("Method not implemented.");
    }
    static async searchByTerm(term: string): Promise<Array<Manga>> {
        console.log('searchByTerm');
        const response = await MangaRequestAPI.searchByTerm(term);
        return response.data.series;
    }

    searchVolumes(manga: Manga) {
        console.log('searchVolumes');
    }
}