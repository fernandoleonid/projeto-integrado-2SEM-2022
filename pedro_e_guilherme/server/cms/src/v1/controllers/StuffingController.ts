import { FastifyRequest, FastifyReply } from "fastify";
import { execPath } from "process";
import PizzaRecheio from "../models/PizzaRecheio";

class StuffingController {
  async save(
    req: FastifyRequest<{
      Body: {
        name: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { name } = req.body;

    const response = await PizzaRecheio.save({
      id: -1,
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
    const response = await PizzaRecheio.index();

    return rep.send({
      code: 200,
      error: false,
      payload: response,
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

    const response = await PizzaRecheio.show(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content Not Founded"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      payload: [response],
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

    const response = await PizzaRecheio.delete(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content Not Founded"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Succefull Deleted!"],
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

    const response = await PizzaRecheio.activate(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content Not Founded"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Succefull Activated!"],
    });
  }
  async update(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
      Body: {
        name: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const { name } = req.body;

    const response = await PizzaRecheio.update({
      id: parseInt(id),
      name: name,
      status: true,
    });

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content not founded!"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Succefull updated!"],
    });
  }
}

export default new StuffingController();
