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
const _roles = require("../types/roles");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { Schema } = _mongoose.default;
const useSchema = new Schema({
    fullname: {
        type: String,
        required: [
            true,
            'Fullname must be required.'
        ]
    },
    image: {
        type: String,
        default: 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=1060&t=st=1714115540~exp=1714116140~hmac=e909dd4d0e3d1d492972f614ced50a7b10522900c3136dae90660c7263313039'
    },
    phone: String,
    address: String,
    account: {
        type: Schema.ObjectId,
        ref: 'Account'
    },
    role: {
        type: String,
        enum: Object.values(_roles.Roles),
        default: _roles.Roles.STAFF
    }
}, {
    timestamps: true
});
const User = _mongoose.default.model('User', useSchema);
const _default = User;

//# sourceMappingURL=user.model.js.map