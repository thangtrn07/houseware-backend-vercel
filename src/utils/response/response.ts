import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Pagination } from '~/types/page';

export interface IResponseData {
   metadata?: any;
   message?: string;
   statusCode?: StatusCodes;
   pagination?: Pagination;
}

type ResponseType = (res: Response, data?: IResponseData) => void;

const OkResponse: ResponseType = (
   res,
   data = { statusCode: StatusCodes.OK, message: 'Successfully.' }
) => {
   const response = {
      statusCode: data.statusCode || StatusCodes.OK,
      message: data.message || 'Successfully.',
      metadata: data?.metadata,
      pagination: data.pagination
   };
   res.status(response.statusCode).json(response);
};

export default OkResponse;
