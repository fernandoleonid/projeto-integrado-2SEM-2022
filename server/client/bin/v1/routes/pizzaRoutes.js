"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PizzaController_1 = __importDefault(require("../controller/PizzaController"));
async function pizzaRoutes(server) {
    server.get("/", PizzaController_1.default.index);
}
exports.default = pizzaRoutes;
