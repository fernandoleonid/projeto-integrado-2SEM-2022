"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingredient_1 = __importDefault(require("../models/Ingredient"));
const Picture_1 = __importDefault(require("../models/Picture"));
const Pizza_1 = __importDefault(require("../models/Pizza"));
const PizzaRecheio_1 = __importDefault(require("../models/PizzaRecheio"));
const Product_1 = __importDefault(require("../models/Product"));
const Promocao_1 = __importDefault(require("../models/Promocao"));
const services_1 = require("../services");
const Categoria_1 = __importDefault(require("../models/Categoria"));
class PizzaController {
    async count(req, rep) {
        const count = await Pizza_1.default.count();
        return rep.send({
            error: false,
            code: 200,
            count: count,
        });
    }
    async save(req, rep) {
        const { body } = req;
        const userData = req.user.payload;
        const userId = userData.id;
        const { picture, stuffing, price, saleOffValue, type, ingredient, categoria, } = body;
        const categoriaInDb = await Categoria_1.default.getByName(categoria.value);
        if (!categoriaInDb) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: "Categoria nao encontrado! ",
            });
        }
        const ingredients = [];
        ingredient.forEach((e) => {
            ingredients.push(e.value);
        });
        let checkIngredients = true;
        const ingredientsObject = await Promise.all(ingredients.map(async (ingredient) => {
            const res = await Ingredient_1.default.getByName(ingredient);
            if (!res) {
                checkIngredients = false;
                return;
            }
            return res;
        }));
        if (!checkIngredients) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Content Not Founded - Ingredient"],
            });
        }
        await picture.toBuffer();
        const url = await services_1.FirebaseService.uploadImage(picture);
        const pictureId = await Picture_1.default.save({ id: -1, picture_link: url });
        const stuffinInDb = await PizzaRecheio_1.default.showByName(stuffing.value);
        const pizzaTypeId = await Pizza_1.default.getPizzaTypeByName(type.value);
        if (!stuffinInDb) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: "Recheio nao encontrado! ",
            });
        }
        if (!pizzaTypeId) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: "Tipo de Pizza nao encontrado! ",
            });
        }
        const name = stuffing.value + " " + type.value;
        const productId = await Product_1.default.save({
            id: -1,
            created_by: userId,
            likes: 1,
            name,
            price: price.value,
            status: true,
            category_id: categoriaInDb.id,
        });
        await Picture_1.default.addPictureInProduct({
            id: -1,
            picture_id: pictureId,
            product_id: productId,
        });
        if (saleOffValue.value > 0) {
            await Promocao_1.default.saveSaleOffProduct({
                id: -1,
                off_value: saleOffValue.value,
                product_id: productId,
            });
        }
        const pizza = await Pizza_1.default.save({
            id: -1,
            product_id: productId,
            pizza_type_id: pizzaTypeId,
        });
        const stuffingId = stuffinInDb.id;
        await PizzaRecheio_1.default.savePizzaWithStuffing({
            id: -1,
            pizza_id: pizza.id,
            stuffing_id: stuffingId,
        });
        ingredientsObject.forEach(async (data) => {
            await Ingredient_1.default.addIngredientInPizza({
                id: -1,
                pizza_id: pizza.id,
                ingredient_id: data?.id,
            });
        });
        const response = await Pizza_1.default.show(pizza.id);
        return rep.send({
            statusCode: 200,
            error: false,
            payload: [response],
        });
    }
    async index(req, rep) {
        const response = await Pizza_1.default.index();
        return rep.send({
            code: 200,
            error: false,
            payload: response,
        });
    }
    async delete(req, rep) {
        const { id } = req.params;
        const res = await Pizza_1.default.delete(parseInt(id));
        if (!res) {
            return rep.status(404).send({
                error: true,
                code: 404,
                message: ["Content Not Founded"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: ["Succefull Deleted"],
        });
    }
    async activate(req, rep) {
        const { id } = req.params;
        const res = await Pizza_1.default.activate(parseInt(id));
        if (!res) {
            return rep.status(404).send({
                error: true,
                code: 404,
                message: ["Content Not Founded"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: ["Sucefull activate!"],
        });
    }
    async show(req, rep) {
        const { id } = req.params;
        const pizza = await Pizza_1.default.show(parseInt(id));
        if (!pizza) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Content no founded - 404"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            payload: pizza,
        });
    }
    async update(req, rep) {
        const { picture, stuffing, price, saleOffValue, type, ingredient, categoria, } = req.body;
        const pizzaId = req.params.id;
        const pizza = await Pizza_1.default.show(parseInt(pizzaId));
        console.log(pizza);
        if (ingredient.length > 0) {
            const ingredients = [];
            ingredient.forEach((e) => {
                ingredients.push(e.value);
            });
            let checkIngredients = true;
            const ingredientsObject = await Promise.all(ingredients.map(async (ingredient) => {
                const res = await Ingredient_1.default.getByName(ingredient);
                if (!res) {
                    checkIngredients = false;
                    return;
                }
                return res;
            }));
            if (!checkIngredients) {
                return rep.status(404).send({
                    code: 404,
                    error: true,
                    message: ["Content Not Founded - Ingredient"],
                });
            }
            const pizza = await Pizza_1.default.show(parseInt(pizzaId));
            const relationsWithIngredient = pizza?.pizza_ingredient;
            if (relationsWithIngredient) {
                await Promise.all(relationsWithIngredient?.map(async (data) => {
                    const id = data.id;
                    await Ingredient_1.default.deleteIngredientInPizza(id);
                }));
            }
            await Promise.all(ingredientsObject.map(async (data) => {
                await Ingredient_1.default.addIngredientInPizza({
                    id: -1,
                    ingredient_id: data?.id,
                    pizza_id: parseInt(pizzaId),
                });
            }));
        }
        if (picture) {
            await picture.toBuffer();
            const url = await services_1.FirebaseService.uploadImage(picture);
            const pictureId = pizza?.product?.tbl_product_pictures[0].picture_id;
            await Picture_1.default.update({ id: pictureId, picture_link: url });
        }
        if (stuffing) {
            const stuffingInDb = await PizzaRecheio_1.default.showByName(stuffing.value);
            if (!stuffingInDb) {
                return rep.status(404).send({
                    code: 404,
                    error: true,
                    message: "Recheio nao encontrado! ",
                });
            }
            const relationId = pizza?.pizza_stuffing[0].id;
            await PizzaRecheio_1.default.updatePizzaWithStuffing({
                id: relationId,
                pizza_id: parseInt(pizzaId),
                stuffing_id: stuffingInDb.id,
            });
        }
        if (type) {
            const pizzaTypeInDb = await Pizza_1.default.getPizzaTypeByName(type.value);
            if (!pizzaTypeInDb) {
                return rep.status(404).send({
                    code: 404,
                    error: true,
                    message: ["Tipo de Pizza nao encontrado"],
                });
            }
            await Pizza_1.default.update({
                id: parseInt(pizzaId),
                pizza_type_id: pizzaTypeInDb,
                product_id: pizza?.product_id,
            });
        }
        let newName = pizza?.product?.name;
        let newPrice = pizza?.product?.price;
        if (price)
            newPrice = price.value;
        if (type && stuffing) {
            newName = stuffing.value + " " + type.value;
        }
        else if (stuffing) {
            newName = (stuffing.value + " " + pizza?.pizza_type?.name);
        }
        else {
            newName = pizza?.pizza_stuffing[0].stuffing?.name + " " + type.value;
        }
        let categoriaId = pizza?.product?.category_id;
        if (categoria) {
            const checkCategoria = await Categoria_1.default.getByName(categoria.value);
            if (!checkCategoria) {
                return rep.status(404).send({
                    code: 404,
                    error: true,
                    message: "Categoria nao encontrado! ",
                });
            }
            categoriaId = checkCategoria.id;
        }
        await Product_1.default.update({
            id: pizza?.product_id,
            name: newName,
            price: newPrice,
            created_by: pizza?.product?.created_by,
            likes: pizza?.product?.likes,
            status: pizza?.product?.status,
            category_id: categoriaId,
        });
        if (saleOffValue) {
            if (pizza?.product?.sale_off_products[0] != undefined)
                await Promocao_1.default.update({
                    id: pizza?.product?.sale_off_products[0].id,
                    off_value: saleOffValue.value,
                    product_id: pizza?.product_id,
                });
            else
                await Promocao_1.default.saveSaleOffProduct({
                    id: -1,
                    product_id: pizza?.product_id,
                    off_value: saleOffValue.value,
                });
        }
        return rep.send({
            code: 200,
            error: false,
            message: ["Atualizado com Sucesso!"],
        });
    }
}
exports.default = new PizzaController();
