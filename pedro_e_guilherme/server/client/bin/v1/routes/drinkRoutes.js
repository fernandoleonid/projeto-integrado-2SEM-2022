"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DrinkController_1 = __importDefault(require("../controller/DrinkController"));
async function drinkRoutes(server) {
    server.get("/", DrinkController_1.default.index);
}
exports.default = drinkRoutes;
