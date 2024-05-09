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
let UploadController = class UploadController {
    async uploadImage(req, res) {
        const image = req.file;
        const imageResult = await this.imageRepo.createImage(image);
        return (0, _response.default)(res, {
            metadata: imageResult
        });
    }
    constructor(){
        _define_property(this, "imageRepo", new _imagerepository.default());
    }
};
_ts_decorate([
    (0, _decorators.Post)('/', _uploader.default.single('image')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], UploadController.prototype, "uploadImage", null);
UploadController = _ts_decorate([
    (0, _decorators.Controller)('/upload')
], UploadController);
const _default = UploadController;

//# sourceMappingURL=upload.controller.js.map