"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../configs/database");
class Ingredient {
    async index() {
        const response = await database_1.db.tbl_ingredient.findMany();
        return response;
    }
    async save(data) {
        const response = await database_1.db.tbl_ingredient.create({
            data: {
                name: data.name,
            },
        });
        return response;
    }
    async show(id) {
        const response = await database_1.db.tbl_ingredient.findUnique({
            where: {
                id,
            },
        });
        return response;
    }
    async update(data) {
        try {
            const response = await database_1.db.tbl_ingredient.update({
                where: {
                    id: data.id,
                },
                data: {
                    name: data.name,
                },
            });
            return response;
        }
        catch (error) {
            return false;
        }
    }
    async delete(id) {
        await database_1.db.pizza_ingredient.deleteMany({
            where: {
                ingredient_id: id,
            },
        });
        const response = await database_1.db.tbl_ingredient.delete({
            where: {
                id,
            },
        });
        return response;
    }
    async getByName(name) {
        const response = await database_1.db.tbl_ingredient.findMany({
            where: {
                name: name,
            },
        });
        if (response.length <= 0)
            return false;
        return response[0];
    }
    async addIngredientInPizza(data) {
        const response = await database_1.db.pizza_ingredient.create({
            data: {
                ingredient_id: data.ingredient_id,
                pizza_id: data.pizza_id,
            },
        });
        return response;
    }
    async deleteIngredientInPizza(id) {
        const response = await database_1.db.pizza_ingredient.delete({
            where: {
                id,
            },
        });
        return response;
    }
}
exports.default = new Ingredient();
