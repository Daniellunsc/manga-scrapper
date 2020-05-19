class Manga {
    name = "";
    id_serie = "";
    is_complete = false;
    link = "";
    Manga(name, id_serie, is_complete, link) {
        this.name = name;
        this.id_serie = id_serie;
        this.is_complete = is_complete;
        this.link = link
    }
}

module.exports = Manga

