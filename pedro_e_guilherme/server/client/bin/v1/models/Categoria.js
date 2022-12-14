"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
class Categoria {
    async index() {
        const response = await database_1.db.tbl_category.findMany();
        return response;
    }
}
exports.default = new Categoria();
