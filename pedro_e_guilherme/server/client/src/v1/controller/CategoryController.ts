import { FastifyRequest, FastifyReply } from "fastify";
import Categoria from "../models/Categoria";

class CategoryController {
  async index(req: FastifyRequest, rep: FastifyReply) {
    const response = await Categoria.index();

    return rep.send({
      code: 200,
      error: false,
      payload: response,
    });
  }
}

export default new CategoryController();
