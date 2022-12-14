"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductController_1 = __importDefault(require("../controller/ProductController"));
async function productRoutes(server) {
    server.get("/", ProductController_1.default.index);
    server.get("/promotion/", ProductController_1.default.indexInPromotions);
    server.get("/:id", ProductController_1.default.show);
    server.put("/like/:id", ProductController_1.default.likeAProduct);
    server.put("/deslike/:id", ProductController_1.default.deslikeAProduct);
}
exports.default = productRoutes;
