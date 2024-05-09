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
const _mongooseslugupdater = _interop_require_default(require("mongoose-slug-updater"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { Schema } = _mongoose.default;
_mongoose.default.plugin(_mongooseslugupdater.default);
const productSchema = new Schema({
    name: {
        type: String,
        required: [
            true,
            'Product name must be required.'
        ]
    },
    slug: {
        type: String,
        slug: 'name',
        index: true,
        slugPaddingSize: 3,
        unique: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category',
        required: [
            true,
            'Product category must be required.'
        ]
    },
    images: [
        {
            type: Schema.ObjectId,
            ref: 'Image'
        }
    ],
    price: {
        type: Number,
        min: [
            0,
            'Product {VALUE} must be least 0'
        ],
        required: [
            true,
            'Product {VALUE} must be required.'
        ]
    },
    quantity: {
        type: Number,
        min: [
            0,
            'Product {VALUE} must be least 0'
        ],
        required: [
            true,
            'Product quantity must be required.'
        ]
    },
    detail: {
        size: String,
        color: String,
        brand: String,
        origin: String
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});
const Product = _mongoose.default.model('Product', productSchema);
const _default = Product;

//# sourceMappingURL=product.model.js.map