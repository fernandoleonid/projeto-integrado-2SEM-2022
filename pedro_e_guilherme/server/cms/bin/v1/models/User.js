"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../configs/database");
class User {
    async count() {
        const res = await database_1.db.user.count();
        return res;
    }
    async index() {
        const res = await database_1.db.user.findMany();
        return res;
    }
    async show(id) {
        const res = await database_1.db.user.findUnique({
            where: {
                id,
            },
        });
        return res;
    }
    async save(data) {
        const { id } = await database_1.db.user.create({
            data: {
                name: data.name,
                cellphone: data.cellphone,
                email: data.email,
                password: data.password,
                profile_picture: data.profile_picture,
                isAdmin: data.isAdmin,
            },
        });
        console.log(id);
        return id;
    }
    async update(newUser) {
        const res = await database_1.db.user.update({
            data: {
                name: newUser.name,
                email: newUser.email,
                profile_picture: newUser.profile_picture,
                password: newUser.password,
                cellphone: newUser.cellphone,
            },
            where: {
                id: newUser.id,
            },
        });
        return res;
    }
    async delete(id) {
        const res = await database_1.db.user.delete({
            where: {
                id,
            },
        });
        if (!res)
            return false;
        return true;
    }
    async getUserProducts(id) {
        const res = await database_1.db.user.findMany({
            where: {
                id,
            },
            select: {
                product: true,
            },
        });
        return res;
    }
    async getUserByEmail(email) {
        const res = await database_1.db.user.findMany({
            where: {
                email,
            },
        });
        return res;
    }
}
exports.default = new User();
