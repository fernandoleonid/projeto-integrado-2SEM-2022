import { db } from "../configs/database";

import { pizza, pizza_type } from "@prisma/client";
import Product from "./Product";

class Pizza {
  async count() {
    const res = await db.pizza.count();
    return res;
  }
  async save(data: pizza) {
    const response = await db.pizza.create({
      data: {
        product_id: data.product_id,
        pizza_type_id: data.pizza_type_id,
      },
    });

    return response;
  }

  async update(data: pizza) {
    const response = await db.pizza.update({
      data: {
        product_id: data.product_id,
        pizza_type_id: data.pizza_type_id,
      },
      where: {
        id: data.id,
      },
    });

    return response;
  }
  async index() {
    const response = await db.pizza.findMany({
      include: {
        product: {
          include: {
            tbl_product_pictures: {
              select: {
                picture_id: true,
                picture: {
                  select: {
                    picture_link: true,
                  },
                },
              },
            },
            sale_off_products: {
              select: {
                id: true,
                off_value: true,
              },
            },
          },
        },
        pizza_ingredient: {
          select: {
            id: true,
            ingredient: true,
          },
        },
        pizza_stuffing: {
          select: {
            id: true,
            stuffing: true,
          },
        },
        pizza_type: {
          select: {
            name: true,
            dimensions: true,
          },
        },
      },

      where: {
        product: {
          status: true,
        },
      },
    });

    return response;
  }

  async show(id: number) {
    const response = await db.pizza.findUnique({
      where: {
        id,
      },
      include: {
        product: {
          include: {
            tbl_product_pictures: {
              select: {
                picture_id: true,
                picture: {
                  select: {
                    picture_link: true,
                  },
                },
              },
            },
            sale_off_products: {
              select: {
                id: true,
                off_value: true,
              },
            },
          },
        },
        pizza_ingredient: {
          select: {
            id: true,
            ingredient: true,
          },
        },
        pizza_stuffing: {
          select: {
            id: true,
            stuffing: true,
          },
        },
        pizza_type: {
          select: {
            name: true,
            dimensions: true,
          },
        },
      },
    });
    return response;
  }

  async delete(id: number) {
    const res = await db.pizza.update({
      where: { id },
      data: {
        product: {
          update: {
            status: false,
          },
        },
      },
    });

    if (!res) return false;

    return true;
  }
  async activate(id: number) {
    const res = await db.pizza.update({
      where: { id },
      data: {
        product: {
          update: {
            status: true,
          },
        },
      },
    });

    if (!res) return false;

    return true;
  }

  /*TYPES*/
  async savePizzaTypes(data: pizza_type) {
    const response = await db.pizza_type.create({
      data: {
        name: data.name,
        dimensions: data.dimensions,
        status: data.status,
      },
    });

    return response;
  }

  async getPizzaTypes() {
    const response = await db.pizza_type.findMany({
      where: {
        status: true,
      },
    });

    return response;
  }

  async getPizzaTypeByName(name: string) {
    const response = await db.pizza_type.findMany({
      where: {
        name,
      },
    });

    if (response.length <= 0) return false;

    return response[0].id;
  }

  async updatePizzaTypes(data: pizza_type) {
    const response = await db.pizza_type.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        dimensions: data.dimensions,
      },
    });

    return response;
  }

  async activatingPizzaTypes(id: number) {
    const response = await db.pizza_type.update({
      where: {
        id,
      },
      data: {
        status: true,
      },
    });

    if (!response) return false;

    const getAllPizzas = await db.pizza_type.findMany({
      where: {
        id,
      },
      include: {
        pizza: {
          include: {
            product: {
              select: {
                id: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (getAllPizzas[0].pizza.length === 0) {
      return true;
    }

    const productIds = getAllPizzas[0].pizza.map((item) => item.product_id);

    // updating the status to each product with this type
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

  async deletePizzaTypes(id: number) {
    const response = await db.pizza_type.update({
      where: {
        id,
      },
      data: {
        status: false,
      },
    });

    const getAllPizzas = await db.pizza_type.findMany({
      where: {
        id,
      },
      include: {
        pizza: {
          include: {
            product: {
              select: {
                id: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (getAllPizzas[0].pizza.length === 0) {
      return true;
    }

    const productIds = getAllPizzas[0].pizza.map((item) => item.product_id);

    // updating the status to each product with this type
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

    if (!response) return false;
    return true;
  }
}

export default new Pizza();
