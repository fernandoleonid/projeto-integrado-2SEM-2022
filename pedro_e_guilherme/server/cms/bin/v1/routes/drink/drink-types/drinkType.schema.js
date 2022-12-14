"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDrinkTypeOptions = void 0;
const createDrinkTypeOptions = {
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
exports.createDrinkTypeOptions = createDrinkTypeOptions;
