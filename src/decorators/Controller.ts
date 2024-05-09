import MetadataKeys from '~/utils/metadata.key';

export interface IController {
   basePath: string;
   middlewares: any[];
}

export default function Controller(basePath: string = '', ...middlewares: any[]): ClassDecorator {
   return (target) => {
      const controller: IController = {
         basePath: basePath,
         middlewares: middlewares
      };
      Reflect.defineMetadata(MetadataKeys.BASE_PATH, controller, target);
   };
}
