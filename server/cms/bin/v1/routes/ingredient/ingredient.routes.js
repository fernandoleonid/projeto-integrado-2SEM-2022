"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IngredientController_1 = __importDefault(require("../../controllers/IngredientController"));
const ingredient_schema_1 = require("./ingredient.schema");
async function ingredientRoutes(server) {
    server.post("/", { onRequest: [server.authenticate], schema: ingredient_schema_1.createIngredientOptions }, IngredientController_1.default.save);
    server.get("/", { onRequest: [server.authenticate] }, IngredientController_1.default.index);
    server.get("/:id", { onRequest: [server.authenticate] }, IngredientController_1.default.show);
    server.delete("/:id", { onRequest: [server.authenticate] }, IngredientController_1.default.delete);
    server.put("/:id", { onRequest: [server.authenticate], schema: ingredient_schema_1.updateIngredientOptions }, IngredientController_1.default.update);
}
exports.default = ingredientRoutes;
