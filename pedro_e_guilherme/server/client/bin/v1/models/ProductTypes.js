"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
class ProductTypes {
    async getPizzaTypes() {
        const response = await database_1.db.tbl_pizza_type.findMany();
        return response;
    }
    async getPizzaStuffing() {
        const response = await database_1.db.tbl_stuffing.findMany();
        return response;
    }
    async getDrinkTypes() {
        const response = await database_1.db.tbl_drink_type.findMany();
        return response;
    }
}
exports.default = new ProductTypes();
