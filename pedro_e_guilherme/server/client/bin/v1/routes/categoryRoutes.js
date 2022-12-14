"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryController_1 = __importDefault(require("../controller/CategoryController"));
async function categoryRoutes(server) {
    server.get("/", CategoryController_1.default.index);
}
exports.default = categoryRoutes;
