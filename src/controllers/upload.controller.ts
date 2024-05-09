import { Request, Response } from 'express';
import { Controller, Post } from '~/decorators';
import uploader from '~/middlewares/uploader';
import ImageRepository from '~/repositories/image.repository';
import { CloudImage } from '~/types/image';
import OkResponse from '~/utils/response/response';

@Controller('/upload')
class UploadController {
   private imageRepo = new ImageRepository();
   @Post('/', uploader.single('image'))
   async uploadImage(req: Request, res: Response) {
      const image: CloudImage = req.file;

      const imageResult = await this.imageRepo.createImage(image);
      return OkResponse(res, { metadata: imageResult });
   }
}

export default UploadController;
