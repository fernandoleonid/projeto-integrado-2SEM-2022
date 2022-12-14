"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = require("./routes");
const drinkRoutes_1 = __importDefault(require("./routes/drinkRoutes"));
const pizzaRoutes_1 = __importDefault(require("./routes/pizzaRoutes"));
class Server {
    static _instance;
    constructor() {
        this.server = (0, fastify_1.default)({
            logger: true,
        });
        this.middlewares();
        this.routes();
    }
    async middlewares() {
        await this.server.register(cors_1.default, { origin: true });
    }
    routes() {
        this.server.register(routes_1.productRoutes, {
            prefix: "/.netlify/functions/server/product",
        });
        this.server.register(routes_1.messageRoutes, {
            prefix: "/.netlify/functions/server/message",
        });
        this.server.register(routes_1.typesRoutes, {
            prefix: "/.netlify/functions/server/types",
        });
        this.server.register(routes_1.categoryRoutes, {
            prefix: "/.netlify/functions/server/category",
        });
        this.server.register(pizzaRoutes_1.default, {
            prefix: "/.netlify/functions/server/pizza",
        });
        this.server.register(drinkRoutes_1.default, {
            prefix: "/.netlify/functions/server/drink",
        });
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
}
exports.default = Server;
