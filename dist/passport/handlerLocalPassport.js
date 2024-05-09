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
const _passport = _interop_require_default(require("passport"));
const _passportlocal = _interop_require_default(require("passport-local"));
const _accountmodel = _interop_require_default(require("../models/account.model"));
const _usermodel = _interop_require_default(require("../models/user.model"));
const _response = require("../utils/response");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const LocalStrategy = _passportlocal.default.Strategy;
const handlerLocalPassport = (app)=>{
    _passport.default.use(new LocalStrategy(async (username, password, done)=>{
        var _this;
        const account = (_this = await _accountmodel.default.findOne({
            username
        })) === null || _this === void 0 ? void 0 : _this.toJSON();
        if (!account) {
            return done(new _response.UnauthorizedException('Username or password is incorrect'));
        }
        const storedPassword = account.password;
        if (storedPassword !== password) {
            return done(new _response.UnauthorizedException('Username or password is incorrect'));
        } else {
            var _User_findOne;
            const user = await ((_User_findOne = _usermodel.default.findOne({
                account: account === null || account === void 0 ? void 0 : account._id
            })) === null || _User_findOne === void 0 ? void 0 : _User_findOne.populate({
                path: 'account',
                select: {
                    password: 0
                }
            }));
            return done(null, user);
        }
    }));
    _passport.default.serializeUser(function(user, done) {
        var _user_account;
        done(null, (user === null || user === void 0 ? void 0 : (_user_account = user.account) === null || _user_account === void 0 ? void 0 : _user_account._id).toString());
    });
    _passport.default.deserializeUser(async function(_id, done) {
        try {
            var _this, _User_findOne;
            const user = (_this = await ((_User_findOne = _usermodel.default.findOne({
                account: _id
            })) === null || _User_findOne === void 0 ? void 0 : _User_findOne.populate({
                path: 'account',
                select: {
                    password: 0
                }
            }))) === null || _this === void 0 ? void 0 : _this.toJSON();
            if (!user) {
                done(new _response.UnauthorizedException('Your session is invalid session'));
            } else {
                done(null, user);
            }
        } catch (error) {
            throw new _response.BadRequestException(error === null || error === void 0 ? void 0 : error.message);
        }
    });
};
const _default = handlerLocalPassport;

//# sourceMappingURL=handlerLocalPassport.js.map