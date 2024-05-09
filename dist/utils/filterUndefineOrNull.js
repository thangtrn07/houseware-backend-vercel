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
const filterUndefinedOrNullFields = (obj)=>{
    const filteredObj = {};
    for(const key in obj){
        if (obj[key] !== undefined && obj[key] !== null) {
            filteredObj[key] = obj[key];
        }
    }
    return filteredObj;
};
const _default = filterUndefinedOrNullFields;

//# sourceMappingURL=filterUndefineOrNull.js.map