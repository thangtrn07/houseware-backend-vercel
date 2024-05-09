"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    destroy: function() {
        return destroy;
    }
});
const _multerstoragecloudinary = require("multer-storage-cloudinary");
const _cloudinary = _interop_require_default(require("../config/cloudinary"));
const _multer = _interop_require_default(require("multer"));
const _response = require("../utils/response");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const storage = new _multerstoragecloudinary.CloudinaryStorage({
    cloudinary: _cloudinary.default,
    params: ()=>{
        return {
            folder: 'housewares'
        };
    }
});
const uploader = (0, _multer.default)({
    storage,
    fileFilter: async (req, file, cb)=>{
        const whitelist = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp'
        ];
        if (!whitelist.includes(file.mimetype)) {
            return cb(new _response.BadRequestException('This file is not allowed'));
        }
        cb(null, true);
    }
});
const destroy = async (public_id)=>{
    try {
        const { result } = await _cloudinary.default.uploader.destroy(public_id);
        if (result === 'not found') {
            return 'Not found image to delete';
        } else if (result === 'ok') {
            return 'Deleted successfully';
        }
        return result;
    } catch (error) {
        return 'Delete failed.';
    }
};
const _default = uploader;

//# sourceMappingURL=uploader.js.map