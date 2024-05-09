import { Request, Response } from 'express';
import { Controller, Get, Post } from '~/decorators';
import AuthRepository from '~/repositories/auth.repository';
import OkResponse from '~/utils/response/response';
import passport from 'passport';
import { BadRequestException } from '~/utils/response';
import { forwardAuthenticated, permission } from '~/middlewares/permission';

@Controller('/auth')
class AuthController {
   authRepo = new AuthRepository();
   @Post('/login', forwardAuthenticated, passport.authenticate('local'))
   login(req: Request, res: Response) {
      return OkResponse(res, { message: 'Đăng nhập thành công', metadata: req.user });
   }

   @Post('/register')
   async register(req: Request, res: Response) {
      const { username, password, fullname, phone, address } = req.body;
      const result = await this.authRepo.register({ username, password, fullname, phone, address });
      return OkResponse(res, { metadata: result });
   }

   @Post('/change-password', permission())
   async changePassword(req: Request, res: Response) {
      const { username, password } = req.body;
      const result = await this.authRepo.changePassword({ username, password });
      return OkResponse(res, { metadata: result });
   }

   @Get('/logout', permission())
   async logout(req: Request, res: Response) {
      req.logOut((err) => {
         if (err) {
            throw new BadRequestException(err);
         }
         return OkResponse(res, { message: 'Đã đăng xuất thành công' });
      });
   }

   @Get('/me')
   async test(req: Request, res: Response) {
      return OkResponse(res, { metadata: req.user || null });
   }
}
export default AuthController;
