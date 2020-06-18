export default interface Chapter {
    id_serie: string,
    id_chapter: string,
    name: string,
    chapter_name: string,
    number: string,
    date: string,
    date_created: string,
    releases: {
        [key: string]: {
            id_release: string,
            link: string,
        };
    },
    link: string,
    id_release: string,
}