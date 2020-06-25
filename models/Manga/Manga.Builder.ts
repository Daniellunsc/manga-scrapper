import Manga from './Manga';

export default class MangaBuilder {
    private readonly _manga: Manga;

    constructor() {
      this._manga = {
        name: '',
        is_complete: false,
        link: '',
        id_serie: '',
      };
    }

    name(name: string) : MangaBuilder {
      this._manga.name = name;
      return this;
    }

    is_complete(is_complete: boolean) : MangaBuilder {
      this._manga.is_complete = is_complete;
      return this;
    }

    link(link: string) : MangaBuilder {
      this._manga.link = link;
      return this;
    }

    id_serie(id_serie: string) : MangaBuilder {
      this._manga.id_serie = id_serie;
      return this;
    }

    build(): Manga {
      return this._manga;
    }
}
