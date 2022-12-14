"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PizzaController_1 = __importDefault(require("../../controllers/PizzaController"));
const pizza_schema_1 = require("./pizza.schema");
async function pizzaRoutes(server) {
    server.get("/count", { onRequest: [server.authenticate] }, PizzaController_1.default.count);
    server.get("/", { onRequest: [server.authenticate] }, PizzaController_1.default.index);
    server.get("/:id", { onRequest: [server.authenticate] }, PizzaController_1.default.show);
    server.post("/", { onRequest: [server.authenticate], schema: pizza_schema_1.createPizzaOptions }, PizzaController_1.default.save);
    server.put("/:id", { onRequest: [server.authenticate], schema: pizza_schema_1.updatePizzaOptions }, PizzaController_1.default.update);
    server.put("/activate/:id", { onRequest: [server.authenticate] }, PizzaController_1.default.activate);
    server.delete("/:id", { onRequest: [server.authenticate] }, PizzaController_1.default.delete);
}
exports.default = pizzaRoutes;
