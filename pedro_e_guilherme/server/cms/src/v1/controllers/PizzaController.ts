import { FastifyRequest, FastifyReply } from "fastify";

import Ingredient from "../models/Ingredient";
import Picture from "../models/Picture";
import Pizza from "../models/Pizza";
import PizzaRecheio from "../models/PizzaRecheio";
import Product from "../models/Product";
import Promocao from "../models/Promocao";

import { FirebaseService } from "../services";
import { Decimal } from "@prisma/client/runtime";
import Categoria from "../models/Categoria";

class PizzaController {
  async count(req: FastifyRequest, rep: FastifyReply) {
    const count = await Pizza.count();
    return rep.send({
      error: false,
      code: 200,
      count: count,
    });
  }

  async save(req: FastifyRequest, rep: FastifyReply) {
    const { body } = req;

    const userData = req.user.payload;

    const userId = userData.id;

    // @ts-ignore
    const {
      // @ts-ignore
      picture,
      // @ts-ignore
      stuffing,
      // @ts-ignore
      price,
      // @ts-ignore
      saleOffValue,
      // @ts-ignore
      type,
      // @ts-ignore
      ingredient,
      // @ts-ignore
      categoria,
    } = body;

    const categoriaInDb = await Categoria.getByName(categoria.value);

    if (!categoriaInDb) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: "Categoria nao encontrado! ",
      });
    }

    const ingredients: any[] = [];
    ingredient.forEach((e: { value: any }) => {
      ingredients.push(e.value);
    });

    // check ingredients
    let checkIngredients = true;
    const ingredientsObject = await Promise.all(
      ingredients.map(async (ingredient) => {
        const res = await Ingredient.getByName(ingredient);
        if (!res) {
          checkIngredients = false;
          return;
        }
        return res;
      })
    );

    if (!checkIngredients) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content Not Founded - Ingredient"],
      });
    }

    await picture.toBuffer(); // buffer of the file

    const url = await FirebaseService.uploadImage(picture);

    // saving picture link in the db
    const pictureId = await Picture.save({ id: -1, picture_link: url });

    const stuffinInDb = await PizzaRecheio.showByName(stuffing.value as string);
    const pizzaTypeId = await Pizza.getPizzaTypeByName(type.value as string);

    if (!stuffinInDb) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: "Recheio nao encontrado! ",
      });
    }

    if (!pizzaTypeId) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: "Tipo de Pizza nao encontrado! ",
      });
    }

    const name = stuffing.value + " " + type.value;

    const productId = await Product.save({
      id: -1,
      created_by: userId,
      likes: 1,
      name,
      price: price.value,
      status: true,
      category_id: categoriaInDb.id as number,
    });

    // save picture in product
    await Picture.addPictureInProduct({
      id: -1,
      picture_id: pictureId,
      product_id: productId,
    });

    // save the sale off if exists
    if (saleOffValue.value > 0) {
      await Promocao.saveSaleOffProduct({
        id: -1,
        off_value: saleOffValue.value,
        product_id: productId,
      });
    }

    // Create Pizza
    const pizza = await Pizza.save({
      id: -1,
      product_id: productId,
      pizza_type_id: pizzaTypeId,
    });

    const stuffingId = stuffinInDb.id;

    // add stuffing in pizza
    await PizzaRecheio.savePizzaWithStuffing({
      id: -1,
      pizza_id: pizza.id,
      stuffing_id: stuffingId,
    });

    //add ingredients in pizza

    ingredientsObject.forEach(async (data) => {
      await Ingredient.addIngredientInPizza({
        id: -1,
        pizza_id: pizza.id,
        ingredient_id: data?.id as number,
      });
    });

    const response = await Pizza.show(pizza.id);

    return rep.send({
      statusCode: 200,
      error: false,
      payload: [response],
    });
  }

  async index(req: FastifyRequest, rep: FastifyReply) {
    const response = await Pizza.index();

    return rep.send({
      code: 200,
      error: false,
      payload: response,
    });
  }

  async delete(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const res = await Pizza.delete(parseInt(id));

    if (!res) {
      return rep.status(404).send({
        error: true,
        code: 404,
        message: ["Content Not Founded"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Succefull Deleted"],
    });
  }

  async activate(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;
    const res = await Pizza.activate(parseInt(id));

    if (!res) {
      return rep.status(404).send({
        error: true,
        code: 404,
        message: ["Content Not Founded"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Sucefull activate!"],
    });
  }

  async show(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const pizza = await Pizza.show(parseInt(id));

    if (!pizza) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content no founded - 404"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      payload: pizza,
    });
  }

  async update(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    // @ts-ignore
    const {
      // @ts-ignore
      picture,
      // @ts-ignore
      stuffing,
      // @ts-ignore
      price,
      // @ts-ignore
      saleOffValue,
      // @ts-ignore
      type,
      // @ts-ignore
      ingredient,
      // @ts-ignore
      categoria,
    } = req.body;

    const pizzaId = req.params.id;
    const pizza = await Pizza.show(parseInt(pizzaId));

    console.log(pizza);

    if (ingredient.length > 0) {
      const ingredients: any[] = [];
      ingredient.forEach((e: { value: any }) => {
        ingredients.push(e.value);
      });

      // check ingredients
      let checkIngredients = true;
      const ingredientsObject = await Promise.all(
        ingredients.map(async (ingredient) => {
          const res = await Ingredient.getByName(ingredient);
          if (!res) {
            checkIngredients = false;
            return;
          }
          return res;
        })
      );
      if (!checkIngredients) {
        return rep.status(404).send({
          code: 404,
          error: true,
          message: ["Content Not Founded - Ingredient"],
        });
      }

      const pizza = await Pizza.show(parseInt(pizzaId));
      const relationsWithIngredient = pizza?.pizza_ingredient;

      if (relationsWithIngredient) {
        await Promise.all(
          relationsWithIngredient?.map(async (data) => {
            const id = data.id;
            await Ingredient.deleteIngredientInPizza(id);
          })
        );
      }

      await Promise.all(
        ingredientsObject.map(async (data) => {
          await Ingredient.addIngredientInPizza({
            id: -1,
            ingredient_id: data?.id as number,
            pizza_id: parseInt(pizzaId),
          });
        })
      );
    }

    if (picture) {
      await picture.toBuffer(); // buffer of the file

      const url = await FirebaseService.uploadImage(picture);

      // saving picture link in the db
      const pictureId = pizza?.product?.tbl_product_pictures[0].picture_id;

      await Picture.update({ id: pictureId as number, picture_link: url });
    }

    if (stuffing) {
      const stuffingInDb = await PizzaRecheio.showByName(
        stuffing.value as string
      );

      if (!stuffingInDb) {
        return rep.status(404).send({
          code: 404,
          error: true,
          message: "Recheio nao encontrado! ",
        });
      }

      const relationId = pizza?.pizza_stuffing[0].id;
      await PizzaRecheio.updatePizzaWithStuffing({
        id: relationId as number,
        pizza_id: parseInt(pizzaId),
        stuffing_id: stuffingInDb.id,
      });
    }
    if (type) {
      const pizzaTypeInDb = await Pizza.getPizzaTypeByName(
        type.value as string
      );

      if (!pizzaTypeInDb) {
        return rep.status(404).send({
          code: 404,
          error: true,
          message: ["Tipo de Pizza nao encontrado"],
        });
      }

      await Pizza.update({
        id: parseInt(pizzaId),
        pizza_type_id: pizzaTypeInDb,
        product_id: pizza?.product_id as number,
      });
    }

    let newName = pizza?.product?.name as string;
    let newPrice = pizza?.product?.price as Decimal;
    if (price) newPrice = price.value;

    if (type && stuffing) {
      newName = stuffing.value + " " + type.value;
    } else if (stuffing) {
      newName = (stuffing.value + " " + pizza?.pizza_type?.name) as string;
    } else {
      newName = pizza?.pizza_stuffing[0].stuffing?.name + " " + type.value;
    }

    let categoriaId = pizza?.product?.category_id;
    if (categoria) {
      const checkCategoria = await Categoria.getByName(categoria.value);

      if (!checkCategoria) {
        return rep.status(404).send({
          code: 404,
          error: true,
          message: "Categoria nao encontrado! ",
        });
      }

      categoriaId = checkCategoria.id;
    }

    await Product.update({
      id: pizza?.product_id as number,
      name: newName,
      price: newPrice,
      created_by: pizza?.product?.created_by as number,
      likes: pizza?.product?.likes as number,
      status: pizza?.product?.status as boolean,
      category_id: categoriaId as number,
    });

    if (saleOffValue) {
      if (pizza?.product?.sale_off_products[0] != undefined)
        await Promocao.update({
          id: pizza?.product?.sale_off_products[0].id as number,
          off_value: saleOffValue.value,
          product_id: pizza?.product_id as number,
        });
      else
        await Promocao.saveSaleOffProduct({
          id: -1,
          product_id: pizza?.product_id as number,
          off_value: saleOffValue.value,
        });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Atualizado com Sucesso!"],
    });
  }
}

export default new PizzaController();
