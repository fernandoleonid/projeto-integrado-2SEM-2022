"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageController_1 = __importDefault(require("../controller/MessageController"));
const Message = {
    type: "object",
    required: ["name", "email", "phone", "cellphone", "content", "critica"],
    properties: {
        name: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        cellphone: { type: "string" },
        content: { type: "string" },
        critica: { type: "boolean" },
    },
};
const createMessageOptions = {
    type: "object",
    body: {
        Message,
    },
    reponse: {
        200: {
            type: "object",
            properties: {
                statusCode: {
                    type: "number",
                },
                payload: {
                    type: "array",
                    items: {
                        Message,
                    },
                },
                error: {
                    type: "boolean",
                },
            },
        },
    },
};
async function messageRoutes(server) {
    server.post("/", { schema: createMessageOptions }, MessageController_1.default.save);
}
exports.default = messageRoutes;
