"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../configs/database");
class Categoria {
    async save(data) {
        const response = await database_1.db.tbl_category.create({
            data: {
                name: data.name,
                status: true,
            },
        });
        return response;
    }
    async delete(id) {
        const response = await database_1.db.tbl_category.update({
            data: {
                status: false,
            },
            where: {
                id,
            },
        });
        if (!response)
            return false;
        const allProducts = await database_1.db.tbl_category.findMany({
            include: {
                product: true,
            },
            where: {
                id,
            },
        });
        const productsIds = allProducts.map((item) => item.id);
        await Promise.all(productsIds.map(async (id) => {
            await database_1.db.product.update({
                where: {
                    id: id,
                },
                data: {
                    status: false,
                },
            });
        }));
        return true;
    }
    async update(data) {
        const response = await database_1.db.tbl_category.update({
            data: {
                name: data.name,
            },
            where: {
                id: data.id,
            },
        });
        return response;
    }
    async index() {
        const response = await database_1.db.tbl_category.findMany();
        return response;
    }
    async show(id) {
        const response = await database_1.db.tbl_category.findUnique({
            where: {
                id,
            },
        });
        return response;
    }
    async getByName(name) {
        const response = await database_1.db.tbl_category.findMany({
            where: {
                name,
            },
        });
        if (response.length <= 0)
            return false;
        return response[0];
    }
    async activate(id) {
        const response = await database_1.db.tbl_category.update({
            data: {
                status: true,
            },
            where: {
                id,
            },
        });
        if (!response)
            return false;
        const allProducts = await database_1.db.tbl_category.findMany({
            include: {
                product: true,
            },
            where: {
                id,
            },
        });
        const productsIds = allProducts.map((item) => item.id);
        await Promise.all(productsIds.map(async (id) => {
            await database_1.db.product.update({
                where: {
                    id: id,
                },
                data: {
                    status: true,
                },
            });
        }));
        return true;
    }
}
exports.default = new Categoria();
