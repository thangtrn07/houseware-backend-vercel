"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Controller;
    }
});
const _metadatakey = _interop_require_default(require("../utils/metadata.key"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function Controller(basePath = '', ...middlewares) {
    return (target)=>{
        const controller = {
            basePath: basePath,
            middlewares: middlewares
        };
        Reflect.defineMetadata(_metadatakey.default.BASE_PATH, controller, target);
    };
}

//# sourceMappingURL=Controller.js.map