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
const _ordermodel = _interop_require_default(require("../models/order.model"));
const _productmodel = _interop_require_default(require("../models/product.model"));
const _orderStatus = require("../types/orderStatus");
const _filterUndefineOrNull = _interop_require_default(require("../utils/filterUndefineOrNull"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let OrderRepository = class OrderRepository {
    async getAllOrder({ page, limit, orderBy }) {
        const filter = (0, _filterUndefineOrNull.default)({
            orderBy
        });
        if (!page) {
            var _Order_find_sort_populate, _Order_find_sort, _Order_find;
            const result = await ((_Order_find = _ordermodel.default.find(filter)) === null || _Order_find === void 0 ? void 0 : (_Order_find_sort = _Order_find.sort({
                createdAt: -1
            })) === null || _Order_find_sort === void 0 ? void 0 : (_Order_find_sort_populate = _Order_find_sort.populate({
                path: 'orderBy'
            })) === null || _Order_find_sort_populate === void 0 ? void 0 : _Order_find_sort_populate.populate({
                path: 'items.product',
                populate: {
                    path: 'images category'
                }
            }));
            return {
                result
            };
        }
        const result = await _ordermodel.default.find(filter).sort({
            createdAt: -1
        }).populate({
            path: 'orderBy'
        }).populate({
            path: 'items.product',
            populate: {
                path: 'images category'
            }
        }).skip((page - 1) * limit).limit(limit);
        const totalItem = await _ordermodel.default.count(filter);
        return {
            result,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                totalPage: Math.ceil(totalItem / limit)
            }
        };
    }
    async createOrder({ items, status, totalPrice, note, address, phone, orderBy }) {
        const order = await _ordermodel.default.create((0, _filterUndefineOrNull.default)({
            items,
            status,
            totalPrice,
            note,
            address,
            phone,
            orderBy
        }));
        const result = await _ordermodel.default.findById(order._id).populate('items.product');
        return result;
    }
    async updateOrder({ _id, status }) {
        const updatedOrder = await _ordermodel.default.findOneAndUpdate({
            _id
        }, (0, _filterUndefineOrNull.default)({
            status
        }), {
            new: true
        });
        if (status === _orderStatus.OrderStatus.PROCESSING) {
            for (const item of updatedOrder.items){
                const product = await _productmodel.default.findById(item.product);
                if (product) {
                    const updatedQuantity = product.quantity - item.quantity;
                    await _productmodel.default.findOneAndUpdate({
                        _id: item.product
                    }, {
                        quantity: updatedQuantity
                    });
                }
            }
        }
        const result = await _ordermodel.default.findById(updatedOrder._id).populate('items.product');
        return result;
    }
};
const _default = OrderRepository;

//# sourceMappingURL=order.repository.js.map