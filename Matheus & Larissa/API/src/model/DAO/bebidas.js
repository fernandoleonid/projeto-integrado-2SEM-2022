/* eslint-disable import/extensions */
import { prisma } from '../utils/prisma-instance.js';

const insertBebida = async (bebida) => {
  try {
    const sql = `INSERT INTO tbl_bebida (
         nome,
         imagem,
         tamanho, 
         preco, 
         desconto, 
         id_tipo_bebida
         )
         VALUES (
             '${bebida.nome}',
             '${bebida.imagem}',
             '${bebida.tamanho}',
             '${bebida.preco}',
             ${bebida.desconto},
             '${bebida.id_tipo_bebida}'
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

const updateBebida = async (bebida) => {
  try {
    const sql = `UPDATE tbl_bebida SET
             nome = '${bebida.nome}',
             imagem = '${bebida.imagem}',
             tamanho = '${bebida.tamanho}', 
             preco = '${bebida.preco}',
             desconto = ${bebida.desconto}
          
          WHERE id = ${bebida.id};`;

    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const deleteBebida = async (id) => {
  try {
    const sql = `delete from tbl_bebida 
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

const selectAllBebidas = async () => {
  const sql = `SELECT CAST(tbl_bebida.id AS FLOAT) AS
     id,
     tbl_bebida.nome,
     tbl_bebida.imagem,
     tbl_bebida.tamanho,
     tbl_bebida.preco,
     tbl_bebida.desconto,
     tbl_tipo_bebida.id AS id_tipo_bebida,
     tbl_tipo_bebida.tipo AS tipo_bebida
     FROM tbl_bebida
     INNER JOIN tbl_tipo_bebida
     ON tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida
     ORDER BY id DESC;`;

  const rsBebidas = await prisma.$queryRawUnsafe(sql);

  if (rsBebidas.length > 0) {
    return rsBebidas;
  }
  return false;
};

const selectByIdBebida = async (id) => {
  const sql = `SELECT CAST(tbl_bebida.id AS FLOAT) AS
     id,
     tbl_bebida.nome,
     tbl_bebida.imagem,
     tbl_bebida.tamanho,
     tbl_bebida.preco,
     tbl_bebida.desconto,
     tbl_tipo_bebida.id AS id_tipo_bebida,
     tbl_tipo_bebida.tipo AS tipo_bebida
     FROM tbl_bebida
     INNER JOIN tbl_tipo_bebida
     ON tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida
     WHERE tbl_bebida.id = ${id};`;

  const rsBebidas = await prisma.$queryRawUnsafe(sql);

  if (rsBebidas.length > 0) {
    return rsBebidas[0];
  }
  return false;
};

export default {
  updateBebida,
  deleteBebida,
  selectAllBebidas,
  insertBebida,
  selectByIdBebida,
};
