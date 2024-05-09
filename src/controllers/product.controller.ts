import { Request, Response } from 'express';
import { Controller, Delete, Get, Post, Put } from '~/decorators';
import { CloudImage } from '~/types/image';
import uploader from '~/middlewares/uploader';
import ImageRepository from '~/repositories/image.repository';
import OkResponse from '~/utils/response/response';
import ProductRepository from '~/repositories/product.repository';
import { BadRequestException } from '~/utils/response';
import { permission } from '~/middlewares/permission';
import { Roles } from '~/types/roles';

@Controller('/products')
class ProductController {
   private imageRepo = new ImageRepository();
   private productRepo = new ProductRepository();

   @Get('/')
   async getAllProduct(req: Request, res: Response) {
      const { page = 1, limit = 20, filter = '' } = req.query;
      const { result, pagination } = await this.productRepo.getAllProduct({ page, limit, filter });
      return OkResponse(res, {
         metadata: result,
         pagination
      });
   }

   @Get('/search')
   async searchProduct(req: Request, res: Response) {
      const {
         page = 1,
         limit = 20,
         name = '',
         fromPrice = 0,
         toPrice,
         sort = 'createdAt'
      } = req.query;
      const { result, pagination } = await this.productRepo.searchProduct({
         page,
         limit,
         name,
         fromPrice,
         toPrice,
         sort
      } as any);
      return OkResponse(res, { metadata: result, pagination });
   }

   @Get('/:id')
   async getProductById(req: Request, res: Response) {
      const _id = req.params.id;
      const result = await this.productRepo.getProductById(_id);
      return OkResponse(res, { metadata: result });
   }

   @Post('/', permission(Roles.ADMIN), uploader.array('image'))
   async createProduct(req: Request, res: Response) {
      const { name, category, price, quantity, detail, description } = req.body;
      const file = req.files as CloudImage[];
      const images = await this.imageRepo.createMultipleImage(file);

      if (!images || images.length <= 0) {
         throw new BadRequestException('Product images not be empty.');
      }

      const product = await this.productRepo.createProduct({
         name,
         images,
         category,
         price,
         quantity,
         detail,
         description
      });

      return OkResponse(res, { metadata: product });
   }

   @Put('/', permission(Roles.ADMIN))
   async updateProduct(req: Request, res: Response) {
      const { _id, name, category, price, quantity, detail, description } = req.body;

      const product = await this.productRepo.updateProduct({
         _id,
         name,
         category,
         price,
         quantity,
         detail,
         description
      });

      return OkResponse(res, { metadata: product });
   }

   @Delete('/:id', permission(Roles.ADMIN))
   async deleteProduct(req: Request, res: Response) {
      const _id = req.params.id;
      const result = await this.productRepo.deleteProduct(_id);
      return OkResponse(res, { metadata: result });
   }

   // @Get('/suggestion')
   // async getSuggestionProduct(req: Request, res: Response) {
   //    const result = await this.productRepo.getSuggestionProduct();
   //    return OkResponse(res, { metadata: result });
   // }
}

export default ProductController;
