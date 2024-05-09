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
const _productmodel = _interop_require_default(require("../models/product.model"));
const _filterUndefineOrNull = _interop_require_default(require("../utils/filterUndefineOrNull"));
const _response = require("../utils/response");
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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
let ProductRepository = class ProductRepository {
    async getAllProduct({ page, limit, filter }) {
        var _Product_find_sort_populate_populate, _Product_find_sort_populate, _Product_find_sort;
        const filterEl = {
            name: {
                $regex: `.*${filter}.*`,
                $options: 'i'
            }
        };
        const result = await ((_Product_find_sort = _productmodel.default.find(filterEl).sort({
            createdAt: -1
        })) === null || _Product_find_sort === void 0 ? void 0 : (_Product_find_sort_populate = _Product_find_sort.populate({
            path: 'images',
            model: 'Image'
        })) === null || _Product_find_sort_populate === void 0 ? void 0 : (_Product_find_sort_populate_populate = _Product_find_sort_populate.populate({
            path: 'category',
            model: 'Category',
            populate: {
                path: 'image',
                model: 'Image'
            }
        })) === null || _Product_find_sort_populate_populate === void 0 ? void 0 : _Product_find_sort_populate_populate.skip((page - 1) * limit).limit(limit));
        const totalItem = await _productmodel.default.count(filterEl);
        return {
            result,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                totalPage: Math.ceil(totalItem / limit)
            }
        };
    }
    async getProductById(_id) {
        const result = await _productmodel.default.aggregate([
            {
                $match: {
                    _id: new _mongoose.default.Types.ObjectId(_id)
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    let: {
                        categoryId: '$category'
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        '$_id',
                                        '$$categoryId'
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'category'
                }
            },
            {
                $unwind: {
                    path: '$category',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'images',
                    localField: 'images',
                    foreignField: '_id',
                    as: 'images'
                }
            },
            {
                $lookup: {
                    from: 'orders',
                    let: {
                        productId: '$_id'
                    },
                    pipeline: [
                        {
                            $unwind: '$items'
                        },
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        '$items.product',
                                        '$$productId'
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                items: 1
                            }
                        },
                        {
                            $replaceRoot: {
                                newRoot: '$items'
                            }
                        }
                    ],
                    as: 'orderItems'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    category: 1,
                    images: 1,
                    price: 1,
                    quantity: 1,
                    detail: 1,
                    description: 1,
                    createdAt: 1,
                    updatedAd: 1,
                    slug: 1,
                    sold: {
                        $reduce: {
                            input: '$orderItems',
                            initialValue: 0,
                            in: {
                                $add: [
                                    '$$value',
                                    '$$this.quantity'
                                ]
                            }
                        }
                    }
                }
            }
        ]);
        if (!result) {
            throw new _response.NotFoundException('Not found product with _id: ' + _id);
        }
        return result === null || result === void 0 ? void 0 : result[0];
    }
    async createProduct({ name, images, category, price, quantity, detail, description }) {
        var _Product_findById_populate, _Product_findById;
        const product = await _productmodel.default.create((0, _filterUndefineOrNull.default)({
            name,
            images: images.map((item)=>item === null || item === void 0 ? void 0 : item._id),
            category,
            price,
            quantity,
            detail,
            description
        }));
        const result = await ((_Product_findById = _productmodel.default.findById(product === null || product === void 0 ? void 0 : product._id)) === null || _Product_findById === void 0 ? void 0 : (_Product_findById_populate = _Product_findById.populate({
            path: 'images',
            model: 'Image'
        })) === null || _Product_findById_populate === void 0 ? void 0 : _Product_findById_populate.populate({
            path: 'category',
            model: 'Category',
            populate: {
                path: 'image',
                model: 'Image'
            }
        }));
        return result;
    }
    async updateProduct({ _id, name, category, price, quantity, detail, description }) {
        var _Product_findById_populate, _Product_findById;
        const product = await _productmodel.default.findByIdAndUpdate(_id, (0, _filterUndefineOrNull.default)({
            name,
            category,
            price,
            quantity,
            detail,
            description
        }));
        if (!product) {
            throw new _response.NotFoundException('Not found product with _id: ' + _id);
        }
        const result = await ((_Product_findById = _productmodel.default.findById(product === null || product === void 0 ? void 0 : product._id)) === null || _Product_findById === void 0 ? void 0 : (_Product_findById_populate = _Product_findById.populate({
            path: 'images',
            model: 'Image'
        })) === null || _Product_findById_populate === void 0 ? void 0 : _Product_findById_populate.populate({
            path: 'category',
            model: 'Category',
            populate: {
                path: 'image',
                model: 'Image'
            }
        }));
        return result;
    }
    async deleteProduct(_id) {
        if (!_id) {
            throw new _response.BadRequestException('Product _id must be required.');
        }
        return await _productmodel.default.deleteOne({
            _id
        });
    }
    async searchProduct({ page = 1, limit = 10, name = '', fromPrice, toPrice, sort = 'createdAt' }) {
        var _totalItem_, _totalItem_1;
        const createPriceMatchFilter = (fromPrice, toPrice)=>{
            const matchPriceFilter = {
                $match: {}
            };
            if (fromPrice && toPrice) {
                matchPriceFilter.$match.price = {
                    $gte: Number(fromPrice),
                    $lte: Number(toPrice)
                };
            } else if (fromPrice !== null || fromPrice !== undefined) {
                matchPriceFilter.$match.price = {
                    $gte: Number(fromPrice) || 0
                };
            } else if (toPrice !== null || toPrice !== undefined) {
                matchPriceFilter.$match.price = {
                    $lte: Number(toPrice) || 0
                };
            }
            return matchPriceFilter;
        };
        const createSortFilter = (sort)=>{
            if (sort === 'createdAt') {
                return {
                    $sort: {
                        createdAt: 1
                    }
                };
            } else if (sort === 'price-asc') {
                return {
                    $sort: {
                        price: 1
                    }
                };
            } else if (sort === 'price-desc') {
                return {
                    $sort: {
                        createdAt: -1
                    }
                };
            } else if (sort === 'populate') {
                return {
                    $sort: {
                        sold: 1
                    }
                };
            }
            return {};
        };
        const productSearchAggregate = [
            {
                $lookup: {
                    from: 'categories',
                    let: {
                        categoryId: '$category'
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        '$_id',
                                        '$$categoryId'
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'category'
                }
            },
            {
                $unwind: {
                    path: '$category',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    $or: [
                        {
                            name: {
                                $regex: `.*${name || ''}.*`,
                                $options: 'i'
                            }
                        },
                        {
                            'category.name': {
                                $regex: `.*${name || ''}.*`,
                                $options: 'i'
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'images',
                    localField: 'images',
                    foreignField: '_id',
                    as: 'images'
                }
            },
            {
                $lookup: {
                    from: 'orders',
                    let: {
                        productId: '$_id'
                    },
                    pipeline: [
                        {
                            $unwind: '$items'
                        },
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        '$items.product',
                                        '$$productId'
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                items: 1
                            }
                        },
                        {
                            $replaceRoot: {
                                newRoot: '$items'
                            }
                        }
                    ],
                    as: 'orderItems'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    category: 1,
                    images: 1,
                    price: 1,
                    quantity: 1,
                    detail: 1,
                    description: 1,
                    createdAt: 1,
                    updatedAd: 1,
                    slug: 1,
                    sold: {
                        $reduce: {
                            input: '$orderItems',
                            initialValue: 0,
                            in: {
                                $add: [
                                    '$$value',
                                    '$$this.quantity'
                                ]
                            }
                        }
                    }
                }
            },
            _object_spread({}, createPriceMatchFilter(fromPrice, toPrice)),
            _object_spread({}, createSortFilter(sort))
        ];
        const result = await _productmodel.default.aggregate([
            ...productSearchAggregate,
            {
                $limit: Number(limit)
            },
            {
                $skip: (Number(page) - 1) * limit
            }
        ]);
        const totalItem = await _productmodel.default.aggregate([
            ...productSearchAggregate,
            {
                $count: 'totalProducts'
            }
        ]);
        return {
            result,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                totalPage: Math.ceil(Number(totalItem === null || totalItem === void 0 ? void 0 : (_totalItem_ = totalItem[0]) === null || _totalItem_ === void 0 ? void 0 : _totalItem_.totalProducts) / limit),
                totalItem: Number(totalItem === null || totalItem === void 0 ? void 0 : (_totalItem_1 = totalItem[0]) === null || _totalItem_1 === void 0 ? void 0 : _totalItem_1.totalProducts)
            }
        };
    }
};
const _default = ProductRepository;

//# sourceMappingURL=product.repository.js.map