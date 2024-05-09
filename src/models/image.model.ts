import mongoose from 'mongoose';
const { Schema } = mongoose;

const imageSchema = new Schema(
   {
      imageUrl: String,
      publicId: String,
      default: {
         type: Boolean,
         default: false
      }
   },
   {
      timestamps: true
   }
);

const Image = mongoose.model('Image', imageSchema);

export default Image;
