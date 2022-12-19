"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
class Message {
    async save(data) {
        const response = await database_1.db.tbl_message.create({
            data: {
                cellphone: data.cellphone,
                content: data.content,
                critica: data.critica,
                email: data.email,
                name: data.name,
                phone: data.phone
            },
        });
        return response;
    }
}
exports.default = new Message();
