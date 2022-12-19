import { FastifyInstance } from "fastify";
import PizzaController from "../controller/PizzaController";

export default async function pizzaRoutes(server: FastifyInstance) {
  server.get("/", PizzaController.index);
}
