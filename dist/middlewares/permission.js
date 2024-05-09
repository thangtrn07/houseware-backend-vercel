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
    forwardAuthenticated: function() {
        return forwardAuthenticated;
    },
    permission: function() {
        return permission;
    }
});
const _roles = require("../types/roles");
const _response = require("../utils/response");
const forwardAuthenticated = (req, res, next)=>{
    const user = req.user;
    if (!req.isAuthenticated()) {
        next();
    } else {
        throw new _response.BadRequestException('Bạn đã đăng nhập rồi.');
    }
};
const permission = (role)=>{
    return (req, res, next)=>{
        const user = req.user;
        if (!req.isAuthenticated()) {
            throw new _response.UnauthorizedException('Vui lòng đăng nhập');
        }
        if (!role) {
            next();
        } else if ((user === null || user === void 0 ? void 0 : user.role) === role || user.role === _roles.Roles.ADMIN) {
            next();
        } else {
            throw new _response.ForbiddenException('Bạn chưa được uỷ quyền.');
        }
    };
};

//# sourceMappingURL=permission.js.map