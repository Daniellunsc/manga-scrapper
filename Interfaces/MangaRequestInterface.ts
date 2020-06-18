import { AxiosResponse } from 'axios'
import { MangaSearchVolumes, MangaSearchByTermResponse } from '.';
export default interface MangaRequest {
    searchByTerm(term: String): Promise<AxiosResponse<MangaSearchByTermResponse>>;

    searchVolumes(id: String, page: String): Promise<AxiosResponse<MangaSearchVolumes>>;
}