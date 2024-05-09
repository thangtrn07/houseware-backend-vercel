import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '~/config/cloudinary';
import multer from 'multer';
import { BadRequestException } from '~/utils/response';

const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: () => {
      return {
         folder: 'housewares'
      };
   }
});

const uploader = multer({
   storage,
   fileFilter: async (req, file, cb) => {
      const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!whitelist.includes(file.mimetype)) {
         return cb(new BadRequestException('This file is not allowed'));
      }
      cb(null, true);
   }
});

export const destroy = async (public_id: string) => {
   try {
      const { result } = await cloudinary.uploader.destroy(public_id);
      if (result === 'not found') {
         return 'Not found image to delete';
      } else if (result === 'ok') {
         return 'Deleted successfully';
      }
      return result;
   } catch (error) {
      return 'Delete failed.';
   }
};

export default uploader;
