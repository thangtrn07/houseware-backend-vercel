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
const _authrepository = _interop_require_default(require("../repositories/auth.repository"));
const _response = _interop_require_default(require("../utils/response/response"));
const _passport = _interop_require_default(require("passport"));
const _response1 = require("../utils/response");
const _permission = require("../middlewares/permission");
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
let AuthController = class AuthController {
    login(req, res) {
        return (0, _response.default)(res, {
            message: 'Đăng nhập thành công',
            metadata: req.user
        });
    }
    async register(req, res) {
        const { username, password, fullname, phone, address } = req.body;
        const result = await this.authRepo.register({
            username,
            password,
            fullname,
            phone,
            address
        });
        return (0, _response.default)(res, {
            metadata: result
        });
    }
    async changePassword(req, res) {
        const { username, password } = req.body;
        const result = await this.authRepo.changePassword({
            username,
            password
        });
        return (0, _response.default)(res, {
            metadata: result
        });
    }
    async logout(req, res) {
        req.logOut((err)=>{
            if (err) {
                throw new _response1.BadRequestException(err);
            }
            return (0, _response.default)(res, {
                message: 'Đã đăng xuất thành công'
            });
        });
    }
    async test(req, res) {
        return (0, _response.default)(res, {
            metadata: req.user || null
        });
    }
    constructor(){
        _define_property(this, "authRepo", new _authrepository.default());
    }
};
_ts_decorate([
    (0, _decorators.Post)('/login', _permission.forwardAuthenticated, _passport.default.authenticate('local')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
_ts_decorate([
    (0, _decorators.Post)('/register'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
_ts_decorate([
    (0, _decorators.Post)('/change-password', (0, _permission.permission)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
_ts_decorate([
    (0, _decorators.Get)('/logout', (0, _permission.permission)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
_ts_decorate([
    (0, _decorators.Get)('/me'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "test", null);
AuthController = _ts_decorate([
    (0, _decorators.Controller)('/auth')
], AuthController);
const _default = AuthController;

//# sourceMappingURL=auth.controller.js.map