"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const Pizza_1 = __importDefault(require("../models/Pizza"));
class PizzaController {
    async index(req, rep) {
        const { stuffing, type } = req.query;
        console.log(stuffing, type);
        if (stuffing && type) {
            const stuffingInDb = await database_1.db.tbl_stuffing.findMany({
                where: { name: stuffing },
            });
            if (!stuffingInDb[0]) {
                return rep.code(404).send({
                    code: 404,
                    error: true,
                    message: ["Recheio não encontrado! "],
                });
            }
            const typeInDb = await database_1.db.tbl_pizza_type.findMany({
                where: { name: type },
            });
            if (!typeInDb[0]) {
                return rep.code(404).send({
                    code: 404,
                    error: true,
                    message: ["Tipo de não encontrado!"],
                });
            }
            const response = await Pizza_1.default.filterByTypeAndStuffing(typeInDb[0].id, stuffingInDb[0].id);
            if (!response) {
                return rep.code(404).send({
                    code: 404,
                    error: true,
                    message: ["Não temos pizzas com esses filtros selecionados!"],
                });
            }
            return rep.send({
                code: 200,
                error: false,
                payload: response,
            });
        }
        else if (stuffing && !type) {
            const stuffingInDb = await database_1.db.tbl_stuffing.findMany({
                where: { name: stuffing },
            });
            if (!stuffingInDb[0]) {
                return rep.code(404).send({
                    code: 404,
                    error: true,
                    message: ["Recheio não encontrado! "],
                });
            }
            const response = await Pizza_1.default.filterByStuffing(stuffingInDb[0].id);
            if (!response) {
                return rep.code(404).send({
                    code: 404,
                    error: true,
                    message: ["Não temos pizzas com esses filtros selecionados!"],
                });
            }
            return rep.send({
                code: 200,
                error: false,
                payload: response,
            });
        }
        else if (!stuffing && type) {
            const typeInDb = await database_1.db.tbl_pizza_type.findMany({
                where: { name: type },
            });
            if (!typeInDb[0]) {
                return rep.code(404).send({
                    code: 404,
                    error: true,
                    message: ["Tipo de não encontrado!"],
                });
            }
            const response = await Pizza_1.default.filterByType(typeInDb[0].id);
            if (!response) {
                return rep.code(404).send({
                    code: 404,
                    error: true,
                    message: ["Não temos pizzas com esses filtros selecionados!"],
                });
            }
            return rep.send({
                code: 200,
                error: false,
                payload: response,
            });
        }
        return rep.code(400).send({
            code: 400,
            error: true,
            message: [
                "Please for use this routes is necessary include the querystrings!",
            ],
        });
    }
}
exports.default = new PizzaController();
