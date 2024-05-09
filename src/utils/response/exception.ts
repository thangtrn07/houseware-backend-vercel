import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class ErrorException extends Error {
   statusCode: StatusCodes;

   constructor(statusCode: StatusCodes, message: string | string[]) {
      if (typeof message === 'string') {
         super(message);
      } else {
         super((message as string[]).join(', '));
      }
      this.statusCode = statusCode;
   }
}

export class NotFoundException extends ErrorException {
   constructor(message: string | string[] = ReasonPhrases.NOT_FOUND) {
      super(StatusCodes.NOT_FOUND, message);
   }
}

export class BadRequestException extends ErrorException {
   constructor(message: string | string[] = ReasonPhrases.BAD_REQUEST) {
      super(StatusCodes.BAD_REQUEST, message);
   }
}

export class UnprocessableException extends ErrorException {
   constructor(message: string | string[] = ReasonPhrases.UNPROCESSABLE_ENTITY) {
      super(StatusCodes.UNPROCESSABLE_ENTITY, message);
   }
}

export class ConflictException extends ErrorException {
   constructor(message: string | string[] = ReasonPhrases.CONFLICT) {
      super(StatusCodes.CONFLICT, message);
   }
}

export class UnauthorizedException extends ErrorException {
   constructor(message: string | string[] = ReasonPhrases.UNAUTHORIZED) {
      super(StatusCodes.UNAUTHORIZED, message);
   }
}

export class ForbiddenException extends ErrorException {
   constructor(message: string | string[] = ReasonPhrases.FORBIDDEN) {
      super(StatusCodes.FORBIDDEN, message);
   }
}
