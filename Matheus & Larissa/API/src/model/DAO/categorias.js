import { prisma } from '../utils/prisma-instance.js';

// ########################### TIPO PRODUTO ###########################

const insertTipoProduto = async (tipoProduto) => {
  try {
    const sql = `INSERT INTO tbl_tipo_produto (
          tipo
          )
          VALUES (
              '${tipoProduto.tipo}'
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

const updateTipoProduto = async (tipoProduto) => {
  try {
    const sql = `UPDATE tbl_tipo_produto SET
                tipo = '${tipoProduto.tipo}'
             
             WHERE id = ${tipoProduto.id};`;

    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const deleteTipoProduto = async (id) => {
  try {
    const sql = `delete from tbl_tipo_produto 
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

const selectAllTiposProdutos = async () => {
  const sql = `select cast(id as float) as 
        id,
        tipo
      from tbl_tipo_produto order by id desc`;

  const rsTipoProdutos = await prisma.$queryRawUnsafe(sql);

  if (rsTipoProdutos.length > 0) {
    return rsTipoProdutos;
  }
  return false;
};

const selectByIdTipoProduto = async (id) => {
  const sql = `select cast(id as float) as
        id,
        tipo
      from tbl_tipo_produto where id = ${id}`;

  const rsTipoProduto = await prisma.$queryRawUnsafe(sql);

  if (rsTipoProduto.length > 0) {
    return rsTipoProduto[0];
  }
  return false;
};

// ########################### TIPO PIZZA ###########################

const insertTipoPizza = async (tipoPizza) => {
  try {
    const sql = `INSERT INTO tbl_tipo_pizza (
          tipo
          )
          VALUES (
              '${tipoPizza.tipo}'
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

const updateTipoPizza = async (tipoPizza) => {
  try {
    const sql = `UPDATE tbl_tipo_pizza SET
                tipo = '${tipoPizza.tipo}'
             
             WHERE id = ${tipoPizza.id};`;

    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const deleteTipoPizza = async (id) => {
  try {
    const sql = `delete from tbl_tipo_pizza 
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

const selectAllTiposPizzas = async () => {
  const sql = `select cast(id as float) as 
        id,
        tipo
      from tbl_tipo_pizza order by id desc`;

  const rsTipoPizzas = await prisma.$queryRawUnsafe(sql);

  if (rsTipoPizzas.length > 0) {
    return rsTipoPizzas;
  }
  return false;
};

const selectByIdTipoPizza = async (id) => {
  const sql = `select cast(id as float) as 
        id,
        tipo
      from tbl_tipo_pizza where id = ${id}`;

  const rsTipoPizza = await prisma.$queryRawUnsafe(sql);

  if (rsTipoPizza.length > 0) {
    return rsTipoPizza[0];
  }
  return false;
};

// ########################### TIPO BEBIDA ###########################

const insertTipoBebida = async (tipoBebida) => {
  try {
    const sql = `INSERT INTO tbl_tipo_bebida (
          tipo
          )
          VALUES (
              '${tipoBebida.tipo}'
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

const updateTipoBebida = async (tipoBebida) => {
  try {
    const sql = `UPDATE tbl_tipo_bebida SET
                tipo = '${tipoBebida.tipo}'
             
             WHERE id = ${tipoBebida.id};`;

    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const deleteTipoBebida = async (id) => {
  try {
    const sql = `delete from tbl_tipo_bebida 
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

const selectAllTiposBebidas = async () => {
  const sql = `select cast(id as float) as 
        id,
        tipo
      from tbl_tipo_bebida order by id desc`;

  const rsTipoBebidas = await prisma.$queryRawUnsafe(sql);

  if (rsTipoBebidas.length > 0) {
    return rsTipoBebidas;
  }
  return false;
};

const selectByIdTipoBebida = async (id) => {
  const sql = `select cast(id as float) as
        id, 
        tipo
      from tbl_tipo_bebida where id = ${id}`;

  const rsTipoBebida = await prisma.$queryRawUnsafe(sql);

  if (rsTipoBebida.length > 0) {
    return rsTipoBebida[0];
  }
  return false;
};

export default {
  insertTipoProduto,
  updateTipoProduto,
  selectAllTiposProdutos,
  deleteTipoProduto,
  selectByIdTipoProduto,
  insertTipoPizza,
  updateTipoPizza,
  deleteTipoPizza,
  selectAllTiposPizzas,
  selectByIdTipoPizza,
  insertTipoBebida,
  updateTipoBebida,
  deleteTipoBebida,
  selectAllTiposBebidas,
  selectByIdTipoBebida,
};
