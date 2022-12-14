import { FastifyRequest, FastifyReply } from "fastify";
import Ingredient from "../models/Ingredient";

class IngredientController {
  async save(
    req: FastifyRequest<{
      Body: {
        name: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { name } = req.body;

    const response = await Ingredient.save({
      id: -1,
      name,
    });

    return rep.send({
      code: 200,
      error: false,
      payload: [response],
    });
  }

  async index(req: FastifyRequest, rep: FastifyReply) {
    const response = await Ingredient.index();

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

    const response = await Ingredient.show(parseInt(id));

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

    const response = await Ingredient.delete(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content not Founded!"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Succefull Deleted!"],
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

    const response = await Ingredient.update({
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
}

export default new IngredientController();
