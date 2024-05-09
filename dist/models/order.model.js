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
const _orderStatus = require("../types/orderStatus");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { Schema } = _mongoose.default;
const orderSchema = new Schema({
    items: [
        {
            product: {
                type: Schema.ObjectId,
                ref: 'Product'
            },
            price: {
                type: Number,
                min: [
                    0,
                    'Order {VALUE} must be least 0'
                ],
                required: [
                    true,
                    'Order {VALUE} must be required.'
                ]
            },
            quantity: {
                type: Number,
                min: [
                    0,
                    'Order {VALUE} must be least 0'
                ],
                required: [
                    true,
                    'Order quantity must be required.'
                ]
            }
        }
    ],
    address: String,
    phone: String,
    status: {
        type: String,
        enum: Object.values(_orderStatus.OrderStatus),
        default: _orderStatus.OrderStatus.PENDING
    },
    note: String,
    totalPrice: {
        type: Number,
        min: [
            0,
            'Order {VALUE} must be least 0'
        ],
        required: [
            true,
            'Order {VALUE} must be required.'
        ]
    },
    orderBy: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [
            true,
            'OrderBy must be required.'
        ]
    }
}, {
    timestamps: true
});
const Order = _mongoose.default.model('Order', orderSchema);
const _default = Order;

//# sourceMappingURL=order.model.js.map