"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Categoria_1 = __importDefault(require("../models/Categoria"));
class CategoriaController {
    async save(req, rep) {
        const { name } = req.body;
        const response = await Categoria_1.default.save({
            name,
        });
        return rep.send({
            code: 200,
            error: false,
            payload: [response],
        });
    }
    async update(req, rep) {
        const { id } = req.params;
        const { name } = req.body;
        const response = await Categoria_1.default.update({
            id: parseInt(id),
            name,
        });
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
            message: ["Succefull updated!"],
        });
    }
    async delete(req, rep) {
        const { id } = req.params;
        const response = await Categoria_1.default.delete(parseInt(id));
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
    async activate(req, rep) {
        const { id } = req.params;
        const response = await Categoria_1.default.activate(parseInt(id));
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
    async show(req, rep) {
        const { id } = req.params;
        const response = await Categoria_1.default.show(parseInt(id));
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
    async index(req, rep) {
        const response = await Categoria_1.default.index();
        return rep.send({
            code: 200,
            error: false,
            payload: response,
        });
    }
}
exports.default = new CategoriaController();
