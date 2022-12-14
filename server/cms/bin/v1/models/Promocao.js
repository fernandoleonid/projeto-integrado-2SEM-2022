"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../configs/database");
class Promocao {
    async count() {
        const res = await database_1.db.sale_off_products.count();
        return res;
    }
    async index() {
        const response = await database_1.db.sale_off_products.findMany();
        return response;
    }
    async save(data) {
        const response = await database_1.db.sale_off_products.create({
            data: {
                product_id: data.product_id,
                off_value: data.off_value,
            },
        });
        return response;
    }
    async update(data) {
        const response = await database_1.db.sale_off_products.update({
            where: {
                id: data.id,
            },
            data: {
                off_value: data.off_value,
            },
        });
        return response;
    }
    async delete(id) {
        const response = await database_1.db.sale_off_products.delete({
            where: {
                id,
            },
        });
        if (!response)
            return false;
        return true;
    }
    async saveSaleOffProduct(data) {
        const response = await database_1.db.sale_off_products.create({
            data: {
                product_id: data.product_id,
                off_value: data.off_value,
            },
        });
        return response;
    }
    async getSaleOffPizzas() {
        const response = await database_1.db.sale_off_products.findMany({
            include: {
                product: {
                    select: {
                        pizza: true,
                    },
                },
            },
        });
        const promotions = response.filter((item) => {
            if (item.product?.pizza.length > 0)
                return true;
            return false;
        });
        return promotions;
    }
    async getSaleOfDrinks() {
        const response = await database_1.db.sale_off_products.findMany({
            include: {
                product: {
                    select: {
                        drink: true,
                    },
                },
            },
        });
        const promotions = response.filter((item) => {
            if (item.product?.drink.length > 0)
                return true;
            return false;
        });
        return promotions;
    }
}
exports.default = new Promocao();
