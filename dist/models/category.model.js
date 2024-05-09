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
const categorySchema = new Schema({
    name: {
        type: String,
        required: [
            true,
            'Category name must be required.'
        ]
    },
    image: {
        type: Schema.ObjectId,
        ref: 'Image'
    }
}, {
    timestamps: true
});
const Category = _mongoose.default.model('Category', categorySchema);
const _default = Category;

//# sourceMappingURL=category.model.js.map