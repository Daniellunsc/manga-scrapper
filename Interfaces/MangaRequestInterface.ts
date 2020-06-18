import { AxiosResponse } from 'axios';
import { MangaSearchVolumes, MangaSearchByTermResponse } from '.';

export default interface MangaRequest {
    searchByTerm(term: string): Promise<AxiosResponse<MangaSearchByTermResponse>>;

    searchVolumes(id: string, page: string): Promise<AxiosResponse<MangaSearchVolumes>>;
}
