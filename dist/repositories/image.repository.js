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
const _imagemodel = _interop_require_default(require("../models/image.model"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let ImageRepository = class ImageRepository {
    async createImage(data) {
        if (!data) {
            return null;
        }
        const image = await _imagemodel.default.create({
            imageUrl: data.path,
            publicId: data.fieldname
        });
        return image;
    }
    async createMultipleImage(data) {
        if (!data || data.length <= 0) {
            return null;
        }
        const images = data.map((item)=>({
                imageUrl: item.path,
                publicId: item.fieldname
            }));
        const result = await _imagemodel.default.insertMany(images);
        return result;
    }
};
const _default = ImageRepository;

//# sourceMappingURL=image.repository.js.map