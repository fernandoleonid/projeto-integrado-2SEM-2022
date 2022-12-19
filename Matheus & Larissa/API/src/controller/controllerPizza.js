/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/** ************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes e Matheus Alves
* Versão: 1.0
* Data criação: 24-11-2022
* Data modificação: 01/12/2022
************************************************************************************************* */

import { MESSAGE_ERROR, MESSAGE_SUCESS } from '../module/config.js';
import pizzaDao from '../model/DAO/pizzas.js';

const listarPizzas = async () => {
  const pizza = await pizzaDao.selectAllPizzas();

  if (pizza) {
    const response = pizza.map((item) => {
      const tipo = { id: item.id_tipo_pizza, nome: item.tipo_pizza };

      delete item.id_tipo_pizza;
      delete item.tipo_pizza;

      item.tipo = tipo;
      return item;
    });

    return response;
  }
  return false;
};

const buscarPizza = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const dadosPizza = await pizzaDao.selectByIdPizza(id);

  if (dadosPizza) {
    const tipo = { id: dadosPizza.id_tipo_pizza, nome: dadosPizza.tipo_pizza };

    delete dadosPizza.id_tipo_pizza;
    delete dadosPizza.tipo_pizza;
    dadosPizza.tipo = tipo;

    return dadosPizza;
  }
  return false;
};

const novaPizza = async (pizza) => {
  if (pizza.nome === '' || pizza.imagem === '' || pizza.tamanho === '' || pizza.preco === '' || pizza.desconto === '' || pizza.tipo === '' || pizza.quantidade_vezes_favorito === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }
  const result = await pizzaDao.insertPizza(pizza);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const deletarPizza = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const pizza = await buscarPizza(id);
  if (pizza) {
    const result = await pizzaDao.deletePizza(id);

    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  }
  return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD };
};

const atualizarPizza = async (pizza) => {
  if (pizza.id === '' || pizza.id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  if (pizza.nome === '' || pizza.imagem === '' || pizza.tamanho === '' || pizza.preco === '' || pizza.desconto === '' || pizza.id_tipo_pizza === '' || pizza.quantidade_vezes_favorito === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }

  const result = await pizzaDao.updatePizza(pizza);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const controllerPizza = {
  listarPizzas,
  novaPizza,
  deletarPizza,
  atualizarPizza,
  buscarPizza,
};

export default controllerPizza;
