"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductTypesController_1 = __importDefault(require("../controller/ProductTypesController"));
async function typesRoutes(server) {
    server.get("/pizza", ProductTypesController_1.default.indexOfPizzaTypes);
    server.get("/pizza/stuffing", ProductTypesController_1.default.indexOfPizzaStuffing);
    server.get("/drink", ProductTypesController_1.default.indexOfDrinkTypes);
}
exports.default = typesRoutes;
