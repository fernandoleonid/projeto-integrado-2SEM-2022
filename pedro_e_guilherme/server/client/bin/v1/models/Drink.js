"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
class Drink {
    async filterForType(typeId) {
        const response = await database_1.db.tbl_drink.findMany({
            include: {
                tbl_drink_type: true,
                tbl_product: {
                    include: {
                        tbl_product_pictures: {
                            include: {
                                tbl_picture: true,
                            },
                        },
                    },
                },
            },
            where: {
                drink_type_id: typeId,
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
exports.default = new Drink();
