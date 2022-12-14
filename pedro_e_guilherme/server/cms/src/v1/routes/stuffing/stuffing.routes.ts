import { FastifyInstance } from "fastify";

import StuffingController from "../../controllers/StuffingController";

import {
  createStuffingOptions,
  updateStuffingOptions,
} from "./stuffing.schema";

export default async function stuffingRoutes(server: FastifyInstance) {
  server.post(
    "/",
    { onRequest: [server.authenticate], schema: createStuffingOptions },
    StuffingController.save
  );
  server.get(
    "/",
    { onRequest: [server.authenticate] },
    StuffingController.index
  );
  server.get(
    "/:id",
    { onRequest: [server.authenticate] },
    StuffingController.show
  );

  server.delete(
    "/:id",
    { onRequest: [server.authenticate] },
    StuffingController.delete
  );

  server.put(
    "/activate/:id",
    { onRequest: [server.authenticate] },
    StuffingController.activate
  );

  server.put(
    "/:id",
    { onRequest: [server.authenticate], schema: updateStuffingOptions },
    StuffingController.update
  );
}
