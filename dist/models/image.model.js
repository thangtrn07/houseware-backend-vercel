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
const _mongoose = _interop_require_default(require("mongoose"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { Schema } = _mongoose.default;
const imageSchema = new Schema({
    imageUrl: String,
    publicId: String,
    default: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const Image = _mongoose.default.model('Image', imageSchema);
const _default = Image;

//# sourceMappingURL=image.model.js.map