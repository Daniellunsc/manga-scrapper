import { Manga, Chapter } from "../models";

export interface MangaSearchByTermResponse {
    categories: Array<String>,
    groups: Array<String>,
    series: Array<Manga>
}

export interface MangaSearchVolumes {
    chapters: Array<Chapter>
}