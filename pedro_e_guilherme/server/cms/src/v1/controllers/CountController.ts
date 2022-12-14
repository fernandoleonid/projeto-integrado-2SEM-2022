import { FastifyRequest, FastifyReply } from "fastify"
import Product from "../models/Product";
import Promocao from "../models/Promocao";

class CountController {
  async countPromocao(req: FastifyRequest, rep: FastifyReply) {
    const count = await Promocao.count();
    return rep.send({
      error: false,
      code: 200,
      count: count,
    });
  }

  async countProduct(req: FastifyRequest, rep: FastifyReply) {
    const count = await Product.count();
    return rep.send({
      error: false,
      code: 200,
      count: count,
    });
  }
}

export default new CountController();
