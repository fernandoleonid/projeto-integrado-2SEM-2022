import cors from "@fastify/cors";
import Fastify, { FastifyInstance } from "fastify";
import {
  productRoutes,
  messageRoutes,
  typesRoutes,
  categoryRoutes,
} from "./routes";
import drinkRoutes from "./routes/drinkRoutes";
import pizzaRoutes from "./routes/pizzaRoutes";

export default class Server {
  private static _instance: Server | null;

  declare server: FastifyInstance;

  private constructor() {
    this.server = Fastify({
      logger: true,
    });

    this.middlewares();
    this.routes();
  }
  private async middlewares() {
    await this.server.register(cors, { origin: true });
  }

  private routes() {
    this.server.register(productRoutes, {
      prefix: "/.netlify/functions/server/product",
    });
    this.server.register(messageRoutes, {
      prefix: "/.netlify/functions/server/message",
    });
    this.server.register(typesRoutes, {
      prefix: "/.netlify/functions/server/types",
    });
    this.server.register(categoryRoutes, {
      prefix: "/.netlify/functions/server/category",
    });

    this.server.register(pizzaRoutes, {
      prefix: "/.netlify/functions/server/pizza",
    });
    this.server.register(drinkRoutes, {
      prefix: "/.netlify/functions/server/drink",
    });
  }

  static get Instance(): Server {
    return this._instance || (this._instance = new this());
  }
}
