"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../configs/database");
class PizzaRecheio {
    async save(data) {
        const response = await database_1.db.stuffing.create({
            data: {
                name: data.name,
                status: data.status,
            },
        });
        return response;
    }
    async show(id) {
        const response = await database_1.db.stuffing.findUnique({
            where: {
                id,
            },
        });
        if (!response)
            return false;
        return response;
    }
    async showByName(name) {
        const response = await database_1.db.stuffing.findMany({
            where: {
                name,
            },
        });
        if (response.length <= 0)
            return false;
        return response[0];
    }
    async index() {
        const response = await database_1.db.stuffing.findMany();
        return response;
    }
    async update(data) {
        const response = await database_1.db.stuffing.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
            },
        });
        return response;
    }
    async delete(id) {
        const response = await database_1.db.stuffing.update({
            where: {
                id,
            },
            data: {
                status: false,
            },
        });
        if (!response)
            return false;
        const getAllPizzas = await database_1.db.stuffing.findMany({
            where: {
                id,
            },
            include: {
                pizza_stuffing: {
                    include: {
                        pizza: {
                            include: {
                                product: {
                                    select: {
                                        id: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        const productIds = getAllPizzas[0].pizza_stuffing.map((item) => {
            return item.pizza?.product_id;
        });
        await Promise.all(productIds.map(async (id) => {
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
    async activate(id) {
        const response = await database_1.db.stuffing.update({
            where: {
                id,
            },
            data: {
                status: true,
            },
        });
        if (!response)
            return false;
        const getAllPizzas = await database_1.db.stuffing.findMany({
            where: {
                id,
            },
            include: {
                pizza_stuffing: {
                    include: {
                        pizza: {
                            include: {
                                product: {
                                    select: {
                                        id: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        const productIds = getAllPizzas[0].pizza_stuffing.map((item) => {
            return item.pizza?.product_id;
        });
        await Promise.all(productIds.map(async (id) => {
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
    async savePizzaWithStuffing(data) {
        const response = await database_1.db.pizza_stuffing.create({
            data: {
                pizza_id: data.pizza_id,
                stuffing_id: data.stuffing_id,
            },
        });
        return response;
    }
    async updatePizzaWithStuffing(data) {
        const response = await database_1.db.pizza_stuffing.update({
            data: {
                stuffing_id: data.stuffing_id,
            },
            where: {
                id: data.id,
            },
        });
        return response;
    }
}
exports.default = new PizzaRecheio();
