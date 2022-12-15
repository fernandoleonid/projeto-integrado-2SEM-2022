/* eslint-disable import/extensions */
/** ************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes e Matheus Alves
* Versão: 1.0
* Data criação: 24-11-2022
* Data modificação: 01/12/2022
************************************************************************************************* */

import { MESSAGE_ERROR, MESSAGE_SUCESS } from '../module/config.js';
import ingredienteDao from '../model/DAO/ingredientes.js';

const buscarIngrediente = async (id) => {
  const dadosIngredienteJSON = {};

  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const dadosIngrediente = await ingredienteDao.selectByIdIngrediente(id);

  if (dadosIngrediente) {
    dadosIngredienteJSON.ingrediente = dadosIngrediente;
    return dadosIngredienteJSON;
  }
  return false;
};

const novoIngrediente = async (ingrediente) => {
  if (ingrediente.nome === '' || ingrediente.nome === undefined || ingrediente.nome === null) {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }
  const result = await ingredienteDao.insertIngrediente(ingrediente);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const deletarIngrediente = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const ingrediente = await buscarIngrediente(id);
  if (ingrediente) {
    const result = await ingredienteDao.deleteIngrediente(id);

    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  }
  return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD };
};

const atualizarIngrediente = async (ingrediente) => {
  if (ingrediente.id === '' || ingrediente.id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  if (ingrediente.nome === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }

  const result = await ingredienteDao.updateIngrediente(ingrediente);

  if (result) {
    return { status: 200, message: MESSAGE_SUCESS.UPDATE_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const listarIngredientes = async () => {
  const ingrediente = await ingredienteDao.selectAllIngredientes();

  if (ingrediente) {
    return ingrediente;
  }
  return false;
};

const controllerIngredientes = {
  listarIngredientes,
  novoIngrediente,
  deletarIngrediente,
  atualizarIngrediente,
  buscarIngrediente,
};

export default controllerIngredientes;
