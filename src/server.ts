import 'reflect-metadata';
import 'express-async-errors';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongoSession from 'connect-mongodb-session';

import passport from 'passport';

import { LOG_FORMAT, MONGOOSE_URI, NODE_ENV, ORIGIN, PORT, SESSION_KEY } from '~/config';
import connectMongodb from '~/config/db';
import controllerRegister from '~/utils/controllerRegister';
import { handleError } from '~/middlewares/handleError';

import UserController from '~/controllers/user.controller';
import AuthController from '~/controllers/auth.controller';
import ProductController from '~/controllers/product.controller';
import CategoryController from '~/controllers/category.controller';
import OrderController from '~/controllers/order.controller';
import UploadController from '~/controllers/upload.controller';
import HomeController from '~/controllers/home.controller';
import handlerLocalPassport from '~/passport/handlerLocalPassport';

class App {
   protected app: Application;
   protected env: string;
   protected port: string | number;
   protected MongoDBStore = connectMongoSession(session);

   constructor() {
      this.app = express();
      this.env = NODE_ENV || 'development';
      this.port = PORT || 5000;

      this.connection();
      this.initializeMiddlewares();
      this.initializeRoutes();
      this.initializeSwagger();
      this.initializeErrorHandling();
   }

   private connection = async () => {
      await connectMongodb();
   };

   private initializeMiddlewares = () => {
      this.app.use(morgan(LOG_FORMAT));
      this.app.use(cors({ origin: ORIGIN, credentials: true }));
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(cookieParser());
      this.app.use(helmet());
      this.app.use(compression());
      this.app.set('trust proxy', 1);

      const store = new this.MongoDBStore({
         uri: MONGOOSE_URI,
         collection: 'session'
      });

      this.app.use(
         session({
            store: store,
            secret: SESSION_KEY,
            resave: false,
            saveUninitialized: false,
            proxy: true,
            cookie: {
               secure: true,
               httpOnly: true,
               maxAge: 1000 * 60 * 60 * 24 * 7,
               sameSite: 'none'
            }
         })
      );

      this.app.use(passport.initialize());
      this.app.use(passport.session());

      handlerLocalPassport(this.app);
   };

   private initializeRoutes = () => {
      this.app.get('/', (req, res) => res.send('Hello'));
      controllerRegister(this.app, [
         AuthController,
         UserController,
         CategoryController,
         ProductController,
         OrderController,
         UploadController,
         HomeController
      ]);
   };

   private initializeSwagger = () => {};

   private initializeErrorHandling = () => {
      this.app.use(handleError.NotFound);
      this.app.use(handleError.InternalServer);
   };

   public listen = () => {
      this.app.listen(this.port, () => {
         console.log(`=================================`);
         console.log(`======= ENV: ${this.env} =======`);
         console.log(`🚀 App listening on the port ${this.port}`);
         console.log(`=================================`);
      });
   };
}

const app = new App();

app.listen();
