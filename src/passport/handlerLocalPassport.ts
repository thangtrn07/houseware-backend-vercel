import { Application } from 'express';
import passport from 'passport';

import passportLocal from 'passport-local';
import Account from '~/models/account.model';
import User from '~/models/user.model';
import { BadRequestException, UnauthorizedException } from '~/utils/response';
const LocalStrategy = passportLocal.Strategy;

const handlerLocalPassport = (app: Application) => {
   passport.use(
      new LocalStrategy(async (username, password, done) => {
         const account = (await Account.findOne({ username }))?.toJSON();
         if (!account) {
            return done(new UnauthorizedException('Username or password is incorrect'));
         }

         const storedPassword = account.password;

         if (storedPassword !== password) {
            return done(new UnauthorizedException('Username or password is incorrect'));
         } else {
            const user = await User.findOne({ account: account?._id })?.populate({
               path: 'account',
               select: { password: 0 }
            });
            return done(null, user as any);
         }
      })
   );

   passport.serializeUser(function (user, done) {
      done(null, (user?.account?._id).toString());
   });

   passport.deserializeUser(async function (_id, done) {
      try {
         const user = (
            await User.findOne({ account: _id })?.populate({
               path: 'account',
               select: { password: 0 }
            })
         )?.toJSON();

         if (!user) {
            done(new UnauthorizedException('Your session is invalid session'));
         } else {
            done(null, user as any);
         }
      } catch (error) {
         throw new BadRequestException(error?.message);
      }
   });
};

export default handlerLocalPassport;
