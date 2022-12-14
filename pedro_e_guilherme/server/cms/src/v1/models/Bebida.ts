import { drink, drink_type } from "@prisma/client";
import { db } from "../configs/database";
import Product from "./Product";

class Bebida {
  async count() {
    const res = await db.drink.count();
    return res;
  }
  async save(data: drink) {
    const response = await db.drink.create({
      data: {
        volume: data.volume,
        product_id: data.product_id,
        drink_type_id: data.drink_type_id,
      },
      select: {
        product: {
          include: {
            tbl_product_pictures: true
          }
        },
        product_id: true,
        drink_type_id: true,
        drink_type: true,
        volume: true,
        id: true,
      
      }
    });

    return response;
  }

  async index() {
    const response = await db.drink.findMany({
      select: {
        id: true,
        volume: true,
        drink_type: true,
        product: {
          include: {
            tbl_product_pictures: {
              select: {
                picture: true,
              },
            },
            sale_off_products: true,
          },
        },
      },
    });

    return response;
  }

  async show(id: number) {
    const response = await db.drink.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        volume: true,
        drink_type: true,
        product: {
          include: {
            tbl_product_pictures: {
              select: {
                picture: true,
              },
            },
            sale_off_products: true,
          },
        },
      },
    });
    return response;
  }

  async delete(id: number) {
    const response = await db.drink.update({
      where: { id },
      data: {
        product: {
          update: {
            status: false,
          },
        },
      },
    });

    if (!response) return false;
    return true;
  }
  async activate(id: number) {
    const response = await db.drink.update({
      where: { id },
      data: {
        product: {
          update: {
            status: true,
          },
        },
      },
    });

    if (!response) return false;
    return true;
  }

  async update(data: drink) {
    const response = await db.drink.update({
      data: {
        drink_type_id: data.drink_type_id,
        volume: data.volume,
      },
      where: {
        id: data.id,
      },
    });

    return response;
  }

  /*TYPES*/
  async saveBebidaTypes(data: drink_type) {
    const response = await db.drink_type.create({
      data: {
        name: data.name,
        status: data.status,
      },
    });

    return response;
  }

  async getBebidaTypes() {
    const response = await db.drink_type.findMany();

    return response;
  }

  async getBebidaTypeByName(name: string) {
    const response = await db.drink_type.findMany({
      where: {
        name,
      },
    });

    if (!response) return false;
    return response[0];
  }
  async getBebidaTypeById(id: number) {
    const response = await db.drink_type.findUnique({
      where: {
        id,
      },
    });

    if (!response) return false;
    return response;
  }
  async updateBebidaTypes(data: drink_type) {
    const response = await db.drink_type.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        status: data.status,
      },
    });

    return response;
  }

  async deleteBebidaTypes(id: number) {
    const response = await db.drink_type.update({
      where: {
        id,
      },
      data: {
        status: false,
      },
    });

    if (!response) return false;

    const allProducts = await db.drink_type.findMany({
      where: {
        id,
      },
      include: {
        drink: {
          include: {
            product: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const ids = allProducts[0].drink.map((item) => item.product_id);

    Promise.all(
      ids.map(async (id) => {
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
  async activateBebidaTypes(id: number) {
    const response = await db.drink_type.update({
      where: {
        id,
      },
      data: {
        status: true,
      },
    });

    if (!response) return false;

    const allProducts = await db.drink_type.findMany({
      where: {
        id,
      },
      include: {
        drink: {
          include: {
            product: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const ids = allProducts[0].drink.map((item) => item.product_id);

    Promise.all(
      ids.map(async (id) => {
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
}

export default new Bebida();
