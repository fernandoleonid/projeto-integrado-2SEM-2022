import { FastifyReply, FastifyRequest } from "fastify";
import ProductTypes from "../models/ProductTypes";

class ProductTypesController {
  async indexOfPizzaTypes(_req: FastifyRequest, rep: FastifyReply) {
    const response = await ProductTypes.getPizzaTypes();

    return rep.send({
      code: 200,
      error: false,
      payload: response,
    });
  }

  async indexOfPizzaStuffing(_req: FastifyRequest, rep: FastifyReply) {
    const response = await ProductTypes.getPizzaStuffing();

    return rep.send({
      code: 200,
      error: false,
      payload: response,
    });
  }

  async indexOfDrinkTypes(_req: FastifyRequest, rep: FastifyReply) {
    const response = await ProductTypes.getDrinkTypes();

    return rep.send({
      code: 200,
      error: false,
      payload: response,
    });
  }
}

export default new ProductTypesController();
