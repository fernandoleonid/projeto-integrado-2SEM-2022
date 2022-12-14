"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
class Pizza {
    async filterByType(typeId) {
        const response = await database_1.db.tbl_pizza.findMany({
            include: {
                tbl_product: {
                    include: {
                        tbl_product_pictures: {
                            include: {
                                tbl_picture: true,
                            },
                        },
                    },
                },
                tbl_pizza_ingredient: {
                    include: {
                        tbl_ingredient: true,
                    },
                },
                tbl_pizza_stuffing: true,
                tbl_pizza_type: true,
            },
            where: {
                pizza_type_id: typeId,
                tbl_product: {
                    status: true,
                },
            },
        });
        if (response.length === 0)
            return false;
        return response;
    }
    async filterByStuffing(stuffingId) {
        const response = await database_1.db.tbl_pizza.findMany({
            include: {
                tbl_product: {
                    include: {
                        tbl_product_pictures: {
                            include: {
                                tbl_picture: true,
                            },
                        },
                    },
                },
                tbl_pizza_ingredient: {
                    include: {
                        tbl_ingredient: true,
                    },
                },
                tbl_pizza_stuffing: true,
                tbl_pizza_type: true,
            },
            where: {
                tbl_pizza_stuffing: {
                    some: {
                        stuffing_id: stuffingId,
                    },
                },
                tbl_product: {
                    status: true,
                },
            },
        });
        if (response.length === 0)
            return false;
        return response;
    }
    async filterByTypeAndStuffing(typeId, stuffingId) {
        const response = await database_1.db.tbl_pizza.findMany({
            include: {
                tbl_product: {
                    include: {
                        tbl_product_pictures: {
                            include: {
                                tbl_picture: true,
                            },
                        },
                    },
                },
                tbl_pizza_ingredient: {
                    include: {
                        tbl_ingredient: true,
                    },
                },
                tbl_pizza_stuffing: true,
                tbl_pizza_type: true,
            },
            where: {
                pizza_type_id: typeId,
                tbl_pizza_stuffing: {
                    some: {
                        stuffing_id: stuffingId,
                    },
                },
                tbl_product: {
                    status: true,
                },
            },
        });
        if (response.length === 0)
            return false;
        return response;
    }
}
exports.default = new Pizza();
