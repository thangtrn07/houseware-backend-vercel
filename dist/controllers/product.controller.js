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
const _uploader = _interop_require_default(require("../middlewares/uploader"));
const _imagerepository = _interop_require_default(require("../repositories/image.repository"));
const _response = _interop_require_default(require("../utils/response/response"));
const _productrepository = _interop_require_default(require("../repositories/product.repository"));
const _response1 = require("../utils/response");
const _permission = require("../middlewares/permission");
const _roles = require("../types/roles");
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
let ProductController = class ProductController {
    async getAllProduct(req, res) {
        const { page = 1, limit = 20, filter = '' } = req.query;
        const { result, pagination } = await this.productRepo.getAllProduct({
            page,
            limit,
            filter
        });
        return (0, _response.default)(res, {
            metadata: result,
            pagination
        });
    }
    async searchProduct(req, res) {
        const { page = 1, limit = 20, name = '', fromPrice = 0, toPrice, sort = 'createdAt' } = req.query;
        const { result, pagination } = await this.productRepo.searchProduct({
            page,
            limit,
            name,
            fromPrice,
            toPrice,
            sort
        });
        return (0, _response.default)(res, {
            metadata: result,
            pagination
        });
    }
    async getProductById(req, res) {
        const _id = req.params.id;
        const result = await this.productRepo.getProductById(_id);
        return (0, _response.default)(res, {
            metadata: result
        });
    }
    async createProduct(req, res) {
        const { name, category, price, quantity, detail, description } = req.body;
        const file = req.files;
        const images = await this.imageRepo.createMultipleImage(file);
        if (!images || images.length <= 0) {
            throw new _response1.BadRequestException('Product images not be empty.');
        }
        const product = await this.productRepo.createProduct({
            name,
            images,
            category,
            price,
            quantity,
            detail,
            description
        });
        return (0, _response.default)(res, {
            metadata: product
        });
    }
    async updateProduct(req, res) {
        const { _id, name, category, price, quantity, detail, description } = req.body;
        const product = await this.productRepo.updateProduct({
            _id,
            name,
            category,
            price,
            quantity,
            detail,
            description
        });
        return (0, _response.default)(res, {
            metadata: product
        });
    }
    async deleteProduct(req, res) {
        const _id = req.params.id;
        const result = await this.productRepo.deleteProduct(_id);
        return (0, _response.default)(res, {
            metadata: result
        });
    }
    constructor(){
        _define_property(this, "imageRepo", new _imagerepository.default());
        _define_property(this, "productRepo", new _productrepository.default());
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
], ProductController.prototype, "getAllProduct", null);
_ts_decorate([
    (0, _decorators.Get)('/search'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], ProductController.prototype, "searchProduct", null);
_ts_decorate([
    (0, _decorators.Get)('/:id'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
_ts_decorate([
    (0, _decorators.Post)('/', (0, _permission.permission)(_roles.Roles.ADMIN), _uploader.default.array('image')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
_ts_decorate([
    (0, _decorators.Put)('/', (0, _permission.permission)(_roles.Roles.ADMIN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
_ts_decorate([
    (0, _decorators.Delete)('/:id', (0, _permission.permission)(_roles.Roles.ADMIN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
ProductController = _ts_decorate([
    (0, _decorators.Controller)('/products')
], ProductController);
const _default = ProductController;

//# sourceMappingURL=product.controller.js.map