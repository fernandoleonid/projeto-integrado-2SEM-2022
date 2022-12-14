import { sale_off_products } from "@prisma/client";
import { db } from "../configs/database";
class Promocao {
  async count() {
    const res = await db.sale_off_products.count();
    return res;
  }
  async index() {
    const response = await db.sale_off_products.findMany();

    return response;
  }

  async save(data: sale_off_products) {
    const response = await db.sale_off_products.create({
      data: {
        product_id: data.product_id,
        off_value: data.off_value,
      },
    });

    return response;
  }

  async update(data: sale_off_products) {
    const response = await db.sale_off_products.update({
      where: {
        id: data.id,
      },
      data: {
        off_value: data.off_value,
      },
    });

    return response;
  }

  async delete(id: number) {
    const response = await db.sale_off_products.delete({
      where: {
        id,
      },
    });

    if (!response) return false;
    return true;
  }

  async saveSaleOffProduct(data: sale_off_products) {
    const response = await db.sale_off_products.create({
      data: {
        product_id: data.product_id,
        off_value: data.off_value,
      },
    });

    return response;
  }

  async getSaleOffPizzas() {
    const response = await db.sale_off_products.findMany({
      include: {
        product: {
          select: {
            pizza: true,
          },
        },
      },
    });

    const promotions = response.filter((item) => {
      if ((item.product?.pizza.length as number) > 0) return true;
      return false;
    });

    return promotions;
  }

  async getSaleOfDrinks() {
    const response = await db.sale_off_products.findMany({
      include: {
        product: {
          select: {
            drink: true,
          },
        },
      },
    });

    const promotions = response.filter((item) => {
      if ((item.product?.drink.length as number) > 0) return true;
      return false;
    });

    return promotions;
  }
}

export default new Promocao();
