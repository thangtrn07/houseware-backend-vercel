import { Request, Response, NextFunction } from 'express';
import { Roles } from '~/types/roles';
import { BadRequestException, ForbiddenException, UnauthorizedException } from '~/utils/response';

export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
   const user = req.user;
   if (!req.isAuthenticated()) {
      next();
   } else {
      throw new BadRequestException('Bạn đã đăng nhập rồi.');
   }
};

export const permission = (role?: Roles) => {
   return (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;
      if (!req.isAuthenticated()) {
         throw new UnauthorizedException('Vui lòng đăng nhập');
      }
      if (!role) {
         next();
      } else if (user?.role === role || user.role === Roles.ADMIN) {
         next();
      } else {
         throw new ForbiddenException('Bạn chưa được uỷ quyền.');
      }
   };
};
