import MangaRequest from "../Interfaces/MangaRequestInterface";
import { AxiosResponse } from "axios";
import {MangaSearchByTermResponse, MangaSearchVolumes} from "../Interfaces";
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
        const response: AxiosResponse<MangaSearchVolumes> = await mangaLivreRequest.get(`/series/chapters_list.json?page=${page}&id_serie=${id}`)
        return response;
    }
}

export default MangaRequestAPI;