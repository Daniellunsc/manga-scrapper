"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MangaBuilder = /** @class */ (function () {
    function MangaBuilder() {
        this._manga = {
            name: "",
            is_complete: false,
            link: "",
            id_serie: ""
        };
    }
    MangaBuilder.prototype.name = function (name) {
        this._manga.name = name;
        return this;
    };
    MangaBuilder.prototype.is_complete = function (is_complete) {
        this._manga.is_complete = is_complete;
        return this;
    };
    MangaBuilder.prototype.link = function (link) {
        this._manga.link = link;
        return this;
    };
    MangaBuilder.prototype.id_serie = function (id_serie) {
        this._manga.id_serie = id_serie;
        return this;
    };
    MangaBuilder.prototype.build = function () {
        return this._manga;
    };
    return MangaBuilder;
}());
exports.default = MangaBuilder;
