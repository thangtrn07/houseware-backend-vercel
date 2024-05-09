"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
require("express-async-errors");
const _express = _interop_require_default(require("express"));
const _morgan = _interop_require_default(require("morgan"));
const _cors = _interop_require_default(require("cors"));
const _helmet = _interop_require_default(require("helmet"));
const _compression = _interop_require_default(require("compression"));
const _cookieparser = _interop_require_default(require("cookie-parser"));
const _expresssession = _interop_require_default(require("express-session"));
const _connectmongodbsession = _interop_require_default(require("connect-mongodb-session"));
const _passport = _interop_require_default(require("passport"));
const _config = require("./config");
const _db = _interop_require_default(require("./config/db"));
const _controllerRegister = _interop_require_default(require("./utils/controllerRegister"));
const _handleError = require("./middlewares/handleError");
const _usercontroller = _interop_require_default(require("./controllers/user.controller"));
const _authcontroller = _interop_require_default(require("./controllers/auth.controller"));
const _productcontroller = _interop_require_default(require("./controllers/product.controller"));
const _categorycontroller = _interop_require_default(require("./controllers/category.controller"));
const _ordercontroller = _interop_require_default(require("./controllers/order.controller"));
const _uploadcontroller = _interop_require_default(require("./controllers/upload.controller"));
const _homecontroller = _interop_require_default(require("./controllers/home.controller"));
const _handlerLocalPassport = _interop_require_default(require("./passport/handlerLocalPassport"));
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let App = class App {
    constructor(){
        _define_property(this, "app", void 0);
        _define_property(this, "env", void 0);
        _define_property(this, "port", void 0);
        _define_property(this, "MongoDBStore", (0, _connectmongodbsession.default)(_expresssession.default));
        _define_property(this, "connection", async ()=>{
            await (0, _db.default)();
        });
        _define_property(this, "initializeMiddlewares", ()=>{
            this.app.use((0, _morgan.default)(_config.LOG_FORMAT));
            this.app.use((0, _cors.default)({
                origin: _config.ORIGIN,
                credentials: true
            }));
            this.app.use(_express.default.json());
            this.app.use(_express.default.urlencoded({
                extended: true
            }));
            this.app.use((0, _cookieparser.default)());
            this.app.use((0, _helmet.default)());
            this.app.use((0, _compression.default)());
            this.app.set("trust proxy", 1);
            const store = new this.MongoDBStore({
                uri: _config.MONGOOSE_URI,
                collection: 'session'
            });
            this.app.use((0, _expresssession.default)({
                store: store,
                secret: _config.SESSION_KEY,
                resave: false,
                saveUninitialized: false,
                proxy: true,
                cookie: {
                    secure: true,
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: 'none'
                }
            }));
            this.app.use(_passport.default.initialize());
            this.app.use(_passport.default.session());
            (0, _handlerLocalPassport.default)(this.app);
        });
        _define_property(this, "initializeRoutes", ()=>{
            (0, _controllerRegister.default)(this.app, [
                _authcontroller.default,
                _usercontroller.default,
                _categorycontroller.default,
                _productcontroller.default,
                _ordercontroller.default,
                _uploadcontroller.default,
                _homecontroller.default
            ]);
        });
        _define_property(this, "initializeSwagger", ()=>{});
        _define_property(this, "initializeErrorHandling", ()=>{
            this.app.use(_handleError.handleError.NotFound);
            this.app.use(_handleError.handleError.InternalServer);
        });
        _define_property(this, "listen", ()=>{
            this.app.listen(this.port, ()=>{
                console.log(`=================================`);
                console.log(`======= ENV: ${this.env} =======`);
                console.log(`🚀 App listening on the port ${this.port}`);
                console.log(`=================================`);
            });
        });
        this.app = (0, _express.default)();
        this.env = _config.NODE_ENV || 'development';
        this.port = _config.PORT || 5000;
        this.connection();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeSwagger();
        this.initializeErrorHandling();
    }
};
const app = new App();
app.listen();

//# sourceMappingURL=server.js.map