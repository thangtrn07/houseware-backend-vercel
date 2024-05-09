import mongoose from 'mongoose';
const { Schema } = mongoose;
import { OrderStatus } from '~/types/orderStatus';

const orderSchema = new Schema(
   {
      items: [
         {
            product: {
               type: Schema.ObjectId,
               ref: 'Product'
            },
            price: {
               type: Number,
               min: [0, 'Order {VALUE} must be least 0'],
               required: [true, 'Order {VALUE} must be required.']
            },
            quantity: {
               type: Number,
               min: [0, 'Order {VALUE} must be least 0'],
               required: [true, 'Order quantity must be required.']
            }
         }
      ],
      address: String,
      phone: String,
      status: {
         type: String,
         enum: Object.values(OrderStatus),
         default: OrderStatus.PENDING
      },
      note: String,
      totalPrice: {
         type: Number,
         min: [0, 'Order {VALUE} must be least 0'],
         required: [true, 'Order {VALUE} must be required.']
      },
      orderBy: {
         type: Schema.ObjectId,
         ref: 'User',
         required: [true, 'OrderBy must be required.']
      }
   },
   {
      timestamps: true
   }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
