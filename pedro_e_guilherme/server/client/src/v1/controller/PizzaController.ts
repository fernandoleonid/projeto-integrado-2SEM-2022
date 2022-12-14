import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../config/database";
import Pizza from "../models/Pizza";

class PizzaController {
  async index(
    req: FastifyRequest<{
      Querystring: {
        type: string;
        stuffing: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { stuffing, type } = req.query;
    console.log(stuffing, type);

    if (stuffing && type) {
      const stuffingInDb = await db.tbl_stuffing.findMany({
        where: { name: stuffing },
      });

      if (!stuffingInDb[0]) {
        return rep.code(404).send({
          code: 404,
          error: true,
          message: ["Recheio não encontrado! "],
        });
      }

      const typeInDb = await db.tbl_pizza_type.findMany({
        where: { name: type },
      });

      if (!typeInDb[0]) {
        return rep.code(404).send({
          code: 404,
          error: true,
          message: ["Tipo de não encontrado!"],
        });
      }

      const response = await Pizza.filterByTypeAndStuffing(
        typeInDb[0].id as number,
        stuffingInDb[0].id as number
      );

      if (!response) {
        return rep.code(404).send({
          code: 404,
          error: true,
          message: ["Não temos pizzas com esses filtros selecionados!"],
        });
      }

      return rep.send({
        code: 200,
        error: false,
        payload: response,
      });
    } else if (stuffing && !type) {
      const stuffingInDb = await db.tbl_stuffing.findMany({
        where: { name: stuffing },
      });

      if (!stuffingInDb[0]) {
        return rep.code(404).send({
          code: 404,
          error: true,
          message: ["Recheio não encontrado! "],
        });
      }
      const response = await Pizza.filterByStuffing(
        stuffingInDb[0].id as number
      );

      if (!response) {
        return rep.code(404).send({
          code: 404,
          error: true,
          message: ["Não temos pizzas com esses filtros selecionados!"],
        });
      }

      return rep.send({
        code: 200,
        error: false,
        payload: response,
      });
    } else if (!stuffing && type) {
      const typeInDb = await db.tbl_pizza_type.findMany({
        where: { name: type },
      });

      if (!typeInDb[0]) {
        return rep.code(404).send({
          code: 404,
          error: true,
          message: ["Tipo de não encontrado!"],
        });
      }

      const response = await Pizza.filterByType(typeInDb[0].id as number);

      if (!response) {
        return rep.code(404).send({
          code: 404,
          error: true,
          message: ["Não temos pizzas com esses filtros selecionados!"],
        });
      }

      return rep.send({
        code: 200,
        error: false,
        payload: response,
      });
    }

    return rep.code(400).send({
      code: 400,
      error: true,
      message: [
        "Please for use this routes is necessary include the querystrings!",
      ],
    });
  }
}

export default new PizzaController();
