import Image from '~/models/image.model';
import { CloudImage } from '~/types/image';

class ImageRepository {
   async createImage(data: CloudImage) {
      if (!data) {
         return null;
      }
      const image = await Image.create({ imageUrl: data.path, publicId: data.fieldname });
      return image;
   }

   async createMultipleImage(data: CloudImage[]) {
      if (!data || data.length <= 0) {
         return null;
      }

      const images = data.map((item) => ({ imageUrl: item.path, publicId: item.fieldname }));
      const result = await Image.insertMany(images);
      return result;
   }
}

export default ImageRepository;
