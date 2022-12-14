import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import PizzaController from "../../controllers/PizzaController";
import { createPizzaOptions, updatePizzaOptions } from "./pizza.schema";

export default async function pizzaRoutes(server: FastifyInstance) {
  server.get(
    "/count",
    { onRequest: [server.authenticate] },
    PizzaController.count
  );
  server.get("/", { onRequest: [server.authenticate] }, PizzaController.index);
  server.get(
    "/:id",
    { onRequest: [server.authenticate] },
    PizzaController.show
  );

  server.post(
    "/",
    { onRequest: [server.authenticate], schema: createPizzaOptions },
    PizzaController.save
  );

  server.put(
    "/:id",
    { onRequest: [server.authenticate], schema: updatePizzaOptions },
    PizzaController.update
  );

  server.put(
    "/activate/:id",
    { onRequest: [server.authenticate] },
    PizzaController.activate
  );

  server.delete(
    "/:id",
    { onRequest: [server.authenticate] },
    PizzaController.delete
  );
}
