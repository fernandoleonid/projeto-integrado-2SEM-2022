"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
class PizzaController {
    async index(req, rep) {
        const { filters, scale } = req.query;
        if (filters === "like") {
            const response = await Product_1.default.getByMostLiked();
            return response;
        }
        if (filters === "price" && scale === "desc") {
            const response = await Product_1.default.getHighPrice();
            return response;
        }
        else if (scale === "asc") {
            const response = await Product_1.default.getLowPrice();
            return response;
        }
        const response = await Product_1.default.index();
        return response;
    }
    async indexInPromotions(req, rep) {
        const response = await Product_1.default.getProductInPromotions();
        return response;
    }
    async likeAProduct(req, rep) {
        const { id } = req.params;
        const response = await Product_1.default.likeAProduct(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["content not founded!"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: ["Succefull Liked!"],
        });
    }
    async deslikeAProduct(req, rep) {
        const { id } = req.params;
        const response = await Product_1.default.deslikeAProduct(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["content not founded!"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: ["Succefull Desliked!"],
        });
    }
    async show(req, rep) {
        const { id } = req.params;
        const response = await Product_1.default.show(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["content not founded!"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            payload: [response],
        });
    }
}
exports.default = new PizzaController();
