import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import IngredientController from "../../controllers/IngredientController";
import {
  createIngredientOptions,
  updateIngredientOptions,
} from "./ingredient.schema";

export default async function ingredientRoutes(server: FastifyInstance) {
  server.post(
    "/",
    { onRequest: [server.authenticate], schema: createIngredientOptions },
    IngredientController.save
  );

  server.get(
    "/",
    { onRequest: [server.authenticate] },
    IngredientController.index
  );
  server.get(
    "/:id",
    { onRequest: [server.authenticate] },
    IngredientController.show
  );

  server.delete(
    "/:id",
    { onRequest: [server.authenticate] },
    IngredientController.delete
  );
  server.put(
    "/:id",
    { onRequest: [server.authenticate], schema: updateIngredientOptions },
    IngredientController.update
  );
}
