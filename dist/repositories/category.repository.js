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
const _categorymodel = _interop_require_default(require("../models/category.model"));
const _productmodel = _interop_require_default(require("../models/product.model"));
const _filterUndefineOrNull = _interop_require_default(require("../utils/filterUndefineOrNull"));
const _response = require("../utils/response");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let CategoryRepository = class CategoryRepository {
    async getAllCategory({ page, limit, filter }) {
        var _Category_find_sort_populate, _Category_find_sort;
        const filterEl = {
            name: {
                $regex: `.*${filter}.*`,
                $options: 'i'
            }
        };
        if (!page) {
            var _Category_find_sort1;
            const result = await ((_Category_find_sort1 = _categorymodel.default.find(filterEl).sort('createdAt')) === null || _Category_find_sort1 === void 0 ? void 0 : _Category_find_sort1.populate('image'));
            return {
                result
            };
        }
        const result = await ((_Category_find_sort = _categorymodel.default.find(filterEl).sort('createdAt')) === null || _Category_find_sort === void 0 ? void 0 : (_Category_find_sort_populate = _Category_find_sort.populate('image')) === null || _Category_find_sort_populate === void 0 ? void 0 : _Category_find_sort_populate.skip((page - 1) * limit).limit(limit));
        const totalItem = await _categorymodel.default.count(filterEl);
        return {
            result,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                totalPage: Math.ceil(totalItem / limit)
            }
        };
    }
    async createCategory({ name, image }) {
        const category = await _categorymodel.default.create((0, _filterUndefineOrNull.default)({
            name,
            image
        }));
        const result = await (category === null || category === void 0 ? void 0 : category.populate('image'));
        return result;
    }
    async updateCategory({ _id, name, image }) {
        const updateFields = (0, _filterUndefineOrNull.default)({
            name,
            image
        });
        const category = await _categorymodel.default.findByIdAndUpdate(_id, updateFields, {
            new: true
        });
        if (!category) {
            throw new _response.NotFoundException('Not found category with _id: ' + _id);
        }
        const result = await (category === null || category === void 0 ? void 0 : category.populate('image'));
        return result;
    }
    async deleteCategory(_id) {
        if (!_id) {
            throw new _response.BadRequestException('Category _id must be required.');
        }
        const isExists = await _productmodel.default.find({
            category: _id
        });
        if (isExists || isExists.length > 0) {
            throw new _response.BadRequestException('Some products using this category _id.');
        }
        return await _categorymodel.default.deleteOne({
            _id
        });
    }
};
const _default = CategoryRepository;

//# sourceMappingURL=category.repository.js.map