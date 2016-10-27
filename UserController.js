"use strict";
var UsersController = (function () {
    function UsersController() {
    }
    UsersController.prototype.getUsers = function (req, res, next) {
        var _this = this;
        var users = function () {
            return _this.retrieveUsers();
        };
        res.send(users());
    };
    UsersController.prototype.retrieveUsers = function () {
        return 'TODO: Get the users as json.';
    };
    return UsersController;
}());
exports.UsersController = UsersController;
