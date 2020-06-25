import { Manga, Chapter } from '../models';
import MangaRequestAPI from '../Apis/MangaRequestAPI';

export default class MangaEngineService{
  static async searchByTerm(term: string): Promise<Array<Manga>> {
    const response = await MangaRequestAPI.searchByTerm(term);
    return response.data.series;
  }

  static async searchVolumes(id: string, page: string): Promise<Array<Chapter>> {
    const response = await MangaRequestAPI.searchVolumes(id, page);
    return this.extractLinkAndReleaseIdFromArray(response.data.chapters);
  }

  static extractLinkAndReleaseIdFromChapter(chapter: Chapter): Chapter {
    const keyOfScan: string = Object.keys(chapter.releases)[0];
    return {
      ...chapter,
      id_release: chapter.releases[keyOfScan].id_release,
      link: chapter.releases[keyOfScan].link,
    };
  }

  static extractLinkAndReleaseIdFromArray(chapters: Array<Chapter>): Array<Chapter> {
    if(chapters.length > 0) {
      return chapters.map((chapter: Chapter) => {
        return this.extractLinkAndReleaseIdFromChapter(chapter);
      });
    }
    return [];
  }
}
