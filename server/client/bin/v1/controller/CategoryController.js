"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Categoria_1 = __importDefault(require("../models/Categoria"));
class CategoryController {
    async index(req, rep) {
        const response = await Categoria_1.default.index();
        return rep.send({
            code: 200,
            error: false,
            payload: response,
        });
    }
}
exports.default = new CategoryController();
