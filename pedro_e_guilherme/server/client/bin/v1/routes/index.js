"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = exports.typesRoutes = exports.messageRoutes = exports.productRoutes = void 0;
const productRoutes_1 = __importDefault(require("./productRoutes"));
exports.productRoutes = productRoutes_1.default;
const messageRoutes_1 = __importDefault(require("./messageRoutes"));
exports.messageRoutes = messageRoutes_1.default;
const typesRoutes_1 = __importDefault(require("./typesRoutes"));
exports.typesRoutes = typesRoutes_1.default;
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
exports.categoryRoutes = categoryRoutes_1.default;
