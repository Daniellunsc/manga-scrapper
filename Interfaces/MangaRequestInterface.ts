import { AxiosResponse } from 'axios'
import MangaSearchByTermResponse from './MangaSearchByTermResponse';
export default interface MangaRequest {
    searchByTerm(term: String): Promise<AxiosResponse<MangaSearchByTermResponse>>;

    searchVolumes(id: String, page: String): Promise<AxiosResponse<MangaSearchByTermResponse>>;
}