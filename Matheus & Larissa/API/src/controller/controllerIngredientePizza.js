/* eslint-disable import/extensions */
/** ************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes e Matheus Alves
* Versão: 1.0
* Data criação: 24-11-2022
* Data modificação: 01/12/2022
************************************************************************************************* */

import { MESSAGE_ERROR, MESSAGE_SUCESS } from '../module/config.js';
import ingredientePizzaDao from '../model/DAO/ingredientePizza.js';

const buscarIngredientePizza = async (id) => {
  const dadosIngredientePizzaJSON = {};

  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const dadosIngredientePizza = await ingredientePizzaDao.selectByIdIngredientePizza(id);

  if (dadosIngredientePizza) {
    dadosIngredientePizzaJSON.ingrediente = dadosIngredientePizza;
    return dadosIngredientePizzaJSON;
  }
  return false;
};

const novoIngredientePizza = async (ingredientePizza) => {
  if (ingredientePizza.id_ingrediente === '' || ingredientePizza.id_pizza === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }
  const result = await ingredientePizzaDao.insertIngredientePizza(ingredientePizza);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const deletarIngredientePizza = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const ingredientePizza = await buscarIngredientePizza(id);
  if (ingredientePizza) {
    const result = await ingredientePizzaDao.deleteIngredientePizza(id);

    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  }
  return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD };
};

const atualizarIngredientePizza = async (ingredientePizza) => {
  if (ingredientePizza.id === '' || ingredientePizza.id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  if (ingredientePizza.nome === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }

  const result = await ingredientePizzaDao.updateIngredientePizza(ingredientePizza);

  if (result) {
    return { status: 200, message: MESSAGE_SUCESS.UPDATE_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const listarIngredientesPizzas = async () => {
  const ingredientePizza = await ingredientePizzaDao.selectAllIngredientesPizzas();

  if (ingredientePizza) {
    return ingredientePizza;
  }
  return false;
};

const controllerIngredientesPizza = {
  listarIngredientesPizzas,
  novoIngredientePizza,
  deletarIngredientePizza,
  atualizarIngredientePizza,
  buscarIngredientePizza,
};

export default controllerIngredientesPizza;
