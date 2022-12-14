"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../configs/database");
class Bebida {
    async count() {
        const res = await database_1.db.drink.count();
        return res;
    }
    async save(data) {
        const response = await database_1.db.drink.create({
            data: {
                volume: data.volume,
                product_id: data.product_id,
                drink_type_id: data.drink_type_id,
            },
            select: {
                product: {
                    include: {
                        tbl_product_pictures: true
                    }
                },
                product_id: true,
                drink_type_id: true,
                drink_type: true,
                volume: true,
                id: true,
            }
        });
        return response;
    }
    async index() {
        const response = await database_1.db.drink.findMany({
            select: {
                id: true,
                volume: true,
                drink_type: true,
                product: {
                    include: {
                        tbl_product_pictures: {
                            select: {
                                picture: true,
                            },
                        },
                        sale_off_products: true,
                    },
                },
            },
        });
        return response;
    }
    async show(id) {
        const response = await database_1.db.drink.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                volume: true,
                drink_type: true,
                product: {
                    include: {
                        tbl_product_pictures: {
                            select: {
                                picture: true,
                            },
                        },
                        sale_off_products: true,
                    },
                },
            },
        });
        return response;
    }
    async delete(id) {
        const response = await database_1.db.drink.update({
            where: { id },
            data: {
                product: {
                    update: {
                        status: false,
                    },
                },
            },
        });
        if (!response)
            return false;
        return true;
    }
    async activate(id) {
        const response = await database_1.db.drink.update({
            where: { id },
            data: {
                product: {
                    update: {
                        status: true,
                    },
                },
            },
        });
        if (!response)
            return false;
        return true;
    }
    async update(data) {
        const response = await database_1.db.drink.update({
            data: {
                drink_type_id: data.drink_type_id,
                volume: data.volume,
            },
            where: {
                id: data.id,
            },
        });
        return response;
    }
    async saveBebidaTypes(data) {
        const response = await database_1.db.drink_type.create({
            data: {
                name: data.name,
                status: data.status,
            },
        });
        return response;
    }
    async getBebidaTypes() {
        const response = await database_1.db.drink_type.findMany();
        return response;
    }
    async getBebidaTypeByName(name) {
        const response = await database_1.db.drink_type.findMany({
            where: {
                name,
            },
        });
        if (!response)
            return false;
        return response[0];
    }
    async getBebidaTypeById(id) {
        const response = await database_1.db.drink_type.findUnique({
            where: {
                id,
            },
        });
        if (!response)
            return false;
        return response;
    }
    async updateBebidaTypes(data) {
        const response = await database_1.db.drink_type.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                status: data.status,
            },
        });
        return response;
    }
    async deleteBebidaTypes(id) {
        const response = await database_1.db.drink_type.update({
            where: {
                id,
            },
            data: {
                status: false,
            },
        });
        if (!response)
            return false;
        const allProducts = await database_1.db.drink_type.findMany({
            where: {
                id,
            },
            include: {
                drink: {
                    include: {
                        product: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        const ids = allProducts[0].drink.map((item) => item.product_id);
        Promise.all(ids.map(async (id) => {
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
    async activateBebidaTypes(id) {
        const response = await database_1.db.drink_type.update({
            where: {
                id,
            },
            data: {
                status: true,
            },
        });
        if (!response)
            return false;
        const allProducts = await database_1.db.drink_type.findMany({
            where: {
                id,
            },
            include: {
                drink: {
                    include: {
                        product: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        const ids = allProducts[0].drink.map((item) => item.product_id);
        Promise.all(ids.map(async (id) => {
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
exports.default = new Bebida();
