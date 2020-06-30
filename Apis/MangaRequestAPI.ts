import {AxiosResponse} from 'axios';
import {MangaSearchByTermResponse, MangaSearchVolumes} from '../Interfaces';
import mangaLivreRequest from './BaseRequest';

class MangaRequestAPI{
  static async searchByTerm(term: string): Promise<AxiosResponse<MangaSearchByTermResponse>> {
    return await mangaLivreRequest.post('/lib/search/series.json', `search=${term}`);
  }

  static async searchVolumes(id: string, page: string | number): Promise<AxiosResponse<MangaSearchVolumes>> {
    return await mangaLivreRequest.get(`/series/chapters_list.json?page=${page}&id_serie=${id}`);
  }
}

export default MangaRequestAPI;
