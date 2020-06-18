import { MangaEngineInterface } from '../Interfaces';
import { Manga, Chapter } from '../models';
import MangaRequestAPI from '../Apis/MangaRequestAPI';

export default class MangaEngineService implements MangaEngineInterface {
  searchVolumes(manga: Manga): Array<Chapter> {
    this.searchVolumes(manga);
    throw new Error('Method not implemented.');
  }

  searchByTerm(term: string): Array<Manga> {
    this.searchByTerm(term);
    throw new Error('Method not implemented.');
  }

  static async searchByTerm(term: string): Promise<Array<Manga>> {
    const response = await MangaRequestAPI.searchByTerm(term);
    return response.data.series;
  }

  static async searchVolumes(id: string, page: string): Promise<Array<Chapter>> {
    const response = await MangaRequestAPI.searchVolumes(id, page);
    return response.data.chapters;
  }
}
