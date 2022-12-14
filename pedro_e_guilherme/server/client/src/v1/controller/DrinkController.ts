import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../config/database";
import Drink from "../models/Drink";

class DrinkController {
  async index(
    req: FastifyRequest<{
      Querystring: {
        type: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { type } = req.query;
    if (!type) {
      return rep.code(400).send({
        code: 400,
        error: true,
        message: [
          "Please for use this routes is necessary include the querystrings!",
        ],
      });
    }

    const typeInDb = await db.tbl_drink_type.findMany({
      where: {
        name: type,
      },
    });

    if (!typeInDb[0]) {
      return rep.code(404).send({
        code: 404,
        error: true,
        message: ["Tipo de bebida não encontrado"],
      });
    }

    const response = await Drink.filterForType(typeInDb[0].id);

    if (!response) {
      return rep.code(404).send({
        code: 404,
        error: true,
        message: ["Não temos bebidas com essa tipo!"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      payload: response,
    });
  }
}

export default new DrinkController();
