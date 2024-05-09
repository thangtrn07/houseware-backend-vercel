import express, { Application, Handler } from 'express';
import { IRouter } from '~/decorators/Methods';
import MetadataKeys from './metadata.key';
import { IController } from '~/decorators/Controller';

function controllerRegister(app: Application, controllers: any[]) {
   const info: Array<{ api: string; handler: string }> = [];
   controllers.forEach((controller) => {
      const controllerInstance: { [handlerName: string]: Handler } = new controller();
      const baseController: IController = Reflect.getMetadata(MetadataKeys.BASE_PATH, controller);

      const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTER, controller);
      const expresRouter = express.Router();
      routers.forEach(({ method, handlerName, handlerPath, middlewares }) => {
         expresRouter[method](
            handlerPath,
            ...baseController.middlewares,
            ...middlewares,
            controllerInstance[String(handlerName)].bind(controllerInstance)
         );
         info.push({
            api: `${method.toLocaleLowerCase()} ${'/api' + baseController.basePath + handlerPath}`,
            handler: `${controllerInstance.constructor.name} - ${String(handlerName)}`
         });
      });
      app.use('/api' + baseController.basePath, expresRouter);
   });
   console.table(info);
}

export default controllerRegister;
