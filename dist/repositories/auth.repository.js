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
const _accountmodel = _interop_require_default(require("../models/account.model"));
const _usermodel = _interop_require_default(require("../models/user.model"));
const _filterUndefineOrNull = _interop_require_default(require("../utils/filterUndefineOrNull"));
const _response = require("../utils/response");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AuthRepository = class AuthRepository {
    async register({ username, password, fullname, phone, address }) {
        const isExist = await _accountmodel.default.findOne({
            username
        });
        if (isExist) {
            throw new _response.BadRequestException('Username have already exist.');
        }
        const account = await _accountmodel.default.create((0, _filterUndefineOrNull.default)({
            username,
            password
        }));
        if (!account) {
            throw new _response.BadRequestException('Đã có lỗi');
        }
        const user = await _usermodel.default.create((0, _filterUndefineOrNull.default)({
            fullname,
            phone,
            address,
            account: account === null || account === void 0 ? void 0 : account._id
        }));
        const result = await _usermodel.default.findOne({
            _id: user._id
        }).populate('account').select('-password');
        return result;
    }
    async changePassword({ username, password }) {
        const result = await _accountmodel.default.findOneAndUpdate({
            username
        }, {
            password
        });
        if (!result) {
            throw new _response.BadRequestException('Not found account to change password.');
        }
        return result;
    }
};
const _default = AuthRepository;

//# sourceMappingURL=auth.repository.js.map