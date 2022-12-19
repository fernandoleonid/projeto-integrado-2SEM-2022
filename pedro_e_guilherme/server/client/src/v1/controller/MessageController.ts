import { FastifyReply, FastifyRequest } from "fastify";
import Message from "../models/Message";

class MessageController {
  async save(
    req: FastifyRequest<{
      Body: {
        name: string;
        email: string;
        phone: string;
        cellphone: string;
        critica: boolean;
        content: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { name, email, phone, cellphone, critica, content } = req.body;

    const data = { name, email, phone, cellphone, critica, content, id: -1 };

    const response = await Message.save(data);

    return rep.send({
      code: 200,
      payload: [response],
      error: false,
    });
  }
}

export default new MessageController();
