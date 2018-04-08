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
var auth_service_1 = require("./auth.service");
var storage_service_1 = require("../@core/utils/storage.service");
var SigninComponent = (function () {
    function SigninComponent(authService, storageService) {
        this.authService = authService;
        this.storageService = storageService;
        var token = this.storageService.get('token', true);
        if (token != null) {
            window.location.href = '/admin/#/dashboard';
        }
    }
    SigninComponent.prototype.submitForm = function (form) {
        var _this = this;
        this.authService.signin(form.email, form.password).subscribe(function (data) {
            _this.storageService.set('token', data.toString(), true);
            window.location.href = '/admin/#/dashboard';
        }, function (error) {
            if (error.status === 401) {
                _this.error = error.error.message;
            }
            else if (error.status === 500) {
                _this.error = error.error.message;
            }
        });
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'signin',
            styleUrls: ['signin.component.scss'],
            templateUrl: 'signin.component.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            storage_service_1.StorageService])
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;
//# sourceMappingURL=signin.component.js.map