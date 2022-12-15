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

const insertAdministrador = async (administrador) => {
  try {
    const sql = `insert into tbl_administrador (
            nome,
            email,
            senha,
            foto
        )
        values (
            '${administrador.nome}',
            '${administrador.email}',
            '${administrador.senha}',
            '${administrador.foto}'
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

const updateAdministrador = async (administrador) => {
  try {
    const sql = `UPDATE tbl_administrador SET
            nome = '${administrador.nome}',
            email = '${administrador.email}',
            senha = '${administrador.senha}',
            foto = '${administrador.foto}'
         
         WHERE id = ${administrador.id};`;

    const result = await prisma.$executeRawUnsafe(sql);
    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const deleteAdministrador = async (id) => {
  try {
    const sql = `delete from tbl_administrador 
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

const selectAllAdministradores = async () => {
  const sql = `select cast(id as float) as 
        id, 
        nome, 
        email, 
        senha,
        foto
    from tbl_administrador order by id desc`;

  const rsAdministrador = await prisma.$queryRawUnsafe(sql);

  if (rsAdministrador.length > 0) {
    return rsAdministrador;
  }
  return false;
};

const selectByIdAdministrador = async (id) => {
  const sql = `select cast(id as float) as 
            id, 
            nome, 
            email, 
            senha,
            foto 
        from tbl_administrador where id = ${id}`;

  const rsAdministrador = await prisma.$queryRawUnsafe(sql);

  if (rsAdministrador.length > 0) {
    return rsAdministrador[0];
  }
  return false;
};

export default {
  updateAdministrador,
  deleteAdministrador,
  selectAllAdministradores,
  insertAdministrador,
  selectByIdAdministrador,
};
