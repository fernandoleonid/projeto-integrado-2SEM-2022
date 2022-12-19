"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StuffingController_1 = __importDefault(require("../../controllers/StuffingController"));
const stuffing_schema_1 = require("./stuffing.schema");
async function stuffingRoutes(server) {
    server.post("/", { onRequest: [server.authenticate], schema: stuffing_schema_1.createStuffingOptions }, StuffingController_1.default.save);
    server.get("/", { onRequest: [server.authenticate] }, StuffingController_1.default.index);
    server.get("/:id", { onRequest: [server.authenticate] }, StuffingController_1.default.show);
    server.delete("/:id", { onRequest: [server.authenticate] }, StuffingController_1.default.delete);
    server.put("/activate/:id", { onRequest: [server.authenticate] }, StuffingController_1.default.activate);
    server.put("/:id", { onRequest: [server.authenticate], schema: stuffing_schema_1.updateStuffingOptions }, StuffingController_1.default.update);
}
exports.default = stuffingRoutes;
