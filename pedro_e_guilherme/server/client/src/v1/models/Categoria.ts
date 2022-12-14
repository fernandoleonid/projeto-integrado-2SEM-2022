import { db } from "../config/database";

class Categoria {
  async index() {
    const response = await db.tbl_category.findMany();

    return response;
  }
}

export default new Categoria();
