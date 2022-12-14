"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CountController_1 = __importDefault(require("../../controllers/CountController"));
async function countRoutes(server) {
    server.get("/products", { onRequest: [server.authenticate] }, CountController_1.default.countProduct);
    server.get("/saleoff", { onRequest: [server.authenticate] }, CountController_1.default.countPromocao);
}
exports.default = countRoutes;
