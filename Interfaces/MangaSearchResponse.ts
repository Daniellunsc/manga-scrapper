import { Manga, Chapter } from '../models';

export interface MangaSearchByTermResponse {
    categories: Array<string>,
    groups: Array<string>,
    series: Array<Manga>
}

export interface MangaSearchVolumes {
    chapters: Array<Chapter> | Boolean
}
