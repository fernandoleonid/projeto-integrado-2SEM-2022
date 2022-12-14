import { picture, tbl_product_pictures } from "@prisma/client";
import { db } from "../configs/database";

class Picture {
  async count() {
    const res = await db.picture.count();

    return res;
  }
  async index() {
    const response = await db.picture.findMany({
      include: {
        tbl_product_pictures: true,
      },
    });

    return response;
  }
  async show(id: number) {
    const response = await db.picture.findUnique({
      where: {
        id,
      },
      include: {
        tbl_product_pictures: true,
      },
    });

    return response;
  }
  async save(data: picture) {
    const response = await db.picture.create({
      data: {
        picture_link: data.picture_link,
      },
    });

    return response.id;
  }
  async update(data: picture) {
    const response = await db.picture.update({
      where: {
        id: data.id,
      },
      data: {
        picture_link: data.picture_link,
      },
    });

    return response;
  }
  async delete(id: number) {
    const response = await db.picture.delete({
      where: {
        id,
      },
    });

    if (!response) return false;
    return true;
  }
  async addPictureInProduct(data: tbl_product_pictures) {
    const response = await db.tbl_product_pictures.create({
      data: {
        picture_id: data.picture_id,
        product_id: data.product_id,
      },
    });

    return response;
  }
}

export default new Picture();
