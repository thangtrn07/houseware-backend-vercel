"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _httpstatuscodes = require("http-status-codes");
const OkResponse = (res, data = {
    statusCode: _httpstatuscodes.StatusCodes.OK,
    message: 'Successfully.'
})=>{
    const response = {
        statusCode: data.statusCode || _httpstatuscodes.StatusCodes.OK,
        message: data.message || 'Successfully.',
        metadata: data === null || data === void 0 ? void 0 : data.metadata,
        pagination: data.pagination
    };
    res.status(response.statusCode).json(response);
};
const _default = OkResponse;

//# sourceMappingURL=response.js.map