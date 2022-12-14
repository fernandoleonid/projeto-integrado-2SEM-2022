import { FastifyRequest, FastifyReply } from "fastify";
import Pizza from "../models/Pizza";

class PizzaTypesController {
  async save(
    req: FastifyRequest<{
      Body: {
        name: string;
        dimensions: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { name, dimensions } = req.body;

    const response = await Pizza.savePizzaTypes({
      id: -1,
      dimensions: dimensions,
      name: name,
      status: true,
    });

    return rep.send({
      code: 200,
      error: false,
      payload: [response],
    });
  }
  async index(req: FastifyRequest, rep: FastifyReply) {
    const response = await Pizza.getPizzaTypes();

    return rep.send({
      code: 200,
      error: false,
      payload: response,
    });
  }
  async delete(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const response = await Pizza.deletePizzaTypes(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        statusCode: 404,
        error: true,
        message: ["Content Not Founded!"],
      });
    }
    return rep.send({
      code: 200,
      error: false,
      message: ["Sucefull deleted!"],
    });
  }

  async activate(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const response = await Pizza.activatingPizzaTypes(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        statusCode: 404,
        error: true,
        message: ["Content Not Founded!"],
      });
    }
    return rep.send({
      code: 200,
      error: false,
      message: ["Sucefull activate!"],
    });
  }

  async update(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
      Body: {
        dimensions: string;
        name: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const { dimensions, name } = req.body;

    const response = await Pizza.updatePizzaTypes({
      id: parseInt(id),
      dimensions,
      name,
      status: true,
    });

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content no founded - 404"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Succefull updated!"],
    });
  }
}

export default new PizzaTypesController();
