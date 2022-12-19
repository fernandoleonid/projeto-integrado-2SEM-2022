import { FastifyInstance } from "fastify";
import DrinkTypeController from "../../../controllers/DrinkTypeController";
import { createDrinkTypeOptions } from "./drinkType.schema";

export default async function drinkTypesRoutes(server: FastifyInstance) {
  server.get(
    "/",
    { onRequest: [server.authenticate] },
    DrinkTypeController.index
  );

  server.get(
    "/:id",
    { onRequest: [server.authenticate] },
    DrinkTypeController.show
  );

  server.delete(
    "/:id",
    { onRequest: [server.authenticate] },
    DrinkTypeController.delete
  );

  server.put(
    "/activate/:id",
    { onRequest: [server.authenticate] },
    DrinkTypeController.activate
  );

  server.post(
    "/",
    { onRequest: [server.authenticate], schema: createDrinkTypeOptions },
    DrinkTypeController.save
  );
  server.put(
    "/:id",
    { onRequest: [server.authenticate] },
    DrinkTypeController.update
  );
}
