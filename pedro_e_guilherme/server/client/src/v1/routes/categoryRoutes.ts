import { FastifyInstance } from "fastify";
import CategoryController from "../controller/CategoryController";

export default async function categoryRoutes(server: FastifyInstance) {
  server.get("/", CategoryController.index);
}
