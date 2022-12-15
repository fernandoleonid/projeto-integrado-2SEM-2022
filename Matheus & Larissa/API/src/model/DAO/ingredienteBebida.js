/* eslint-disable import/extensions */
import { prisma } from '../utils/prisma-instance.js';

const insertIngredienteBebida = async (ingredienteBebida) => {
  try {
    const sql = `INSERT INTO tbl_ingrediente_bebida (
         id_ingrediente,
         id_bebida
         )
         VALUES (
             '${ingredienteBebida.id_ingrediente}',
             '${ingredienteBebida.id_bebida}'
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

const updateIngredienteBebida = async (ingredienteBebida) => {
  try {
    const sql = `UPDATE tbl_ingrediente_bebida SET
      id_ingrediente = '${ingredienteBebida.id_ingrediente}',
      id_bebida = '${ingredienteBebida.id_bebida}'
          
          WHERE id = ${ingredienteBebida.id};`;

    const result = await prisma.$queryRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const deleteIngredienteBebida = async (id) => {
  try {
    const sql = `delete from tbl_ingrediente_bebida 
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

const selectAllIngredientesBebidas = async () => {
  const sql = `SELECT CAST(tbl_ingrediente_bebida.id AS FLOAT) AS
     id,
     tbl_ingrediente_bebida.id_bebida,
     tbl_ingrediente_bebida.id_ingrediente
     FROM tbl_ingrediente_bebida
     `;

  const rsIngredienteBebida = await prisma.$queryRawUnsafe(sql);

  if (rsIngredienteBebida.length > 0) {
    return rsIngredienteBebida;
  }
  return false;
};

const selectByIdIngredienteBebida = async (id) => {
  const sql = `SELECT CAST(tbl_bebida.id AS FLOAT) AS
    id,
    tbl_ingrediente_bebida.id_bebida,
    tbl_ingrediente_bebida.id_ingrediente
    FROM tbl_ingrediente_bebida
    WHERE tbl_ingrediente_bebida.id = ${id};`;

  const rsIngredienteBebida = await prisma.$queryRawUnsafe(sql);

  if (rsIngredienteBebida.length > 0) {
    return rsIngredienteBebida[0];
  }
  return false;
};

export default {
  updateIngredienteBebida,
  deleteIngredienteBebida,
  selectAllIngredientesBebidas,
  insertIngredienteBebida,
  selectByIdIngredienteBebida,
};
