"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BadRequestException: function() {
        return BadRequestException;
    },
    ConflictException: function() {
        return ConflictException;
    },
    ErrorException: function() {
        return ErrorException;
    },
    ForbiddenException: function() {
        return ForbiddenException;
    },
    NotFoundException: function() {
        return NotFoundException;
    },
    UnauthorizedException: function() {
        return UnauthorizedException;
    },
    UnprocessableException: function() {
        return UnprocessableException;
    }
});
const _httpstatuscodes = require("http-status-codes");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
let ErrorException = class ErrorException extends Error {
    constructor(statusCode, message){
        if (typeof message === 'string') {
            super(message);
            _define_property(this, "statusCode", void 0);
        } else {
            super(message.join(', '));
            _define_property(this, "statusCode", void 0);
        }
        this.statusCode = statusCode;
    }
};
let NotFoundException = class NotFoundException extends ErrorException {
    constructor(message = _httpstatuscodes.ReasonPhrases.NOT_FOUND){
        super(_httpstatuscodes.StatusCodes.NOT_FOUND, message);
    }
};
let BadRequestException = class BadRequestException extends ErrorException {
    constructor(message = _httpstatuscodes.ReasonPhrases.BAD_REQUEST){
        super(_httpstatuscodes.StatusCodes.BAD_REQUEST, message);
    }
};
let UnprocessableException = class UnprocessableException extends ErrorException {
    constructor(message = _httpstatuscodes.ReasonPhrases.UNPROCESSABLE_ENTITY){
        super(_httpstatuscodes.StatusCodes.UNPROCESSABLE_ENTITY, message);
    }
};
let ConflictException = class ConflictException extends ErrorException {
    constructor(message = _httpstatuscodes.ReasonPhrases.CONFLICT){
        super(_httpstatuscodes.StatusCodes.CONFLICT, message);
    }
};
let UnauthorizedException = class UnauthorizedException extends ErrorException {
    constructor(message = _httpstatuscodes.ReasonPhrases.UNAUTHORIZED){
        super(_httpstatuscodes.StatusCodes.UNAUTHORIZED, message);
    }
};
let ForbiddenException = class ForbiddenException extends ErrorException {
    constructor(message = _httpstatuscodes.ReasonPhrases.FORBIDDEN){
        super(_httpstatuscodes.StatusCodes.FORBIDDEN, message);
    }
};

//# sourceMappingURL=exception.js.map