import { FastifyInstance } from "fastify";
import ProductTypesController from "../controller/ProductTypesController";

export default async function typesRoutes(server: FastifyInstance) {
  server.get("/pizza", ProductTypesController.indexOfPizzaTypes);
  server.get("/pizza/stuffing", ProductTypesController.indexOfPizzaStuffing);
  server.get("/drink", ProductTypesController.indexOfDrinkTypes);
}
