import { db } from "../config/database";

class ProductTypes {
  async getPizzaTypes() {
    const response = await db.tbl_pizza_type.findMany();

    return response;
  }
  async getPizzaStuffing() {
    const response = await db.tbl_stuffing.findMany();

    return response;
  }
  async getDrinkTypes() {
    const response = await db.tbl_drink_type.findMany();

    return response;
  }
}

export default new ProductTypes();
