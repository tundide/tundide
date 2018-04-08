"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(name, username, shortId, id, roles, firstincome) {
        this.id = id;
        this.name = name;
        this.shortId = shortId;
        this.firstIncome = firstincome;
        this.username = username;
        this.token = '';
        this.roles = roles;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map