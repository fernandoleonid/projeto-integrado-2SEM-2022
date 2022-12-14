"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PizzaTypesController_1 = __importDefault(require("../../../controllers/PizzaTypesController"));
const schema_pizzaTypes_1 = require("./schema.pizzaTypes");
async function pizzaTypesRoutes(server) {
    server.post("/", {
        onRequest: [server.authenticate],
        schema: schema_pizzaTypes_1.createPizzaTypeOptions,
    }, PizzaTypesController_1.default.save);
    server.get("/", { onRequest: [server.authenticate] }, PizzaTypesController_1.default.index);
    server.delete("/:id", { onRequest: [server.authenticate] }, PizzaTypesController_1.default.delete);
    server.put("/activate/:id", {
        onRequest: [server.authenticate],
    }, PizzaTypesController_1.default.activate);
    server.put("/:id", {
        onRequest: [server.authenticate],
        schema: schema_pizzaTypes_1.updatePizzaTypeOptions,
    }, PizzaTypesController_1.default.update);
}
exports.default = pizzaTypesRoutes;
