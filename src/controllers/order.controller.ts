import { Request, Response } from 'express';
import { Controller, Get, Post, Put } from '~/decorators';
import { permission } from '~/middlewares/permission';
import OrderRepository from '~/repositories/order.repository';
import OkResponse from '~/utils/response/response';

@Controller('/order')
class OrderController {
   orderRepo = new OrderRepository();

   @Get('/')
   async getAllOrder(req: Request, res: Response) {
      const { page, limit = 20, orderBy } = req.query;
      const { result, pagination } = await this.orderRepo.getAllOrder({ page, limit, orderBy });
      return OkResponse(res, {
         metadata: result,
         pagination
      });
   }

   @Post('/', permission())
   async createOrder(req: Request, res: Response) {
      const { items, status, totalPrice, note, address, phone, orderBy } = req.body;
      const result = await this.orderRepo.createOrder({
         items,
         status,
         totalPrice,
         note,
         address,
         phone,
         orderBy
      });
      return OkResponse(res, { metadata: result });
   }

   @Put('/', permission())
   async updateOrder(req: Request, res: Response) {
      const { _id, status } = req.body;
      const result = await this.orderRepo.updateOrder({
         _id,
         status
      });
      return OkResponse(res, { metadata: result });
   }
}

export default OrderController;
