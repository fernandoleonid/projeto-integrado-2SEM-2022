"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
class Product {
    async show(id) {
        try {
            const response = await database_1.db.tbl_product.findUnique({
                where: {
                    id,
                },
            });
            return response;
        }
        catch (error) {
            return false;
        }
    }
    async likeAProduct(id) {
        try {
            await database_1.db.tbl_product.update({
                data: {
                    likes: { increment: 1 },
                },
                where: {
                    id,
                },
            });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async deslikeAProduct(id) {
        try {
            await database_1.db.tbl_product.update({
                data: {
                    likes: { decrement: 1 },
                },
                where: {
                    id,
                },
            });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async getByMostLiked() {
        const response = await database_1.db.tbl_product.findMany({
            include: {
                tbl_drink: {
                    include: {
                        tbl_drink_type: true,
                    },
                },
                tbl_pizza: {
                    include: {
                        tbl_pizza_ingredient: true,
                        tbl_pizza_stuffing: true,
                        tbl_pizza_type: true,
                    },
                },
            },
            orderBy: {
                likes: "desc",
            },
            where: {
                status: true,
            },
        });
        const sanitzedResponse = [];
        response.forEach((item) => {
            if (item.tbl_drink.length <= 0) {
                const newItem = item;
                delete newItem.tbl_drink;
                sanitzedResponse.push(newItem);
            }
            else {
                const newItem = item;
                delete newItem.tbl_pizza;
                sanitzedResponse.push(newItem);
            }
        });
        return sanitzedResponse;
    }
    async index() {
        const response = await database_1.db.tbl_product.findMany({
            include: {
                tbl_drink: {
                    include: {
                        tbl_drink_type: true,
                    },
                },
                tbl_pizza: {
                    include: {
                        tbl_pizza_ingredient: {
                            include: {
                                tbl_ingredient: {
                                    select: {
                                        name: true,
                                        id: true,
                                    },
                                },
                            },
                        },
                        tbl_pizza_stuffing: true,
                        tbl_pizza_type: true,
                    },
                },
                tbl_product_pictures: {
                    include: {
                        tbl_picture: true,
                    },
                },
            },
            where: {
                status: true,
            },
        });
        const sanitzedResponse = [];
        response.forEach((item) => {
            if (item.tbl_drink.length <= 0) {
                const newItem = item;
                delete newItem.tbl_drink;
                sanitzedResponse.push(newItem);
            }
            else {
                const newItem = item;
                delete newItem.tbl_pizza;
                sanitzedResponse.push(newItem);
            }
        });
        return sanitzedResponse;
    }
    async getProductInPromotions() {
        const response = await database_1.db.tbl_sale_off_products.findMany({
            include: {
                tbl_product: {
                    include: {
                        tbl_drink: {
                            include: {
                                tbl_drink_type: true,
                            },
                        },
                        tbl_pizza: {
                            include: {
                                tbl_pizza_ingredient: {
                                    include: {
                                        tbl_ingredient: true,
                                    },
                                },
                                tbl_pizza_stuffing: true,
                                tbl_pizza_type: true,
                            },
                        },
                        tbl_product_pictures: {
                            include: {
                                tbl_picture: true,
                            },
                        },
                    },
                },
            },
            where: {
                tbl_product: {
                    status: true,
                },
            },
        });
        const sanitzedResponse = [];
        response.forEach((item) => {
            if (item.tbl_product?.tbl_drink.length <= 0) {
                const newItem = item;
                delete newItem.tbl_product.tbl_drink;
                sanitzedResponse.push(newItem);
            }
            else {
                const newItem = item;
                delete newItem.tbl_product.tbl_pizza;
                sanitzedResponse.push(newItem);
            }
        });
        return response;
    }
    async getLowPrice() {
        const response = await database_1.db.tbl_product.findMany({
            include: {
                tbl_drink: {
                    include: {
                        tbl_drink_type: true,
                    },
                },
                tbl_pizza: {
                    include: {
                        tbl_pizza_ingredient: true,
                        tbl_pizza_stuffing: true,
                        tbl_pizza_type: true,
                    },
                },
            },
            where: {
                status: true,
            },
            orderBy: {
                price: "asc",
            },
        });
        const sanitzedResponse = [];
        response.forEach((item) => {
            if (item.tbl_drink.length <= 0) {
                const newItem = item;
                delete newItem.tbl_drink;
                sanitzedResponse.push(newItem);
            }
            else {
                const newItem = item;
                delete newItem.tbl_pizza;
                sanitzedResponse.push(newItem);
            }
        });
        return sanitzedResponse;
    }
    async getHighPrice() {
        const response = await database_1.db.tbl_product.findMany({
            include: {
                tbl_drink: {
                    include: {
                        tbl_drink_type: true,
                    },
                },
                tbl_pizza: {
                    include: {
                        tbl_pizza_ingredient: true,
                        tbl_pizza_stuffing: true,
                        tbl_pizza_type: true,
                    },
                },
            },
            where: {
                status: true,
            },
            orderBy: {
                price: "desc",
            },
        });
        const sanitzedResponse = [];
        response.forEach((item) => {
            if (item.tbl_drink.length <= 0) {
                const newItem = item;
                delete newItem.tbl_drink;
                sanitzedResponse.push(newItem);
            }
            else {
                const newItem = item;
                delete newItem.tbl_pizza;
                sanitzedResponse.push(newItem);
            }
        });
        return sanitzedResponse;
    }
}
exports.default = new Product();
