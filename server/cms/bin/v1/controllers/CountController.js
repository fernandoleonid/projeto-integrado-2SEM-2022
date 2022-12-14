"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
const Promocao_1 = __importDefault(require("../models/Promocao"));
class CountController {
    async countPromocao(req, rep) {
        const count = await Promocao_1.default.count();
        return rep.send({
            error: false,
            code: 200,
            count: count,
        });
    }
    async countProduct(req, rep) {
        const count = await Product_1.default.count();
        return rep.send({
            error: false,
            code: 200,
            count: count,
        });
    }
}
exports.default = new CountController();
