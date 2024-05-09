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
const _usermodel = _interop_require_default(require("../models/user.model"));
const _filterUndefineOrNull = _interop_require_default(require("../utils/filterUndefineOrNull"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let UserRepository = class UserRepository {
    async getAllUser({ page, limit, filter }) {
        var _User_find_sort_populate_select, _User_find_sort_populate, _User_find_sort;
        const filterEl = {
            fullname: {
                $regex: `.*${filter}.*`,
                $options: 'i'
            }
        };
        if (!page) {
            var _User_find_sort1;
            const result = await ((_User_find_sort1 = _usermodel.default.find(filterEl).sort('createdAt')) === null || _User_find_sort1 === void 0 ? void 0 : _User_find_sort1.populate({
                path: 'account',
                select: {
                    password: 0
                }
            }));
            return {
                result
            };
        }
        const result = await ((_User_find_sort = _usermodel.default.find(filterEl).sort('createdAt')) === null || _User_find_sort === void 0 ? void 0 : (_User_find_sort_populate = _User_find_sort.populate({
            path: 'account',
            select: {
                password: 0
            }
        })) === null || _User_find_sort_populate === void 0 ? void 0 : (_User_find_sort_populate_select = _User_find_sort_populate.select('-account.password')) === null || _User_find_sort_populate_select === void 0 ? void 0 : _User_find_sort_populate_select.skip((page - 1) * limit).limit(limit));
        const totalItem = await _usermodel.default.count(filterEl);
        return {
            result,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                totalPage: Math.ceil(totalItem / limit)
            }
        };
    }
    async updateUser({ _id, fullname, phone, address, image, role }) {
        const result = await _usermodel.default.findByIdAndUpdate(_id, (0, _filterUndefineOrNull.default)({
            fullname,
            phone,
            address,
            image,
            role
        }));
        return result;
    }
};
const _default = UserRepository;

//# sourceMappingURL=user.repository.js.map