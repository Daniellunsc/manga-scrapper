import { AxiosResponse } from 'axios';
import { MangaSearchByTermResponse, MangaSearchVolumes } from '../Interfaces';
import mangaLivreRequest from './BaseRequest';
import MangaRequest from '../Interfaces/MangaRequestInterface';

class MangaRequestAPI implements MangaRequest {
  searchByTerm(term: string): Promise<AxiosResponse<MangaSearchByTermResponse>> {
    this.searchByTerm(term);
    throw new Error('Method not implemented.');
  }

  searchVolumes(id: string, page: string): Promise<AxiosResponse<MangaSearchVolumes>> {
    this.searchVolumes(id, page);
    throw new Error('Method not implemented.');
  }

  static async searchByTerm(term: string): Promise<AxiosResponse<MangaSearchByTermResponse>> {
    const response: AxiosResponse<MangaSearchByTermResponse> = await mangaLivreRequest.post('/lib/search/series.json', `search=${term}`);
    return response;
  }

  static async searchVolumes(id: string, page: string): Promise<AxiosResponse<MangaSearchVolumes>> {
    const response: AxiosResponse<MangaSearchVolumes> = await mangaLivreRequest.get(`/series/chapters_list.json?page=${page}&id_serie=${id}`);
    if (response.data) {
      const chapters = response.data.chapters.map((chapter) => {
        const keyOfScan: string = Object.keys(chapter.releases)[0];
        return {
          ...chapter,
          id_release: chapter.releases[keyOfScan].id_release,
          link: chapter.releases[keyOfScan].link,
        };
      });
      response.data.chapters = chapters;
    }
    return response;
  }
}

export default MangaRequestAPI;
