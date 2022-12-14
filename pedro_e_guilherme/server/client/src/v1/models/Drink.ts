import { db } from "../config/database";

class Drink {
  async filterForType(typeId: number) {
    const response = await db.tbl_drink.findMany({
      include: {
        tbl_drink_type: true,
        tbl_product: {
          include: {
            tbl_product_pictures: {
              include: {
                tbl_picture: true,
              },
            },
          },
        },
      },
      where: {
        drink_type_id: typeId,
        tbl_product: {
          status: true,
        },
      },
    });

    if (response.length === 0) return false;
    return response;
  }
}

export default new Drink();
