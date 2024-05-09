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
const _cloudinary = require("cloudinary");
const _ = require(".");
_cloudinary.v2.config({
    cloud_name: _.CLOUDINARY_NAME,
    api_key: _.CLOUDINARY_KEY,
    api_secret: _.CLOUDINARY_SECRET
});
const _default = _cloudinary.v2;

//# sourceMappingURL=cloudinary.js.map