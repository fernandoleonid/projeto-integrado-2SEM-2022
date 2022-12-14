"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../models/Message"));
class MessageController {
    async save(req, rep) {
        const { name, email, phone, cellphone, critica, content } = req.body;
        const data = { name, email, phone, cellphone, critica, content, id: -1 };
        const response = await Message_1.default.save(data);
        return rep.send({
            code: 200,
            payload: [response],
            error: false,
        });
    }
}
exports.default = new MessageController();
