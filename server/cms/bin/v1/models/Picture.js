"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../configs/database");
class Picture {
    async count() {
        const res = await database_1.db.picture.count();
        return res;
    }
    async index() {
        const response = await database_1.db.picture.findMany({
            include: {
                tbl_product_pictures: true,
            },
        });
        return response;
    }
    async show(id) {
        const response = await database_1.db.picture.findUnique({
            where: {
                id,
            },
            include: {
                tbl_product_pictures: true,
            },
        });
        return response;
    }
    async save(data) {
        const response = await database_1.db.picture.create({
            data: {
                picture_link: data.picture_link,
            },
        });
        return response.id;
    }
    async update(data) {
        const response = await database_1.db.picture.update({
            where: {
                id: data.id,
            },
            data: {
                picture_link: data.picture_link,
            },
        });
        return response;
    }
    async delete(id) {
        const response = await database_1.db.picture.delete({
            where: {
                id,
            },
        });
        if (!response)
            return false;
        return true;
    }
    async addPictureInProduct(data) {
        const response = await database_1.db.tbl_product_pictures.create({
            data: {
                picture_id: data.picture_id,
                product_id: data.product_id,
            },
        });
        return response;
    }
}
exports.default = new Picture();
