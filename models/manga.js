class Manga {
    name = '';

    idSeries = '';

    isComplete = false;

    link = '';

    Manga(name, idSeries, isComplete, link) {
      this.name = name;
      this.idSeries = idSeries;
      this.isComplete = isComplete;
      this.link = link;
    }
}

module.exports = Manga;
