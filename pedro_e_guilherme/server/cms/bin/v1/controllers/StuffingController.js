"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PizzaRecheio_1 = __importDefault(require("../models/PizzaRecheio"));
class StuffingController {
    async save(req, rep) {
        const { name } = req.body;
        const response = await PizzaRecheio_1.default.save({
            id: -1,
            name: name,
            status: true,
        });
        return rep.send({
            code: 200,
            error: false,
            payload: [response],
        });
    }
    async index(req, rep) {
        const response = await PizzaRecheio_1.default.index();
        return rep.send({
            code: 200,
            error: false,
            payload: response,
        });
    }
    async show(req, rep) {
        const { id } = req.params;
        const response = await PizzaRecheio_1.default.show(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Content Not Founded"],
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
        const response = await PizzaRecheio_1.default.delete(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Content Not Founded"],
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
        const response = await PizzaRecheio_1.default.activate(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Content Not Founded"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: ["Succefull Activated!"],
        });
    }
    async update(req, rep) {
        const { id } = req.params;
        const { name } = req.body;
        const response = await PizzaRecheio_1.default.update({
            id: parseInt(id),
            name: name,
            status: true,
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
}
exports.default = new StuffingController();
