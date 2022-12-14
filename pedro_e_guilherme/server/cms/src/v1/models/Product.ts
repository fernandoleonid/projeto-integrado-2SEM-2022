import { db } from "../configs/database";

import { product } from "@prisma/client";

class Product {
  async count() {
    const res = await db.user.count();
    return res;
  }
  async save(data: product): Promise<number> {
    const { id } = await db.product.create({
      data: {
        name: data.name,
        price: data.price,
        created_by: data.created_by,
        status: data.status,
        category_id: data.category_id,
        likes: 1
      },
    });
    return id;
  }

  async index(): Promise<product[]> {
    const response = await db.product.findMany();

    return response;
  }
  async show(id: number): Promise<product | null> {
    const response = await db.product.findUnique({
      where: {
        id,
      },
    });

    return response;
  }

  async update(data: product) {
    const response = await db.product.update({
      where: {
        id: data.id,
      },

      data: {
        name: data.name,
        price: data.price,
      },
    });

    return response;
  }

  async delete(id: number): Promise<boolean> {
    await db.tbl_product_pictures.deleteMany({
      where: {
        product_id: id,
      },
    });
    // delete the sale off relations
    await db.sale_off_products.deleteMany({
      where: {
        product_id: id,
      },
    });

    const response = await db.product.delete({
      where: {
        id,
      },
    });

    if (!response) return false;
    return true;
  }
}

export default new Product();
