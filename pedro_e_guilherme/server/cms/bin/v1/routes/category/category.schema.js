"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryOptions = exports.createCategoryOptions = void 0;
const createCategoryOptions = {
    body: {
        type: "object",
        required: ["name"],
        properties: {
            name: {
                type: "string",
            },
        },
    },
    response: {
        200: {
            type: "object",
            properties: {
                code: {
                    type: "number",
                },
                payload: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                            },
                            status: {
                                type: "boolean",
                            },
                            name: {
                                type: "string",
                            },
                        },
                    },
                },
                error: {
                    type: "boolean",
                },
            },
        },
    },
};
exports.createCategoryOptions = createCategoryOptions;
const updateCategoryOptions = {
    body: {
        type: "object",
        required: ["name"],
        properties: {
            name: {
                type: "string",
            },
        },
    },
    response: {
        200: {
            type: "object",
            properties: {
                statusCode: {
                    type: "number",
                },
                message: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
                error: {
                    type: "boolean",
                },
            },
        },
    },
};
exports.updateCategoryOptions = updateCategoryOptions;
