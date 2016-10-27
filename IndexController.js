"use strict";
var IndexController = (function () {
    function IndexController() {
    }
    IndexController.prototype.getIndex = function (req, res, next) {
        res.render('index', { title: 'Node' });
    };
    return IndexController;
}());
exports.IndexController = IndexController;
