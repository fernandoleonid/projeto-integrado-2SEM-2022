/* eslint-disable import/extensions */
import { prisma } from '../utils/prisma-instance.js';

const insertIngredientePizza = async (ingredientePizza) => {
  try {
    const sql = `INSERT INTO tbl_ingrediente_pizza(
         id_ingrediente,
         id_pizza
         )
         VALUES (
             '${ingredientePizza.id_ingrediente}',
             '${ingredientePizza.id_pizza}'
             )`;
    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const updateIngredientePizza = async (ingredientePizza) => {
  try {
    const sql = `UPDATE tbl_ingrediente_pizza SET
      id_ingrediente = '${ingredientePizza.id_ingrediente}',
      id_pizza = '${ingredientePizza.id_pizza}'
          
          WHERE id = ${ingredientePizza.id};`;

    const result = await prisma.$queryRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const deleteIngredientePizza = async (id) => {
  try {
    const sql = `delete from tbl_ingrediente_pizza
         where id = '${id}'`;

    const result = await prisma.$executeRawUnsafe(sql);
    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const selectAllIngredientesPizzas = async () => {
  const sql = `SELECT CAST(tbl_ingrediente_pizza.id AS FLOAT) AS
     id,
     tbl_ingrediente_pizza.id_pizza,
     tbl_ingrediente_pizza.id_ingrediente
     FROM tbl_ingrediente_pizza
     `;

  const rsIngredientePizza = await prisma.$queryRawUnsafe(sql);

  if (rsIngredientePizza.length > 0) {
    return rsIngredientePizza;
  }
  return false;
};

const selectByIdIngredientePizza = async (id) => {
  const sql = `SELECT CAST(tbl_ingrediente_pizza.id AS FLOAT) AS
    id,
    tbl_ingrediente_pizza.id_pizza,
    tbl_ingrediente_pizza.id_ingrediente
    FROM tbl_ingrediente_pizza
    WHERE tbl_ingrediente_pizza.id = ${id};`;

  const rsIngredientePizza = await prisma.$queryRawUnsafe(sql);

  if (rsIngredientePizza.length > 0) {
    return rsIngredientePizza[0];
  }
  return false;
};

export default {
  updateIngredientePizza,
  deleteIngredientePizza,
  selectAllIngredientesPizzas,
  insertIngredientePizza,
  selectByIdIngredientePizza,
};
