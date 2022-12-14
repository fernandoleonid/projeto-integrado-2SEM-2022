"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bebida_1 = __importDefault(require("../models/Bebida"));
const Categoria_1 = __importDefault(require("../models/Categoria"));
const Picture_1 = __importDefault(require("../models/Picture"));
const Product_1 = __importDefault(require("../models/Product"));
const Promocao_1 = __importDefault(require("../models/Promocao"));
const services_1 = require("../services");
class DrinkController {
    async count(req, rep) {
        const count = await Bebida_1.default.count();
        return rep.send({
            error: false,
            code: 200,
            count: count,
        });
    }
    async index(req, rep) {
        const response = await Bebida_1.default.index();
        return rep.send({
            code: 200,
            error: false,
            payload: response,
        });
    }
    async show(req, rep) {
        const { id } = req.params;
        const response = await Bebida_1.default.show(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Content not founded!"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            payload: [response],
        });
    }
    async delete(req, rep) {
        const { id } = req.params;
        const response = await Bebida_1.default.delete(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Content not founded"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: ["Succefull Deleted!"],
        });
    }
    async save(req, rep) {
        const { picture, volume, type, saleOffValue, price, name, categoria } = req.body;
        const categoriaInDb = await Categoria_1.default.getByName(categoria.value);
        if (!categoriaInDb) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: "Categoria nao encontrado! ",
            });
        }
        const userData = req.user.payload;
        const userId = userData.id;
        await picture.toBuffer();
        const url = await services_1.FirebaseService.uploadImage(picture);
        const pictureId = await Picture_1.default.save({ id: -1, picture_link: url });
        const drinkTypeInDb = await Bebida_1.default.getBebidaTypeByName(type.value);
        if (!drinkTypeInDb) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Tipo de bebida não encontrado!"],
            });
        }
        const productId = await Product_1.default.save({
            id: -1,
            created_by: userId,
            likes: 0,
            name: name.value,
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
        const drink = await Bebida_1.default.save({
            id: -1,
            drink_type_id: drinkTypeInDb?.id,
            product_id: productId,
            volume: parseInt(volume.value),
        });
        return rep.send({
            code: 200,
            error: false,
            payload: [drink],
        });
    }
    async activate(req, rep) {
        const { id } = req.params;
        const response = await Bebida_1.default.activate(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Content not founded"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: ["Activated sucefully!"],
        });
    }
    async update(req, rep) {
        const { id } = req.params;
        const { picture, volume, type, saleOffValue, price, name, categoria } = req.body;
        const drink = await Bebida_1.default.show(parseInt(id));
        if (!drink) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Content not founded!"],
            });
        }
        if (picture) {
            await picture.toBuffer();
            const url = await services_1.FirebaseService.uploadImage(picture);
            const pictureId = drink?.product?.tbl_product_pictures[0].picture?.id;
            await Picture_1.default.update({ id: pictureId, picture_link: url });
        }
        let categoriaId = drink?.product?.category_id;
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
        if (type && volume) {
            const res = await Bebida_1.default.getBebidaTypeByName(type.value);
            if (!res) {
                return rep.status(404).send({
                    code: 404,
                    error: true,
                    message: ["Tipo de bebida não encontrado!"],
                });
            }
            await Bebida_1.default.update({
                drink_type_id: res.id,
                id: parseInt(id),
                product_id: drink.product?.id,
                volume: parseInt(volume.value),
            });
        }
        else if (type) {
            const res = await Bebida_1.default.getBebidaTypeByName(type.value);
            if (!res) {
                return rep.status(404).send({
                    code: 404,
                    error: true,
                    message: ["Tipo de bebida não encontrado!"],
                });
            }
            await Bebida_1.default.update({
                drink_type_id: res.id,
                id: parseInt(id),
                product_id: drink.product?.id,
                volume: drink.volume,
            });
        }
        else if (volume) {
            await Bebida_1.default.update({
                drink_type_id: drink?.drink_type?.id,
                id: parseInt(id),
                product_id: drink.product?.id,
                volume: parseInt(volume.value),
            });
        }
        if (saleOffValue) {
            if (drink?.product?.sale_off_products[0] != undefined) {
                await Promocao_1.default.update({
                    id: drink?.product?.sale_off_products[0].id,
                    off_value: saleOffValue.value,
                    product_id: drink?.product?.id,
                });
            }
            else {
                await Promocao_1.default.saveSaleOffProduct({
                    id: -1,
                    off_value: saleOffValue.value,
                    product_id: drink.product?.id,
                });
            }
        }
        await Product_1.default.update({
            created_by: drink?.product?.created_by,
            id: drink?.product?.id,
            likes: drink?.product?.likes,
            name: name.value,
            price: price.value,
            status: true,
            category_id: categoriaId,
        });
        return rep.send({
            code: 200,
            error: false,
            message: ["Updated Sucefull"],
        });
    }
}
exports.default = new DrinkController();
