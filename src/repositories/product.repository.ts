import mongoose from 'mongoose';
import Product from '~/models/product.model';
import { Pagination } from '~/types/page';
import filterUndefinedOrNullFields from '~/utils/filterUndefineOrNull';
import { BadRequestException, NotFoundException } from '~/utils/response';

class ProductRepository {
   async getAllProduct({ page, limit, filter }) {
      const filterEl = {
         name: {
            $regex: `.*${filter}.*`,
            $options: 'i'
         }
      };

      const result = await Product.find(filterEl)
         .sort({ createdAt: -1 })
         ?.populate({
            path: 'images',
            model: 'Image'
         })
         ?.populate({
            path: 'category',
            model: 'Category',
            populate: {
               path: 'image',
               model: 'Image'
            }
         })
         ?.skip((page - 1) * limit)
         .limit(limit);

      const totalItem = await Product.count(filterEl);

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
      const result = await Product.aggregate([
         {
            $match: {
               _id: new mongoose.Types.ObjectId(_id)
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
                           $eq: ['$_id', '$$categoryId']
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
               let: { productId: '$_id' },
               pipeline: [
                  {
                     $unwind: '$items'
                  },
                  {
                     $match: {
                        $expr: {
                           $eq: ['$items.product', '$$productId']
                        }
                     }
                  },
                  {
                     $project: {
                        items: 1
                     }
                  },
                  {
                     $replaceRoot: { newRoot: '$items' }
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
                        $add: ['$$value', '$$this.quantity']
                     }
                  }
               }
            }
         }
      ]);

      if (!result) {
         throw new NotFoundException('Not found product with _id: ' + _id);
      }

      return result?.[0];
   }

   async createProduct({ name, images, category, price, quantity, detail, description }) {
      const product = await Product.create(
         filterUndefinedOrNullFields({
            name,
            images: images.map((item) => item?._id),
            category,
            price,
            quantity,
            detail,
            description
         })
      );
      const result = await Product.findById(product?._id)
         ?.populate({
            path: 'images',
            model: 'Image'
         })
         ?.populate({
            path: 'category',
            model: 'Category',
            populate: {
               path: 'image',
               model: 'Image'
            }
         });
      return result;
   }

   async updateProduct({ _id, name, category, price, quantity, detail, description }) {
      const product = await Product.findByIdAndUpdate(
         _id,
         filterUndefinedOrNullFields({
            name,
            category,
            price,
            quantity,
            detail,
            description
         })
      );
      if (!product) {
         throw new NotFoundException('Not found product with _id: ' + _id);
      }
      const result = await Product.findById(product?._id)
         ?.populate({
            path: 'images',
            model: 'Image'
         })
         ?.populate({
            path: 'category',
            model: 'Category',
            populate: {
               path: 'image',
               model: 'Image'
            }
         });
      return result;
   }

   async deleteProduct(_id): Promise<any> {
      if (!_id) {
         throw new BadRequestException('Product _id must be required.');
      }
      return await Product.deleteOne({ _id });
   }

   async searchProduct({
      page = 1,
      limit = 10,
      name = '',
      fromPrice,
      toPrice,
      sort = 'createdAt'
   }: {
      page?: number;
      limit?: number;
      name?: string;
      fromPrice?: number;
      toPrice?: number;
      sort?: string;
   }): Promise<{
      result: any;
      pagination: Pagination;
   }> {
      const createPriceMatchFilter = (fromPrice: number, toPrice: number) => {
         const matchPriceFilter: any = {
            $match: {}
         };

         if (fromPrice && toPrice) {
            matchPriceFilter.$match.price = {
               $gte: Number(fromPrice),
               $lte: Number(toPrice)
            };
         } else if (fromPrice !== null || fromPrice !== undefined) {
            matchPriceFilter.$match.price = { $gte: Number(fromPrice) || 0 };
         } else if (toPrice !== null || toPrice !== undefined) {
            matchPriceFilter.$match.price = { $lte: Number(toPrice) || 0 };
         }
         return matchPriceFilter;
      };

      const createSortFilter = (sort) => {
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

      const productSearchAggregate: any = [
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
                           $eq: ['$_id', '$$categoryId']
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
               let: { productId: '$_id' },
               pipeline: [
                  {
                     $unwind: '$items'
                  },
                  {
                     $match: {
                        $expr: {
                           $eq: ['$items.product', '$$productId']
                        }
                     }
                  },
                  {
                     $project: {
                        items: 1
                     }
                  },
                  {
                     $replaceRoot: { newRoot: '$items' }
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
                        $add: ['$$value', '$$this.quantity']
                     }
                  }
               }
            }
         },
         {
            ...createPriceMatchFilter(fromPrice, toPrice)
         },
         {
            ...createSortFilter(sort)
         }
      ];

      const result = await Product.aggregate([
         ...productSearchAggregate,
         {
            $limit: Number(limit)
         },
         {
            $skip: (Number(page) - 1) * limit
         }
      ]);

      const totalItem = await Product.aggregate([
         ...productSearchAggregate,
         { $count: 'totalProducts' }
      ]);

      return {
         result,
         pagination: {
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil(Number(totalItem?.[0]?.totalProducts) / limit),
            totalItem: Number(totalItem?.[0]?.totalProducts)
         }
      };
   }

   // async getSuggestionProduct() {
   //    return randomProducts;
   // }
}

export default ProductRepository;
