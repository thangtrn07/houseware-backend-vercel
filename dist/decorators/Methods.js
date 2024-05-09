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
    Delete: function() {
        return Delete;
    },
    Get: function() {
        return Get;
    },
    Post: function() {
        return Post;
    },
    Put: function() {
        return Put;
    }
});
const _metadatakey = _interop_require_default(require("../utils/metadata.key"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var Methods;
function decoratorFactory(method) {
    return function(path = '', ...middlewares) {
        return function(target, propertyKey) {
            const controllerClass = target.constructor;
            const routers = Reflect.hasMetadata(_metadatakey.default.ROUTER, controllerClass) ? Reflect.getMetadata(_metadatakey.default.ROUTER, controllerClass) : [];
            routers.push({
                method,
                middlewares,
                handlerName: propertyKey,
                handlerPath: path
            });
            Reflect.defineMetadata(_metadatakey.default.ROUTER, routers, controllerClass);
        };
    };
}
const Get = decoratorFactory("get");
const Put = decoratorFactory("put");
const Post = decoratorFactory("post");
const Delete = decoratorFactory("delete");

//# sourceMappingURL=Methods.js.map