import { Request, Response, NextFunction } from 'express';
import { ErrorException, NotFoundException } from '~/utils/response';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { format } from 'date-fns';

export class handleError {
   static NotFound = (req: Request, res: Response, next: NextFunction) => {
      next(new NotFoundException(`[${req.method}] Not found resource: ${req.url}`));
   };

   static InternalServer = (
      err: ErrorException,
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      console.log('--- ERROR EXCEPTION---');
      console.table([
         {
            Name: err?.name,
            'Status code': err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            Time: format(new Date(), 'hh:mm:ss dd/MM/yyyy'),
            Message: err?.message
         }
      ]);

      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
         statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
         message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR
      });
   };
}
