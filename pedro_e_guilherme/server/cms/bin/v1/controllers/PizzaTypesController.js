"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pizza_1 = __importDefault(require("../models/Pizza"));
class PizzaTypesController {
    async save(req, rep) {
        const { name, dimensions } = req.body;
        const response = await Pizza_1.default.savePizzaTypes({
            id: -1,
            dimensions: dimensions,
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
        const response = await Pizza_1.default.getPizzaTypes();
        return rep.send({
            code: 200,
            error: false,
            payload: response,
        });
    }
    async delete(req, rep) {
        const { id } = req.params;
        const response = await Pizza_1.default.deletePizzaTypes(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                statusCode: 404,
                error: true,
                message: ["Content Not Founded!"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: ["Sucefull deleted!"],
        });
    }
    async activate(req, rep) {
        const { id } = req.params;
        const response = await Pizza_1.default.activatingPizzaTypes(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                statusCode: 404,
                error: true,
                message: ["Content Not Founded!"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: ["Sucefull activate!"],
        });
    }
    async update(req, rep) {
        const { id } = req.params;
        const { dimensions, name } = req.body;
        const response = await Pizza_1.default.updatePizzaTypes({
            id: parseInt(id),
            dimensions,
            name,
            status: true,
        });
        if (!response) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Content no founded - 404"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: ["Succefull updated!"],
        });
    }
}
exports.default = new PizzaTypesController();
