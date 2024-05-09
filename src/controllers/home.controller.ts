import { Request, Response } from 'express';
import { Controller, Get, Post } from '~/decorators';
import AuthRepository from '~/repositories/auth.repository';
import CategoryRepository from '~/repositories/category.repository';
import ProductRepository from '~/repositories/product.repository';
import OkResponse from '~/utils/response/response';

@Controller('/home')
class HomeController {
   productRepo = new ProductRepository();
   categoryRepo = new CategoryRepository();

   @Get('/')
   async getHome(req: Request, res: Response) {
      const [categoriesResponse, newProductsResponse, populateProductsResponse] = await Promise.all(
         [
            this.categoryRepo.getAllCategory({ page: 1, limit: 10, filter: '' }),
            this.productRepo.searchProduct({ page: 1, limit: 20, sort: 'createdAt' }),
            this.productRepo.searchProduct({ page: 1, limit: 20, sort: 'populate' })
         ]
      );

      return OkResponse(res, {
         metadata: {
            categories: categoriesResponse?.result || [],
            newProducts: newProductsResponse?.result || [],
            populateProducts: populateProductsResponse?.result || []
         }
      });
   }
}

export default HomeController;
