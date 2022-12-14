import { FastifyInstance } from "fastify";
import ProductController from "../controller/ProductController";

export default async function productRoutes(server: FastifyInstance) {
  server.get("/", ProductController.index);
  server.get("/promotion/", ProductController.indexInPromotions);
  server.get("/:id", ProductController.show);

  server.put("/like/:id", ProductController.likeAProduct);
  server.put("/deslike/:id", ProductController.deslikeAProduct);
}
