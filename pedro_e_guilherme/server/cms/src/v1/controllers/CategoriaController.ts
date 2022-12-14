import { FastifyRequest, FastifyReply } from "fastify";
import Categoria from "../models/Categoria";

class CategoriaController {
  async save(
    req: FastifyRequest<{
      Body: {
        name: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { name } = req.body;

    const response = await Categoria.save({
      name,
    });

    return rep.send({
      code: 200,
      error: false,
      payload: [response],
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

    const response = await Categoria.update({
      id: parseInt(id),
      name,
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
  async delete(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const response = await Categoria.delete(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content not founded"],
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

    const response = await Categoria.activate(parseInt(id));
    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content not founded"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Activated sucefully!"],
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
    const response = await Categoria.show(parseInt(id));

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
      payload: [response],
    });
  }
  async index(req: FastifyRequest, rep: FastifyReply) {
    const response = await Categoria.index();

    return rep.send({
      code: 200,
      error: false,
      payload: response,
    });
  }
}

export default new CategoriaController();
