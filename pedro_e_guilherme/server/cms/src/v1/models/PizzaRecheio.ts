import { db } from "../configs/database";
import { pizza_stuffing, stuffing } from "@prisma/client";

class PizzaRecheio {
  /*STUFFINGS*/
  async save(data: stuffing) {
    const response = await db.stuffing.create({
      data: {
        name: data.name,
        status: data.status,
      },
    });

    return response;
  }
  async show(id: number) {
    const response = await db.stuffing.findUnique({
      where: {
        id,
      },
    });

    if (!response) return false;
    return response;
  }

  async showByName(name: string) {
    const response = await db.stuffing.findMany({
      where: {
        name,
      },
    });

    if (response.length <= 0) return false;
    return response[0];
  }

  async index() {
    const response = await db.stuffing.findMany();

    return response;
  }

  async update(data: stuffing) {
    const response = await db.stuffing.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    });

    return response;
  }

  async delete(id: number) {
    const response = await db.stuffing.update({
      where: {
        id,
      },
      data: {
        status: false,
      },
    });

    if (!response) return false;

    const getAllPizzas = await db.stuffing.findMany({
      where: {
        id,
      },
      include: {
        pizza_stuffing: {
          include: {
            pizza: {
              include: {
                product: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const productIds = getAllPizzas[0].pizza_stuffing.map((item) => {
      return item.pizza?.product_id;
    });

    // updating the status to each product
    await Promise.all(
      productIds.map(async (id) => {
        await db.product.update({
          where: {
            id: id as number,
          },
          data: {
            status: false,
          },
        });
      })
    );

    return true;
  }

  async activate(id: number) {
    const response = await db.stuffing.update({
      where: {
        id,
      },
      data: {
        status: true,
      },
    });

    if (!response) return false;

    const getAllPizzas = await db.stuffing.findMany({
      where: {
        id,
      },
      include: {
        pizza_stuffing: {
          include: {
            pizza: {
              include: {
                product: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const productIds = getAllPizzas[0].pizza_stuffing.map((item) => {
      return item.pizza?.product_id;
    });

    // updating the status to each product
    await Promise.all(
      productIds.map(async (id) => {
        await db.product.update({
          where: {
            id: id as number,
          },
          data: {
            status: true,
          },
        });
      })
    );

    return true;
  }

  async savePizzaWithStuffing(data: pizza_stuffing) {
    const response = await db.pizza_stuffing.create({
      data: {
        pizza_id: data.pizza_id,
        stuffing_id: data.stuffing_id,
      },
    });

    return response;
  }
  async updatePizzaWithStuffing(data: pizza_stuffing) {
    const response = await db.pizza_stuffing.update({
      data: {
        stuffing_id: data.stuffing_id,
      },
      where: {
        id: data.id,
      },
    });

    return response;
  }
}

export default new PizzaRecheio();
