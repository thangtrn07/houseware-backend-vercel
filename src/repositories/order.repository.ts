import Order from '~/models/order.model';
import Product from '~/models/product.model';
import { OrderStatus } from '~/types/orderStatus';
import filterUndefinedOrNullFields from '~/utils/filterUndefineOrNull';
import { NotFoundException } from '~/utils/response';

class OrderRepository {
   async getAllOrder({ page, limit, orderBy }) {
      const filter = filterUndefinedOrNullFields({ orderBy });

      if (!page) {
         const result = await Order.find(filter)
            ?.sort({ createdAt: -1 })
            ?.populate({
               path: 'orderBy'
            })
            ?.populate({
               path: 'items.product',
               populate: {
                  path: 'images category'
               }
            });
         return { result };
      }

      const result = await Order.find(filter)
         .sort({ createdAt: -1 })
         .populate({
            path: 'orderBy'
         })
         .populate({
            path: 'items.product',
            populate: {
               path: 'images category'
            }
         })
         .skip((page - 1) * limit)
         .limit(limit);

      const totalItem = await Order.count(filter);

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
      const order = await Order.create(
         filterUndefinedOrNullFields({ items, status, totalPrice, note, address, phone, orderBy })
      );

      const result = await Order.findById(order._id).populate('items.product');

      return result;
   }

   async updateOrder({ _id, status }) {
      const updatedOrder = await Order.findOneAndUpdate(
         { _id },
         filterUndefinedOrNullFields({ status }),
         { new: true }
      );

      if (status === OrderStatus.PROCESSING) {
         for (const item of updatedOrder.items) {
            const product = await Product.findById(item.product);

            if (product) {
               const updatedQuantity = product.quantity - item.quantity;

               await Product.findOneAndUpdate({ _id: item.product }, { quantity: updatedQuantity });
            }
         }
      }

      const result = await Order.findById(updatedOrder._id).populate('items.product');
      return result;
   }
}

export default OrderRepository;
