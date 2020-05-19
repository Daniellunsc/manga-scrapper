const fetch = require('node-fetch')

//
class MangaEngine {
    static async searchManga(searchTerm) {
        let mangaList = await fetch("https://mangalivre.net/lib/search/series.json", {
            "headers": {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-requested-with": "XMLHttpRequest",
            },
            "referrer": "https://mangalivre.net/",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": `search=${searchTerm}`,
            "method": "POST",
            "mode": "cors"
        }).then(res => res.json())

        if (mangaList.series) {
            return mangaList.series;
        }
        return []
    }

    static async searchMangaVolumes(mangaId, page) {
        let volumeList = await fetch(`https://mangalivre.net/series/chapters_list.json?page=${page}&id_serie=${mangaId}`, {
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
            },
            "referrer": "https://mangalivre.net/sw-manga.bundle.js?v=2.16.0",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": null,
            "method": "GET",
            "mode": "cors"
        }).then(res => res.json());

        if (volumeList.chapters) {
            return volumeList.chapters;
        }
        return []
    }
}

module.exports = MangaEngine;