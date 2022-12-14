import { FastifyInstance } from "fastify";
import MessageController from "../controller/MessageController";

const Message = {
  type: "object",
  required: ["name", "email", "phone", "cellphone", "content", "critica"],
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    cellphone: { type: "string" },
    content: { type: "string" },
    critica: { type: "boolean" },
  },
};

const createMessageOptions = {
  type: "object",
  body: {
    Message,
  },

  reponse: {
    200: {
      type: "object",
      properties: {
        statusCode: {
          type: "number",
        },
        payload: {
          type: "array",
          items: {
            Message,
          },
        },
        error: {
          type: "boolean",
        },
      },
    },
  },
};

export default async function messageRoutes(server: FastifyInstance) {
  server.post("/", { schema: createMessageOptions }, MessageController.save);
}
