/* eslint-disable import/extensions */
/**
 *
 * Documentation - EN
 *
 * Objective: File responsible for handling data with the DB (insert, update, delete and select)
 * Authors: Larissa Nunes Vaz Alves de Oliveira, Matheus Alves de Oliveira
 * Version: 2.0.22
 * Creation date: 17/11/2022
 * Modification date: 07/12/2022
 *
 * ------------------------------------------------------------------------------
 *
 * Documentação - PT-br
 *
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
 * Autores: Larissa Nunes Vaz Alves de Oliveira, Matheus Alves de Oliveira
 * Versão: 2.0.22
 * Data de Criação: 17/11/2022
 * Data de Modificação: 07/12/2022
 *
 */

import { prisma } from '../utils/prisma-instance.js';

const insertIngrediente = async (ingrediente) => {
  try {
    const sql = `
    INSERT INTO tbl_ingrediente (nome)
    VALUES ('${ingrediente.nome}')`;

    const result = await prisma.$executeRawUnsafe(sql);
    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const updateIngrediente = async (ingrediente) => {
  try {
    const sql = `UPDATE tbl_ingrediente SET
        nome = '${ingrediente.nome}'
        WHERE id = ${ingrediente.id}`;

    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const deleteIngrediente = async (id) => {
  try {
    const sql = `DELETE FROM tbl_ingrediente WHERE tbl_ingrediente.id = ${id};`;

    const result = await prisma.$executeRawUnsafe(sql);
    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const selectAllIngredientes = async () => {
  const sql = `SELECT CAST(id AS FLOAT) AS 
            id, 
            nome
    FROM tbl_ingrediente ORDER BY id DESC`;

  const rsIngredientes = await prisma.$queryRawUnsafe(sql);

  if (rsIngredientes.length > 0) {
    return rsIngredientes;
  }
  return false;
};

const selectByIdIngrediente = async (id) => {
  const sql = `select cast(id as float) as 
            id, 
            nome 
        from tbl_ingrediente where id = ${id}`;

  const rsIngredientes = await prisma.$queryRawUnsafe(sql);

  if (rsIngredientes.length > 0) {
    return rsIngredientes[0];
  }
  return false;
};

export default {
  updateIngrediente,
  deleteIngrediente,
  selectAllIngredientes,
  insertIngrediente,
  selectByIdIngrediente,
};
