"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../configs/database");
class Product {
    async count() {
        const res = await database_1.db.user.count();
        return res;
    }
    async save(data) {
        const { id } = await database_1.db.product.create({
            data: {
                name: data.name,
                price: data.price,
                created_by: data.created_by,
                status: data.status,
                category_id: data.category_id,
                likes: 1
            },
        });
        return id;
    }
    async index() {
        const response = await database_1.db.product.findMany();
        return response;
    }
    async show(id) {
        const response = await database_1.db.product.findUnique({
            where: {
                id,
            },
        });
        return response;
    }
    async update(data) {
        const response = await database_1.db.product.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                price: data.price,
            },
        });
        return response;
    }
    async delete(id) {
        await database_1.db.tbl_product_pictures.deleteMany({
            where: {
                product_id: id,
            },
        });
        await database_1.db.sale_off_products.deleteMany({
            where: {
                product_id: id,
            },
        });
        const response = await database_1.db.product.delete({
            where: {
                id,
            },
        });
        if (!response)
            return false;
        return true;
    }
}
exports.default = new Product();
