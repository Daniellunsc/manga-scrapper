import MangaRequest from "../Interfaces/MangaRequestInterface";
import { AxiosResponse } from "axios";
import MangaSearchByTermResponse from "../Interfaces/MangaSearchByTermResponse";
import { mangaLivreRequest } from './BaseRequest'
import FormData from 'form-data';

class MangaRequestAPI implements MangaRequest {
    searchByTerm(term: String): Promise<AxiosResponse<MangaSearchByTermResponse>> {
        throw new Error("Method not implemented.");
    }
    searchVolumes(id: String, page: String): Promise<AxiosResponse<MangaSearchByTermResponse>> {
        throw new Error("Method not implemented.");
    }

    static async searchByTerm(term: string): Promise<AxiosResponse<MangaSearchByTermResponse>> {
        const response = await mangaLivreRequest.post('series.json', `search=${term}`);
        return response;
    }

    static async searchVolumes(id: String, page: String): Promise<AxiosResponse<MangaSearchByTermResponse>> {
        return mangaLivreRequest.get('/series.json');
    }
}

export default MangaRequestAPI;