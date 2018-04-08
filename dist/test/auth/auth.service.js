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
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var socket_service_1 = require("../shared/socket.service");
var storage_service_1 = require("../@core/utils/storage.service");
var md5_1 = require("ts-md5/dist/md5");
var AuthService = (function () {
    function AuthService(http, socketService, storageService) {
        this.http = http;
        this.socketService = socketService;
        this.storageService = storageService;
        this.onSignin = new core_1.EventEmitter();
        this.onLogout = new core_1.EventEmitter();
        this.onUserDataLoad = new core_1.EventEmitter();
    }
    AuthService.prototype.loggedIn = function () {
        var token = this.storageService.get('token', true);
        if (token) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthService.prototype.loadUserData = function (token) {
        return this.http.get('/auth/userdata');
    };
    AuthService.prototype.confirm = function (userid) {
        return this.http.patch('/auth/confirm', { 'userid': userid });
    };
    AuthService.prototype.getUserCredentials = function () {
        return this.storageService.get('user');
    };
    AuthService.prototype.signin = function (email, password) {
        var usr = {
            email: email,
            password: md5_1.Md5.hashStr(password)
        };
        return this.http.post('/auth/signin', usr);
    };
    AuthService.prototype.signout = function (name, email, password, token) {
        var usr = {
            email: email,
            password: md5_1.Md5.hashStr(password),
            token: token
        };
        return this.http.post('/auth/signout', usr);
    };
    AuthService.prototype.logout = function () {
        var user = this.getUserCredentials();
        this.socketService.logout(user.shortId);
        this.storageService.remove('token', true);
        this.storageService.remove('user');
        this.onLogout.emit();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AuthService.prototype, "onSignin", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AuthService.prototype, "onLogout", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AuthService.prototype, "onUserDataLoad", void 0);
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            socket_service_1.SocketService,
            storage_service_1.StorageService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map