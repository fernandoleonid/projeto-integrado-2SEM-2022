import { FastifyReply, FastifyRequest } from "fastify";
import Product from "../models/Product";

class PizzaController {
  async index(
    req: FastifyRequest<{
      Querystring: {
        filters: string;
        scale: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { filters, scale } = req.query;

    if (filters === "like") {
      const response = await Product.getByMostLiked();

      return response;
    }

    if (filters === "price" && scale === "desc") {
      const response = await Product.getHighPrice();
      return response;
    } else if (scale === "asc") {
      const response = await Product.getLowPrice();
      return response;
    }

    const response = await Product.index();

    return response;
  }

  async indexInPromotions(req: FastifyRequest, rep: FastifyReply) {
    const response = await Product.getProductInPromotions();

    return response;
  }

  async likeAProduct(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const response = await Product.likeAProduct(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["content not founded!"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Succefull Liked!"],
    });
  }

  async deslikeAProduct(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const response = await Product.deslikeAProduct(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["content not founded!"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Succefull Desliked!"],
    });
  }

  async show(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const response = await Product.show(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["content not founded!"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      payload: [response],
    });
  }
}

export default new PizzaController();
