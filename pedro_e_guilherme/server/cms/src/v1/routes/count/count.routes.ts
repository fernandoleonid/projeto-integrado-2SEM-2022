import { FastifyInstance } from "fastify";
import CountController from "../../controllers/CountController";

export default async function countRoutes(server: FastifyInstance) {
  server.get(
    "/products",
    { onRequest: [server.authenticate] },
    CountController.countProduct
  );
  server.get(
    "/saleoff",
    { onRequest: [server.authenticate] },
    CountController.countPromocao
  );
}
