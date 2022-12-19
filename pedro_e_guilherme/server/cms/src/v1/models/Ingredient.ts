import { pizza_ingredient, tbl_ingredient } from "@prisma/client";
import { db } from "../configs/database";

class Ingredient {
  async index() {
    const response = await db.tbl_ingredient.findMany();

    return response;
  }
  async save(data: tbl_ingredient) {
    const response = await db.tbl_ingredient.create({
      data: {
        name: data.name,
      },
    });

    return response;
  }

  async show(id: number) {
    const response = await db.tbl_ingredient.findUnique({
      where: {
        id,
      },
    });

    return response;
  }

  async update(data: tbl_ingredient) {
    try {
      const response = await db.tbl_ingredient.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
        },
      });

      return response;
    } catch (error) {
      return false;
    }
  }

  async delete(id: number) {
    await db.pizza_ingredient.deleteMany({
      where: {
        ingredient_id: id,
      },
    });

    const response = await db.tbl_ingredient.delete({
      where: {
        id,
      },
    });

    return response;
  }

  async getByName(name: string) {
    const response = await db.tbl_ingredient.findMany({
      where: {
        name: name,
      },
    });

    if (response.length <= 0) return false;
    return response[0];
  }

  async addIngredientInPizza(data: pizza_ingredient) {
    const response = await db.pizza_ingredient.create({
      data: {
        ingredient_id: data.ingredient_id,
        pizza_id: data.pizza_id,
      },
    });

    return response;
  }

  async deleteIngredientInPizza(id: number) {
    const response = await db.pizza_ingredient.delete({
      where: {
        id,
      },
    });

    return response;
  }
}

export default new Ingredient();
