"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _decorators = require("../decorators");
const _permission = require("../middlewares/permission");
const _uploader = _interop_require_default(require("../middlewares/uploader"));
const _categoryrepository = _interop_require_default(require("../repositories/category.repository"));
const _imagerepository = _interop_require_default(require("../repositories/image.repository"));
const _roles = require("../types/roles");
const _response = _interop_require_default(require("../utils/response/response"));
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CategoryController = class CategoryController {
    async getAllCategory(req, res) {
        const { page, limit = 20, filter = '' } = req.query;
        const { result, pagination } = await this.categoryRepo.getAllCategory({
            page,
            limit,
            filter
        });
        return (0, _response.default)(res, {
            metadata: result,
            pagination
        });
    }
    async createCagetory(req, res) {
        const name = req.body.name;
        const image = req.file;
        const imageResult = await this.imageRepo.createImage(image);
        const categoryResult = await this.categoryRepo.createCategory({
            name,
            image: imageResult === null || imageResult === void 0 ? void 0 : imageResult._id
        });
        return (0, _response.default)(res, {
            metadata: categoryResult
        });
    }
    async updateCategory(req, res) {
        const { _id, name } = req.body;
        const image = req.file;
        const imageResult = await this.imageRepo.createImage(image);
        const categoryResult = await this.categoryRepo.updateCategory({
            _id,
            name,
            image: imageResult === null || imageResult === void 0 ? void 0 : imageResult._id
        });
        return (0, _response.default)(res, {
            metadata: categoryResult
        });
    }
    async deleteCategory(req, res) {
        const _id = req.params.id;
        const result = await this.categoryRepo.deleteCategory(_id);
        return (0, _response.default)(res, {
            metadata: result
        });
    }
    constructor(){
        _define_property(this, "categoryRepo", new _categoryrepository.default());
        _define_property(this, "imageRepo", new _imagerepository.default());
    }
};
_ts_decorate([
    (0, _decorators.Get)('/'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllCategory", null);
_ts_decorate([
    (0, _decorators.Post)('/', (0, _permission.permission)(_roles.Roles.ADMIN), _uploader.default.single('image')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], CategoryController.prototype, "createCagetory", null);
_ts_decorate([
    (0, _decorators.Put)('/', (0, _permission.permission)(_roles.Roles.ADMIN), _uploader.default.single('image')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
_ts_decorate([
    (0, _decorators.Delete)('/:id', (0, _permission.permission)(_roles.Roles.ADMIN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
CategoryController = _ts_decorate([
    (0, _decorators.Controller)('/category')
], CategoryController);
const _default = CategoryController;

//# sourceMappingURL=category.controller.js.map