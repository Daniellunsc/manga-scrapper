const Horseman = require('node-horseman');
const horseman = new Horseman();
var fs = require('fs');
const MangaEngine = require('./models/MangaEngine');
const Manga = require('./models/manga')

// Implementado depois que descobri a API
async function run() {
    let listManga = await MangaEngine.searchManga("Kimetsu no");
    let selected = listManga[0]
    let manga = new Manga(selected.name, selected.id_serie, selected.is_complete, selected.link);
    let volumes = await MangaEngine.searchMangaVolumes(manga.id_serie, 2)
    console.log(volumes)
}

run();


// Faz o scrape da página do mangá.
// PS: JS Vanilla é uma bosta.
function scrapeMangaPage(pageUrl) {
    horseman
        .open(pageUrl)
        .wait(3000)
        .evaluate(() => {
            return new Promise((resolve, reject) => {
                let intervalId = setInterval(() => {
                    let event = document.createEvent('MouseEvents');
                    event.initEvent("click", true, true);
                    let totalOfElements = document.querySelectorAll("#chapter-list > div.container-box.default.color-brown > h2 > span")[1].textContent;
                    let numberTotal = parseInt(totalOfElements)
                    let countOfElements = parseInt(document.querySelector("#chapter-list > div.container-box.default.color-brown > ul").childElementCount);
                    let btn = document.querySelector('#chapter-list > div.container-box.default.color-brown > div');
                    countOfElements = parseInt(document.querySelector("#chapter-list > div.container-box.default.color-brown > ul").childElementCount);
                    if (countOfElements !== numberTotal) {
                        btn.dispatchEvent(event)
                    } else {
                        clearInterval(intervalId)
                        let elements = document.querySelectorAll("#chapter-list > div.container-box.default.color-brown > ul > li > a")
                        let arrayOfLinks = [];
                        elements.forEach((element, index) => {
                            arrayOfLinks.push(element.attributes.getNamedItem('href'))
                            if (index === elements.length - 1) {
                                resolve({ count: elements.length, links: arrayOfLinks })
                            }
                        })
                    }
                })
            })
        })
        .then(({ count }) => console.log('Total de mangás: ' + count))
        .wait(3000)
        .screenshotBase64('JPEG')
        .then((text) => {
            fs.writeFileSync('mangaPage.jpeg', text.split(';base64,').pop(), { encoding: 'base64' }, () => {
                console.log('Arquivo criado')
            })
        })
        .close()
}

// Faz a busca na tela inicial do site.

// horseman
//     .open('https://mangalivre.net')
//     .status()
//     .then((statusCode) => {
//         if (statusCode >= 200 && statusCode < 300) {
//             console.log('Página aberta com sucesso!')
//             return
//         } else
//             throw 'Página não carregada'
//     })
//     .evaluate(() => {
//         var event = document.createEvent('MouseEvents');
//         event.initEvent("click", true, true);
//         let btn = document.querySelector('button.btn-search');
//         btn.dispatchEvent(event)
//     })
//     .type('input[class="form-control ui-autocomplete-input"]', 'Kimetsu')
//     .wait(3000)
//     .attribute('ul[class="active"]>li>a', 'href')
//     .then((url) => {
//         scrapeMangaPage(baseUrl + url);
//     })
//     .close()

// console.log(mangaUrl)