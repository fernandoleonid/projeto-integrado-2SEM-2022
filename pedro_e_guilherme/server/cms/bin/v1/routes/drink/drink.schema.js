"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDrinkOptions = void 0;
const Drink = {
    type: "object",
    properties: {
        id: { type: "number" },
        volume: { type: "number" },
        product: {
            type: "object",
            properties: {
                id: { type: "int" },
                name: { type: "string" },
                price: { type: "number" },
                likes: { type: "number" },
                created_by: { type: "number" },
                category_id: { type: "number" },
                status: { type: "boolean" },
                tbl_product_pictures: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            picture_id: { type: "int" },
                        },
                    },
                },
            },
        },
        drink_type: {
            id: { type: "number" },
            name: { type: "string" },
            status: { type: "boolean" },
        },
    },
};
const createDrinkOptions = {
    body: {
        type: "object",
        required: ["price", "volume", "saleOffValue", "type", "picture", "name", "categoria",],
        properties: {
            picture: { type: "object" },
            price: {
                type: "object",
                properties: {
                    value: {
                        type: "number",
                    },
                },
            },
            volume: {
                type: "object",
                properties: {
                    value: {
                        type: "number",
                    },
                },
            },
            name: {
                type: "object",
                properties: {
                    value: {
                        type: "string",
                    },
                },
            },
            saleOffValue: {
                type: "object",
                properties: {
                    value: {
                        type: "number",
                    },
                },
            },
            type: {
                type: "object",
                properties: {
                    value: {
                        type: "string",
                    },
                },
            },
            categoria: {
                type: "object",
                properties: {
                    value: {
                        type: "string",
                    },
                },
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
                        Drink,
                    },
                },
                error: {
                    type: "boolean",
                },
            },
        },
    },
};
exports.createDrinkOptions = createDrinkOptions;
