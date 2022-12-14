import { FastifyInstance } from "fastify";
import DrinkController from "../controller/DrinkController";

export default async function drinkRoutes(server: FastifyInstance) {
  server.get("/", DrinkController.index);
}
