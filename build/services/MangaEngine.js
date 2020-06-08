"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MangaEngineService = /** @class */ (function () {
    function MangaEngineService() {
    }
    MangaEngineService.prototype.searchByTerm = function (term) {
        console.log('searchByTerm');
    };
    MangaEngineService.prototype.searchVolumes = function (manga) {
        console.log('searchVolumes');
    };
    return MangaEngineService;
}());
exports.default = MangaEngineService;
