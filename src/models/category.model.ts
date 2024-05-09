import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema(
   {
      name: {
         type: String,
         required: [true, 'Category name must be required.']
      },
      image: {
         type: Schema.ObjectId,
         ref: 'Image'
      }
   },
   {
      timestamps: true
   }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
