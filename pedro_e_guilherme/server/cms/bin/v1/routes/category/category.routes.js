"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_schema_1 = require("./category.schema");
const CategoriaController_1 = __importDefault(require("../../controllers/CategoriaController"));
async function categoryRoutes(server) {
    server.post("/", { onRequest: [server.authenticate], schema: category_schema_1.createCategoryOptions }, CategoriaController_1.default.save);
    server.get("/", { onRequest: [server.authenticate] }, CategoriaController_1.default.index);
    server.get("/:id", { onRequest: [server.authenticate] }, CategoriaController_1.default.show);
    server.delete("/:id", { onRequest: [server.authenticate] }, CategoriaController_1.default.delete);
    server.put("/:id", { onRequest: [server.authenticate], schema: category_schema_1.updateCategoryOptions }, CategoriaController_1.default.update);
    server.put("/activate/:id", { onRequest: [server.authenticate] }, CategoriaController_1.default.activate);
}
exports.default = categoryRoutes;
