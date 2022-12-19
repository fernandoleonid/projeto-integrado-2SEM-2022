"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOptions = exports.createUserOptions = void 0;
const User = {
    type: "object",
    properties: {
        id: { type: "int" },
        profile_picture: { type: "string" },
        name: { type: "string", length: 256 },
        email: { type: "string", length: 256 },
        cellphone: { type: "string", length: 15 },
        password: { type: "string", length: 256 },
    },
};
const createUserOptions = {
    body: {
        type: "object",
        required: ["name", "profile_picture", "email", "cellphone", "password"],
        properties: {
            profile_picture: { type: "object" },
            name: {
                type: "object",
                properties: {
                    value: {
                        type: "string",
                    },
                },
            },
            email: {
                type: "object",
                properties: {
                    value: {
                        type: "string",
                    },
                },
            },
            cellphone: {
                type: "object",
                properties: {
                    value: {
                        type: "number",
                    },
                },
            },
            password: {
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
                statusCode: {
                    type: "number",
                },
                payload: {
                    type: "array",
                    items: {
                        User,
                    },
                },
                error: {
                    type: "boolean",
                },
            },
        },
    },
};
exports.createUserOptions = createUserOptions;
const loginOptions = {
    body: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: { type: "string" },
            password: { type: "string" },
        },
    },
};
exports.loginOptions = loginOptions;
