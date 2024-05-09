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
const _express = _interop_require_default(require("express"));
const _metadatakey = _interop_require_default(require("./metadata.key"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function controllerRegister(app, controllers) {
    const info = [];
    controllers.forEach((controller)=>{
        const controllerInstance = new controller();
        const baseController = Reflect.getMetadata(_metadatakey.default.BASE_PATH, controller);
        const routers = Reflect.getMetadata(_metadatakey.default.ROUTER, controller);
        const expresRouter = _express.default.Router();
        routers.forEach(({ method, handlerName, handlerPath, middlewares })=>{
            expresRouter[method](handlerPath, ...baseController.middlewares, ...middlewares, controllerInstance[String(handlerName)].bind(controllerInstance));
            info.push({
                api: `${method.toLocaleLowerCase()} ${'/api' + baseController.basePath + handlerPath}`,
                handler: `${controllerInstance.constructor.name} - ${String(handlerName)}`
            });
        });
        app.use('/api' + baseController.basePath, expresRouter);
    });
    console.table(info);
}
const _default = controllerRegister;

//# sourceMappingURL=controllerRegister.js.map