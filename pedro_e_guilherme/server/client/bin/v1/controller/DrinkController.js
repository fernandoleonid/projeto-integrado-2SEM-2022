"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const Drink_1 = __importDefault(require("../models/Drink"));
class DrinkController {
    async index(req, rep) {
        const { type } = req.query;
        if (!type) {
            return rep.code(400).send({
                code: 400,
                error: true,
                message: [
                    "Please for use this routes is necessary include the querystrings!",
                ],
            });
        }
        const typeInDb = await database_1.db.tbl_drink_type.findMany({
            where: {
                name: type,
            },
        });
        if (!typeInDb[0]) {
            return rep.code(404).send({
                code: 404,
                error: true,
                message: ["Tipo de bebida não encontrado"],
            });
        }
        const response = await Drink_1.default.filterForType(typeInDb[0].id);
        if (!response) {
            return rep.code(404).send({
                code: 404,
                error: true,
                message: ["Não temos bebidas com essa tipo!"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            payload: response,
        });
    }
}
exports.default = new DrinkController();
