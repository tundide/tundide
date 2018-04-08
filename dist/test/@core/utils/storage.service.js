"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var crypt_service_1 = require("./crypt.service");
var StorageService = (function () {
    function StorageService(cryptService) {
        this.cryptService = cryptService;
    }
    StorageService.prototype.get = function (key, persistent) {
        var item = null;
        if (persistent) {
            item = localStorage.getItem(key);
        }
        else {
            item = sessionStorage.getItem(key);
        }
        if (item != null) {
            item = this.cryptService.decrypt(item);
        }
        return JSON.parse(item);
    };
    StorageService.prototype.getAndRemove = function (key, persistent) {
        var item = null;
        if (persistent) {
            item = localStorage.getItem(key);
        }
        else {
            item = sessionStorage.getItem(key);
        }
        if (item != null) {
            item = this.cryptService.decrypt(item);
        }
        this.remove(key, persistent);
        return JSON.parse(item);
    };
    StorageService.prototype.set = function (key, value, persistent) {
        var val = this.cryptService.encrypt(JSON.stringify(value));
        if (persistent) {
            localStorage.setItem(key, val);
        }
        else {
            sessionStorage.setItem(key, val);
        }
    };
    StorageService.prototype.remove = function (key, persistent) {
        if (persistent) {
            localStorage.removeItem(key);
        }
        else {
            sessionStorage.removeItem(key);
        }
    };
    StorageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [crypt_service_1.CryptService])
    ], StorageService);
    return StorageService;
}());
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map