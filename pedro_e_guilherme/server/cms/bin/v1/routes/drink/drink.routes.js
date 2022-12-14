"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DrinkController_1 = __importDefault(require("../../controllers/DrinkController"));
const drink_schema_1 = require("./drink.schema");
async function drinkRoutes(server) {
    server.get("/count", { onRequest: [server.authenticate] }, DrinkController_1.default.count);
    server.get("/", { onRequest: [server.authenticate] }, DrinkController_1.default.index);
    server.post("/", { onRequest: [server.authenticate], schema: drink_schema_1.createDrinkOptions }, DrinkController_1.default.save);
    server.get("/:id", { onRequest: [server.authenticate] }, DrinkController_1.default.show);
    server.delete("/:id", { onRequest: [server.authenticate] }, DrinkController_1.default.delete);
    server.put("/activate/:id", { onRequest: [server.authenticate] }, DrinkController_1.default.activate);
    server.put("/:id", { onRequest: [server.authenticate] }, DrinkController_1.default.update);
}
exports.default = drinkRoutes;
