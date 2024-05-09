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
const _orderrepository = _interop_require_default(require("../repositories/order.repository"));
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
let OrderController = class OrderController {
    async getAllOrder(req, res) {
        const { page, limit = 20, orderBy } = req.query;
        const { result, pagination } = await this.orderRepo.getAllOrder({
            page,
            limit,
            orderBy
        });
        return (0, _response.default)(res, {
            metadata: result,
            pagination
        });
    }
    async createOrder(req, res) {
        const { items, status, totalPrice, note, address, phone, orderBy } = req.body;
        const result = await this.orderRepo.createOrder({
            items,
            status,
            totalPrice,
            note,
            address,
            phone,
            orderBy
        });
        return (0, _response.default)(res, {
            metadata: result
        });
    }
    async updateOrder(req, res) {
        const { _id, status } = req.body;
        const result = await this.orderRepo.updateOrder({
            _id,
            status
        });
        return (0, _response.default)(res, {
            metadata: result
        });
    }
    constructor(){
        _define_property(this, "orderRepo", new _orderrepository.default());
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
], OrderController.prototype, "getAllOrder", null);
_ts_decorate([
    (0, _decorators.Post)('/', (0, _permission.permission)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
_ts_decorate([
    (0, _decorators.Put)('/', (0, _permission.permission)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
OrderController = _ts_decorate([
    (0, _decorators.Controller)('/order')
], OrderController);
const _default = OrderController;

//# sourceMappingURL=order.controller.js.map