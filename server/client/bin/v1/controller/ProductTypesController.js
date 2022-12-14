"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductTypes_1 = __importDefault(require("../models/ProductTypes"));
class ProductTypesController {
    async indexOfPizzaTypes(_req, rep) {
        const response = await ProductTypes_1.default.getPizzaTypes();
        return rep.send({
            code: 200,
            error: false,
            payload: response,
        });
    }
    async indexOfPizzaStuffing(_req, rep) {
        const response = await ProductTypes_1.default.getPizzaStuffing();
        return rep.send({
            code: 200,
            error: false,
            payload: response,
        });
    }
    async indexOfDrinkTypes(_req, rep) {
        const response = await ProductTypes_1.default.getDrinkTypes();
        return rep.send({
            code: 200,
            error: false,
            payload: response,
        });
    }
}
exports.default = new ProductTypesController();
