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
    CLOUDINARY_KEY: function() {
        return CLOUDINARY_KEY;
    },
    CLOUDINARY_NAME: function() {
        return CLOUDINARY_NAME;
    },
    CLOUDINARY_SECRET: function() {
        return CLOUDINARY_SECRET;
    },
    LOG_DIR: function() {
        return LOG_DIR;
    },
    LOG_FORMAT: function() {
        return LOG_FORMAT;
    },
    MONGOOSE_URI: function() {
        return MONGOOSE_URI;
    },
    NODE_ENV: function() {
        return NODE_ENV;
    },
    ORIGIN: function() {
        return ORIGIN;
    },
    PORT: function() {
        return PORT;
    },
    SECRET_KEY: function() {
        return SECRET_KEY;
    },
    SESSION_KEY: function() {
        return SESSION_KEY;
    }
});
const _dotenv = require("dotenv");
(0, _dotenv.config)();
const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, MONGOOSE_URI, SESSION_KEY } = process.env;
const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

//# sourceMappingURL=index.js.map