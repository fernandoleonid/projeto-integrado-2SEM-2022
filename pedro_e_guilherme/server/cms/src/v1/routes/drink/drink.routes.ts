import { FastifyInstance } from "fastify";
import DrinkController from "../../controllers/DrinkController";
import { createDrinkOptions } from "./drink.schema";

export default async function drinkRoutes(server: FastifyInstance) {
  server.get(
    "/count",
    { onRequest: [server.authenticate] },
    DrinkController.count
  );

  server.get("/", { onRequest: [server.authenticate] }, DrinkController.index);
  server.post(
    "/",
    { onRequest: [server.authenticate], schema: createDrinkOptions },
    DrinkController.save
  );

  server.get(
    "/:id",
    { onRequest: [server.authenticate] },
    DrinkController.show
  );

  server.delete(
    "/:id",
    { onRequest: [server.authenticate] },
    DrinkController.delete
  );
  server.put(
    "/activate/:id",
    { onRequest: [server.authenticate] },
    DrinkController.activate
  );

  server.put(
    "/:id",
    { onRequest: [server.authenticate] },
    DrinkController.update
  );
}
