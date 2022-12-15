/* eslint-disable import/extensions */
/**
 *
 * Documentation - EN
 *
 * Objective: File responsible for handling data with the DB (insert, update, delete and select)
 * Authors: Larissa Nunes Vaz Alves de Oliveira, Matheus Alves de Oliveira
 * Version: 2.0.22
 * Creation date: 17/11/2022
 * Modification date: 07/12/2022s
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

const insertPizza = async (pizza) => {
  try {
    const sql = `INSERT INTO tbl_pizza (
         nome,
         imagem,
         tamanho, 
         preco, 
         desconto,
         quantidade_vezes_favorito, 
         id_tipo_pizza
         )
         VALUES (
             '${pizza.nome}',
             '${pizza.imagem}',
             '${pizza.tamanho}',
             '${pizza.preco}',
             ${pizza.desconto},
             ${pizza.quantidade_vezes_favorito},
             '${pizza.id_tipo_pizza}'
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

const updatePizza = async (pizza) => {
  try {
    const sql = `UPDATE tbl_pizza SET
             nome = '${pizza.nome}',
             imagem = '${pizza.imagem}',
             tamanho = '${pizza.tamanho}', 
             preco = '${pizza.preco}',
             quantidade_vezes_favorito = ${pizza.quantidade_vezes_favorito}, 
             desconto = ${pizza.desconto}
          
          WHERE id = ${pizza.id};`;

    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const deletePizza = async (id) => {
  try {
    const sql = `DELETE FROM tbl_pizza 
        WHERE id = ${id}`;

    const result = await prisma.$executeRawUnsafe(sql);
    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const selectAllPizzas = async () => {
  const sql = `SELECT CAST(tbl_pizza.id AS FLOAT) AS
     id,
     tbl_pizza.nome,
     tbl_pizza.imagem,
     tbl_pizza.tamanho,
     tbl_pizza.preco,
     tbl_pizza.desconto,
     tbl_pizza.quantidade_vezes_favorito,
     tbl_tipo_pizza.id AS id_tipo_pizza,
     tbl_tipo_pizza.tipo AS tipo_pizza
     FROM tbl_pizza
      INNER JOIN tbl_tipo_pizza
        ON tbl_tipo_pizza.id = tbl_pizza.id_tipo_pizza
      ORDER BY tbl_pizza.id DESC;`;

  const rsPizzas = await prisma.$queryRawUnsafe(sql);

  if (rsPizzas.length > 0) {
    return rsPizzas;
  }
  return false;
};

const selectByIdPizza = async (id) => {
  const sql = `SELECT CAST(tbl_pizza.id AS FLOAT) AS
     id,
     tbl_pizza.nome,
     tbl_pizza.imagem,
     tbl_pizza.tamanho,
     tbl_pizza.preco,
     tbl_pizza.desconto,
     tbl_pizza.quantidade_vezes_favorito,
     tbl_tipo_pizza.id AS id_tipo_pizza,
     tbl_tipo_pizza.tipo AS tipo_pizza
     FROM tbl_pizza
     INNER JOIN tbl_tipo_pizza
     ON tbl_tipo_pizza.id = tbl_pizza.id_tipo_pizza
     WHERE tbl_pizza.id = ${id};`;

  const rsPizzas = await prisma.$queryRawUnsafe(sql);

  if (rsPizzas.length > 0) {
    return rsPizzas[0];
  }
  return false;
};

export default {
  updatePizza,
  deletePizza,
  selectAllPizzas,
  insertPizza,
  selectByIdPizza,
};
