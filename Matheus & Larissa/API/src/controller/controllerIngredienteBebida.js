/* eslint-disable import/extensions */
/** ************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes e Matheus Alves
* Versão: 1.0
* Data criação: 24-11-2022
* Data modificação: 01/12/2022
************************************************************************************************* */

import { MESSAGE_ERROR, MESSAGE_SUCESS } from '../module/config.js';
import ingredienteBebidaDao from '../model/DAO/ingredienteBebida.js';

const buscarIngredienteBebida = async (id) => {
  const dadosIngredienteBebidaJSON = {};

  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const dadosIngredienteBebida = await ingredienteBebidaDao.selectByIdIngredienteBebida(id);

  if (dadosIngredienteBebida) {
    dadosIngredienteBebidaJSON.ingrediente = dadosIngredienteBebida;
    return dadosIngredienteBebidaJSON;
  }
  return false;
};

const novoIngredienteBebida = async (ingredienteBebida) => {
  if (ingredienteBebida.nome === '' || ingredienteBebida.nome === undefined || ingredienteBebida.nome === null) {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }
  const result = await ingredienteBebidaDao.insertIngredienteBebida(ingredienteBebida);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const deletarIngredienteBebida = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const ingrediente = await buscarIngredienteBebida(id);
  if (ingrediente) {
    const result = await ingredienteBebidaDao.deleteIngredienteBebida(id);

    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  }
  return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD };
};

const atualizarIngredienteBebida = async (ingredienteBebida) => {
  if (ingredienteBebida.id === '' || ingredienteBebida.id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  if (ingredienteBebida.nome === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }

  const result = await ingredienteBebidaDao.updateIngredienteBebida(ingredienteBebida);

  if (result) {
    return { status: 200, message: MESSAGE_SUCESS.UPDATE_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const listarIngredientesBebidas = async () => {
  const ingredienteBebida = await ingredienteBebidaDao.selectAllIngredientesBebidas();

  if (ingredienteBebida) {
    return ingredienteBebida;
  }
  return false;
};

const controllerIngredientesBebida = {
  listarIngredientesBebidas,
  novoIngredienteBebida,
  deletarIngredienteBebida,
  atualizarIngredienteBebida,
  buscarIngredienteBebida,
};

export default controllerIngredientesBebida;
