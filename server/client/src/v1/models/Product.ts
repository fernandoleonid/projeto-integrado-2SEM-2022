import { db } from "../config/database";

class Product {
  async show(id: number) {
    try {
      const response = await db.tbl_product.findUnique({
        where: {
          id,
        },
      });
      return response;
    } catch (error) {
      return false;
    }
  }
  async likeAProduct(id: number) {
    try {
      await db.tbl_product.update({
        data: {
          likes: { increment: 1 },
        },
        where: {
          id,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }
  async deslikeAProduct(id: number) {
    try {
      await db.tbl_product.update({
        data: {
          likes: { decrement: 1 },
        },
        where: {
          id,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }
  async getByMostLiked() {
    const response = await db.tbl_product.findMany({
      include: {
        tbl_drink: {
          include: {
            tbl_drink_type: true,
          },
        },
        tbl_pizza: {
          include: {
            tbl_pizza_ingredient: true,
            tbl_pizza_stuffing: true,
            tbl_pizza_type: true,
          },
        },
      },
      orderBy: {
        likes: "desc",
      },
      where: {
        status: true,
      },
    });

    const sanitzedResponse: unknown[] = [];
    type itemMirror = { tbl_drink?: object; tbl_pizza?: object };

    response.forEach((item) => {
      if (item.tbl_drink.length <= 0) {
        const newItem: itemMirror = item;
        delete newItem.tbl_drink;
        sanitzedResponse.push(newItem);
      } else {
        const newItem: itemMirror = item;
        delete newItem.tbl_pizza;
        sanitzedResponse.push(newItem);
      }
    });

    return sanitzedResponse;
  }
  async index() {
    const response = await db.tbl_product.findMany({
      include: {
        tbl_drink: {
          include: {
            tbl_drink_type: true,
          },
        },
        tbl_pizza: {
          include: {
            tbl_pizza_ingredient: {
              include: {
                tbl_ingredient: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            tbl_pizza_stuffing: true,
            tbl_pizza_type: true,
          },
        },

        tbl_product_pictures: {
          include: {
            tbl_picture: true,
          },
        },
      },
      where: {
        status: true,
      },
    });

    const sanitzedResponse: unknown[] = [];
    type itemMirror = { tbl_drink?: object; tbl_pizza?: object };

    response.forEach((item) => {
      if (item.tbl_drink.length <= 0) {
        const newItem: itemMirror = item;
        delete newItem.tbl_drink;
        sanitzedResponse.push(newItem);
      } else {
        const newItem: itemMirror = item;
        delete newItem.tbl_pizza;
        sanitzedResponse.push(newItem);
      }
    });

    return sanitzedResponse;
  }

  async getProductInPromotions() {
    const response = await db.tbl_sale_off_products.findMany({
      include: {
        tbl_product: {
          include: {
            tbl_drink: {
              include: {
                tbl_drink_type: true,
              },
            },
            tbl_pizza: {
              include: {
                tbl_pizza_ingredient: {
                  include: {
                    tbl_ingredient: true,
                  },
                },
                tbl_pizza_stuffing: true,
                tbl_pizza_type: true,
              },
            },
            tbl_product_pictures: {
              include: {
                tbl_picture: true,
              },
            },
          },
        },
      },
      where: {
        tbl_product: {
          status: true,
        },
      },
    });

    const sanitzedResponse: unknown[] = [];

    response.forEach((item) => {
      if ((item.tbl_product?.tbl_drink.length as number) <= 0) {
        const newItem = item as any;
        delete newItem.tbl_product.tbl_drink;
        sanitzedResponse.push(newItem);
      } else {
        const newItem = item as any;
        delete newItem.tbl_product.tbl_pizza;
        sanitzedResponse.push(newItem);
      }
    });

    return response;
  }

  async getLowPrice() {
    const response = await db.tbl_product.findMany({
      include: {
        tbl_drink: {
          include: {
            tbl_drink_type: true,
          },
        },
        tbl_pizza: {
          include: {
            tbl_pizza_ingredient: true,
            tbl_pizza_stuffing: true,
            tbl_pizza_type: true,
          },
        },
      },
      where: {
        status: true,
      },
      orderBy: {
        price: "asc",
      },
    });

    const sanitzedResponse: unknown[] = [];
    type itemMirror = { tbl_drink?: object; tbl_pizza?: object };

    response.forEach((item) => {
      if (item.tbl_drink.length <= 0) {
        const newItem: itemMirror = item;
        delete newItem.tbl_drink;
        sanitzedResponse.push(newItem);
      } else {
        const newItem: itemMirror = item;
        delete newItem.tbl_pizza;
        sanitzedResponse.push(newItem);
      }
    });

    return sanitzedResponse;
  }

  async getHighPrice() {
    const response = await db.tbl_product.findMany({
      include: {
        tbl_drink: {
          include: {
            tbl_drink_type: true,
          },
        },
        tbl_pizza: {
          include: {
            tbl_pizza_ingredient: true,
            tbl_pizza_stuffing: true,
            tbl_pizza_type: true,
          },
        },
      },
      where: {
        status: true,
      },
      orderBy: {
        price: "desc",
      },
    });

    const sanitzedResponse: unknown[] = [];
    type itemMirror = { tbl_drink?: object; tbl_pizza?: object };

    response.forEach((item) => {
      if (item.tbl_drink.length <= 0) {
        const newItem: itemMirror = item;
        delete newItem.tbl_drink;
        sanitzedResponse.push(newItem);
      } else {
        const newItem: itemMirror = item;
        delete newItem.tbl_pizza;
        sanitzedResponse.push(newItem);
      }
    });

    return sanitzedResponse;
  }
}

export default new Product();
