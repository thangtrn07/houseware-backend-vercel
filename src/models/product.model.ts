import mongoose from 'mongoose';
const { Schema } = mongoose;
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

const productSchema = new Schema(
   {
      name: {
         type: String,
         required: [true, 'Product name must be required.']
      },
      slug: {
         type: String,
         slug: 'name',
         index: true,
         slugPaddingSize: 3,
         unique: true
      },
      category: {
         type: Schema.ObjectId,
         ref: 'Category',
         required: [true, 'Product category must be required.']
      },
      images: [
         {
            type: Schema.ObjectId,
            ref: 'Image'
         }
      ],
      price: {
         type: Number,
         min: [0, 'Product {VALUE} must be least 0'],
         required: [true, 'Product {VALUE} must be required.']
      },
      quantity: {
         type: Number,
         min: [0, 'Product {VALUE} must be least 0'],
         required: [true, 'Product quantity must be required.']
      },
      detail: {
         size: String,
         color: String,
         brand: String,
         origin: String
      },
      description: {
         type: String
      }
   },
   {
      timestamps: true
   }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
