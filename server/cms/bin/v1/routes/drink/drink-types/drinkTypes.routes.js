"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DrinkTypeController_1 = __importDefault(require("../../../controllers/DrinkTypeController"));
const drinkType_schema_1 = require("./drinkType.schema");
async function drinkTypesRoutes(server) {
    server.get("/", { onRequest: [server.authenticate] }, DrinkTypeController_1.default.index);
    server.get("/:id", { onRequest: [server.authenticate] }, DrinkTypeController_1.default.show);
    server.delete("/:id", { onRequest: [server.authenticate] }, DrinkTypeController_1.default.delete);
    server.put("/activate/:id", { onRequest: [server.authenticate] }, DrinkTypeController_1.default.activate);
    server.post("/", { onRequest: [server.authenticate], schema: drinkType_schema_1.createDrinkTypeOptions }, DrinkTypeController_1.default.save);
    server.put("/:id", { onRequest: [server.authenticate] }, DrinkTypeController_1.default.update);
}
exports.default = drinkTypesRoutes;
