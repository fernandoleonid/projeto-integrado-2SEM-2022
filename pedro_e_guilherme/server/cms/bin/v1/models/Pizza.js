"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../configs/database");
class Pizza {
    async count() {
        const res = await database_1.db.pizza.count();
        return res;
    }
    async save(data) {
        const response = await database_1.db.pizza.create({
            data: {
                product_id: data.product_id,
                pizza_type_id: data.pizza_type_id,
            },
        });
        return response;
    }
    async update(data) {
        const response = await database_1.db.pizza.update({
            data: {
                product_id: data.product_id,
                pizza_type_id: data.pizza_type_id,
            },
            where: {
                id: data.id,
            },
        });
        return response;
    }
    async index() {
        const response = await database_1.db.pizza.findMany({
            include: {
                product: {
                    include: {
                        tbl_product_pictures: {
                            select: {
                                picture_id: true,
                                picture: {
                                    select: {
                                        picture_link: true,
                                    },
                                },
                            },
                        },
                        sale_off_products: {
                            select: {
                                id: true,
                                off_value: true,
                            },
                        },
                    },
                },
                pizza_ingredient: {
                    select: {
                        id: true,
                        ingredient: true,
                    },
                },
                pizza_stuffing: {
                    select: {
                        id: true,
                        stuffing: true,
                    },
                },
                pizza_type: {
                    select: {
                        name: true,
                        dimensions: true,
                    },
                },
            },
            where: {
                product: {
                    status: true,
                },
            },
        });
        return response;
    }
    async show(id) {
        const response = await database_1.db.pizza.findUnique({
            where: {
                id,
            },
            include: {
                product: {
                    include: {
                        tbl_product_pictures: {
                            select: {
                                picture_id: true,
                                picture: {
                                    select: {
                                        picture_link: true,
                                    },
                                },
                            },
                        },
                        sale_off_products: {
                            select: {
                                id: true,
                                off_value: true,
                            },
                        },
                    },
                },
                pizza_ingredient: {
                    select: {
                        id: true,
                        ingredient: true,
                    },
                },
                pizza_stuffing: {
                    select: {
                        id: true,
                        stuffing: true,
                    },
                },
                pizza_type: {
                    select: {
                        name: true,
                        dimensions: true,
                    },
                },
            },
        });
        return response;
    }
    async delete(id) {
        const res = await database_1.db.pizza.update({
            where: { id },
            data: {
                product: {
                    update: {
                        status: false,
                    },
                },
            },
        });
        if (!res)
            return false;
        return true;
    }
    async activate(id) {
        const res = await database_1.db.pizza.update({
            where: { id },
            data: {
                product: {
                    update: {
                        status: true,
                    },
                },
            },
        });
        if (!res)
            return false;
        return true;
    }
    async savePizzaTypes(data) {
        const response = await database_1.db.pizza_type.create({
            data: {
                name: data.name,
                dimensions: data.dimensions,
                status: data.status,
            },
        });
        return response;
    }
    async getPizzaTypes() {
        const response = await database_1.db.pizza_type.findMany({
            where: {
                status: true,
            },
        });
        return response;
    }
    async getPizzaTypeByName(name) {
        const response = await database_1.db.pizza_type.findMany({
            where: {
                name,
            },
        });
        if (response.length <= 0)
            return false;
        return response[0].id;
    }
    async updatePizzaTypes(data) {
        const response = await database_1.db.pizza_type.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                dimensions: data.dimensions,
            },
        });
        return response;
    }
    async activatingPizzaTypes(id) {
        const response = await database_1.db.pizza_type.update({
            where: {
                id,
            },
            data: {
                status: true,
            },
        });
        if (!response)
            return false;
        const getAllPizzas = await database_1.db.pizza_type.findMany({
            where: {
                id,
            },
            include: {
                pizza: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                status: true,
                            },
                        },
                    },
                },
            },
        });
        if (getAllPizzas[0].pizza.length === 0) {
            return true;
        }
        const productIds = getAllPizzas[0].pizza.map((item) => item.product_id);
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
    async deletePizzaTypes(id) {
        const response = await database_1.db.pizza_type.update({
            where: {
                id,
            },
            data: {
                status: false,
            },
        });
        const getAllPizzas = await database_1.db.pizza_type.findMany({
            where: {
                id,
            },
            include: {
                pizza: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                status: true,
                            },
                        },
                    },
                },
            },
        });
        if (getAllPizzas[0].pizza.length === 0) {
            return true;
        }
        const productIds = getAllPizzas[0].pizza.map((item) => item.product_id);
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
        if (!response)
            return false;
        return true;
    }
}
exports.default = new Pizza();
