import { FastifyInstance } from "fastify";
import {
  createCategoryOptions,
  updateCategoryOptions,
} from "./category.schema";
import CategoriaController from "../../controllers/CategoriaController";

export default async function categoryRoutes(server: FastifyInstance) {
  server.post(
    "/",
    { onRequest: [server.authenticate], schema: createCategoryOptions },
    CategoriaController.save
  );

  server.get(
    "/",
    { onRequest: [server.authenticate] },
    CategoriaController.index
  );
  server.get(
    "/:id",
    { onRequest: [server.authenticate] },
    CategoriaController.show
  );

  server.delete(
    "/:id",
    { onRequest: [server.authenticate] },
    CategoriaController.delete
  );
  server.put(
    "/:id",
    { onRequest: [server.authenticate], schema: updateCategoryOptions },
    CategoriaController.update
  );
  server.put(
    "/activate/:id",
    { onRequest: [server.authenticate]},
    CategoriaController.activate
  );
}
