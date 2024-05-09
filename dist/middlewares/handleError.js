"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "handleError", {
    enumerable: true,
    get: function() {
        return handleError;
    }
});
const _response = require("../utils/response");
const _httpstatuscodes = require("http-status-codes");
const _datefns = require("date-fns");
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
let handleError = class handleError {
};
_define_property(handleError, "NotFound", (req, res, next)=>{
    next(new _response.NotFoundException(`[${req.method}] Not found resource: ${req.url}`));
});
_define_property(handleError, "InternalServer", (err, req, res, next)=>{
    console.log('--- ERROR EXCEPTION---');
    console.table([
        {
            Name: err === null || err === void 0 ? void 0 : err.name,
            'Status code': (err === null || err === void 0 ? void 0 : err.statusCode) || _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR,
            Time: (0, _datefns.format)(new Date(), 'hh:mm:ss dd/MM/yyyy'),
            Message: err === null || err === void 0 ? void 0 : err.message
        }
    ]);
    res.status(err.statusCode || _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR).json({
        statusCode: err.statusCode || _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || _httpstatuscodes.ReasonPhrases.INTERNAL_SERVER_ERROR
    });
});

//# sourceMappingURL=handleError.js.map