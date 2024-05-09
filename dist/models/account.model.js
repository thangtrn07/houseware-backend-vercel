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
const _account = require("../types/account");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { Schema } = _mongoose.default;
const accountSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [
            true,
            '{VALUE} must be required.'
        ]
    },
    password: {
        type: String,
        required: [
            true,
            '{VALUE} must be required.'
        ]
    },
    provider: {
        type: String,
        enum: Object.values(_account.Accounts),
        default: _account.Accounts.LOCAL
    },
    providerId: String
}, {
    timestamps: true
});
const Account = _mongoose.default.model('Account', accountSchema);
const _default = Account;

//# sourceMappingURL=account.model.js.map