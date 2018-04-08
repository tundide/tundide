"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var io = require("socket.io-client");
var SocketService = (function () {
    function SocketService() {
        this.host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
    }
    SocketService.prototype.connectSocket = function (userId) {
        this.socket = io(this.host, {
            query: "userId=" + userId
        });
    };
    SocketService.prototype.logout = function (userId) {
        var _this = this;
        this.socket.emit('logout', userId);
        var observable = new rxjs_1.Observable(function (observer) {
            _this.socket.on('logoutResponse', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.sendMessage = function (message) {
        this.socket.emit('sendMessage', message);
    };
    SocketService.prototype.receiveMessages = function () {
        var _this = this;
        var observable = new rxjs_1.Observable(function (observer) {
            _this.socket.on('sendMessageResponse', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService = __decorate([
        core_1.Injectable()
    ], SocketService);
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map