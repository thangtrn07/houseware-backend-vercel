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
const _index = require("./index");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const connectMongodb = async (uri)=>{
    const connectionString = uri || _index.MONGOOSE_URI;
    try {
        await _mongoose.default.connect(connectionString, {
            retryWrites: true,
            w: 'majority'
        });
        console.log('🚀 ~ connectMongodb ~ Successfully');
    } catch (error) {
        console.log('🚀 ~ connectMongodb ~ Error');
        throw new Error(error);
    }
};
const _default = connectMongodb;

//# sourceMappingURL=db.js.map