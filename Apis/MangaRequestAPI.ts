import MangaRequest from "../Interfaces/MangaRequestInterface";
import { AxiosResponse } from "axios";
import { MangaSearchByTermResponse, MangaSearchVolumes } from "../Interfaces";
import { mangaLivreRequest } from './BaseRequest'
import FormData from 'form-data';

class MangaRequestAPI implements MangaRequest {
    searchByTerm(term: String): Promise<AxiosResponse<MangaSearchByTermResponse>> {
        throw new Error("Method not implemented.");
    }
    searchVolumes(id: String, page: String): Promise<AxiosResponse<MangaSearchVolumes>> {
        throw new Error("Method not implemented.");
    }

    static async searchByTerm(term: string): Promise<AxiosResponse<MangaSearchByTermResponse>> {
        const response: AxiosResponse<MangaSearchByTermResponse> = await mangaLivreRequest.post('/lib/search/series.json', `search=${term}`);
        return response;
    }

    static async searchVolumes(id: String, page: String): Promise<AxiosResponse<MangaSearchVolumes>> {
        let response: AxiosResponse<MangaSearchVolumes> = await mangaLivreRequest.get(`/series/chapters_list.json?page=${page}&id_serie=${id}`)
        if (response.data) {
            let chapters = response.data.chapters.map(chapter => {
                let keyOfScan: string = Object.keys(chapter.releases)[0];
                return {
                    ...chapter,
                    id_release: chapter.releases[keyOfScan].id_release,
                    link: chapter.releases[keyOfScan].link,
                }
            })
            response.data.chapters = chapters;
        }
        return response;
    }
}

export default MangaRequestAPI;