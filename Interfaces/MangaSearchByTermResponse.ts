import { Manga } from "../models";

export default interface MangaSearchByTermResponse {
    categories: Array<String>,
    groups: Array<String>,
    series: Array<Manga>
}