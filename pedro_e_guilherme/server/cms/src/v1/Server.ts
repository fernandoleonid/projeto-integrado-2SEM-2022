import cors from "@fastify/cors";
import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import multipart from "@fastify/multipart";
import jwt from "@fastify/jwt";

import {
  userRoutes,
  pizzaRoutes,
  pizzaTypesRoutes,
  ingredientRoutes,
  drinkRoutes,
  drinkTypesRoutes,
  stuffingRoutes,
  countRoutes,
  categoryRoutes,
} from "./routes";

export default class Server {
  private static _instance: Server | null;

  declare server: FastifyInstance;

  private constructor() {
    this.server = Fastify({
      logger: true,
    });

    this.middlewares();
    this.decorators();
    this.routes();
  }
  private async middlewares() {
    this.server.register(jwt, { secret: "mysecret" });
    this.server.register(multipart, { attachFieldsToBody: true });
    await this.server.register(cors, { origin: true });
  }
  private decorators() {
    // Decorate request with a 'user' property
    this.server.decorate(
      "authenticate",
      async (req: FastifyRequest, rep: FastifyReply) => {
        try {
          await req.jwtVerify();
        } catch (error) {
          return rep.send(error);
        }
      }
    );
  }

  private routes() {
    this.server.register(userRoutes, {
      prefix: "/.netlify/functions/server/user",
    });
    this.server.register(pizzaRoutes, {
      prefix: "/.netlify/functions/server/pizza",
    });
    this.server.register(pizzaTypesRoutes, {
      prefix: "/.netlify/functions/server/pizza/types",
    });
    this.server.register(stuffingRoutes, {
      prefix: "/.netlify/functions/server/stuffing",
    });
    this.server.register(ingredientRoutes, {
      prefix: "/.netlify/functions/server/ingredient",
    });
    this.server.register(drinkRoutes, {
      prefix: "/.netlify/functions/server/drink",
    });
    this.server.register(drinkTypesRoutes, {
      prefix: "/.netlify/functions/server/drink/types",
    });
    this.server.register(countRoutes, {
      prefix: "/.netlify/functions/server/counter",
    });
    this.server.register(categoryRoutes, {
      prefix: "/.netlify/functions/server/category",
    });
  }

  static get Instance(): Server {
    return this._instance || (this._instance = new this());
  }
}
