import { Manga, Chapter } from '../models';
import MangaRequestAPI from '../Apis/MangaRequestAPI';

export default class MangaEngineService{
  static async searchByTerm(term: string): Promise<Array<Manga>> {
    const response = await MangaRequestAPI.searchByTerm(term);
    return response.data.series;
  }

  static async searchFirstByTerm(term: string): Promise<Manga> {
    const response = await MangaRequestAPI.searchByTerm(term);
    return response.data.series[0];
  }

  static async findVolume(mangaId: string, volumeNumber: string): Promise<Chapter | undefined> {
    let page = 1;
    let shouldStop = false;
    while(!shouldStop) {
      const {data} = await MangaRequestAPI.searchVolumes(mangaId, page);
      const {chapters} = data;
      if(Array.isArray(chapters)) {
        const haveSearchedChapter = chapters.find(chapter => chapter.number === volumeNumber);
        if(haveSearchedChapter) {
          shouldStop = true;
          return this.extractLinkAndReleaseIdFromChapter(haveSearchedChapter);
        } else {
          page++;
          console.log(`Continuando busca: ${page}`)
        }
      } else if (!chapters) {
          shouldStop = true;
      } else {
        page++;
        console.log(`Continuando busca: ${page}`)
      }
    }
    return undefined;
  }

  static async searchVolumes(id: string, page: string | number): Promise<Array<Chapter>> {
    const response = await MangaRequestAPI.searchVolumes(id, page);
    if(Array.isArray(response.data.chapters)) {
      return this.extractLinkAndReleaseIdFromArray(response.data.chapters);
    }
    return [];
  }

  static async searchAllVolumes(id: string): Promise<Array<Chapter>> {
    let page = 1;
    const chaptersList: Array<Chapter> = [];
    let shouldStop = false;
    while(!shouldStop) {
      const {data} = await MangaRequestAPI.searchVolumes(id, page);
      const {chapters} = data;
      if(Array.isArray(chapters)) {
        chaptersList.push(...chapters);
        page++;
      } else {
        shouldStop = true;
      }
    }

    return this.extractLinkAndReleaseIdFromArray(chaptersList);
  }

  private static extractLinkAndReleaseIdFromChapter(chapter: Chapter): Chapter {
    const keyOfScan: string = Object.keys(chapter.releases)[0];
    return {
      ...chapter,
      id_release: chapter.releases[keyOfScan].id_release,
      link: chapter.releases[keyOfScan].link,
    };
  }

  private static extractLinkAndReleaseIdFromArray(chapters: Array<Chapter>): Array<Chapter> {
    if(chapters.length > 0) {
      return chapters.map((chapter: Chapter) => {
        return this.extractLinkAndReleaseIdFromChapter(chapter);
      });
    }
    return [];
  }
}
