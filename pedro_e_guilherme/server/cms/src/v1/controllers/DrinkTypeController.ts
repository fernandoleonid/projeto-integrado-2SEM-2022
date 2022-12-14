import { FastifyRequest, FastifyReply } from "fastify";
import Bebida from "../models/Bebida";

class DrinkTypeController {
  async index(req: FastifyRequest, rep: FastifyReply) {
    const response = await Bebida.getBebidaTypes();

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

    const response = await Bebida.getBebidaTypeById(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content not Founded"],
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

    const response = await Bebida.deleteBebidaTypes(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content not Founded"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Succefull Deleted"],
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

    const response = await Bebida.activateBebidaTypes(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content not Founded"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Succefull Activated!"],
    });
  }

  async save(
    req: FastifyRequest<{
      Body: {
        name: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { name } = req.body;

    const typeExist = await Bebida.getBebidaTypeByName(name);

    if (typeExist) {
      return rep.status(400).send({
        code: 400,
        error: true,
        message: ["This type of drink already exist"],
      });
    }

    const response = await Bebida.saveBebidaTypes({
      id: -1,
      name,
      status: true,
    });

    return rep.send({
      code: 200,
      error: false,
      payload: [response],
    });
  }

  async update(
    req: FastifyRequest<{
      Body: {
        name: string;
      };
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;
    const { name } = req.body;

    const typeExist = await Bebida.getBebidaTypeById(parseInt(id));

    if (!typeExist) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["This type of drink doesnt exist!, bad id value"],
      });
    }

    const typeNameExist = await Bebida.getBebidaTypeByName(name);

    if (typeNameExist) {
      return rep.status(400).send({
        code: 400,
        error: true,
        message: ["This type of drink already exist"],
      });
    }

    await Bebida.updateBebidaTypes({
      id: parseInt(id),
      name,
      status: true,
    });

    return rep.send({
      code: 200,
      error: false,
      message: ["Succefull Updated!"],
    });
  }
}

export default new DrinkTypeController();
