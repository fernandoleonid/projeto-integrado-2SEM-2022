/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/** ************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes e Matheus Alves
* Versão: 1.0
* Data criação: 24-11-2022
* Data modificação: 01/12/2022
************************************************************************************************* */

import pizzaDAO from '../model/DAO/pizzas.js';
import bebidaDAO from '../model/DAO/bebidas.js';
import { MESSAGE_ERROR } from '../module/config.js';

const listarProdutos = async () => {
  const pizzas = await pizzaDAO.selectAllPizzas();
  const bebidas = await bebidaDAO.selectAllBebidas();

  if (pizzas && bebidas) {
    const produtos = [];
    pizzas.forEach((pizza) => {
      const tipo = { id: pizza.id_tipo_pizza, nome: pizza.tipo_pizza };

      delete pizza.id_tipo_pizza;
      delete pizza.tipo_pizza;

      pizza.tipo_pizza = tipo;

      pizza.categoria = 'pizza';

      produtos.push(pizza);
    });
    bebidas.forEach((bebida) => {
      const tipo = { id: bebida.id_tipo_bebida, nome: bebida.tipo_bebida };

      delete bebida.id_tipo_bebida;
      delete bebida.tipo_bebida;

      bebida.tipo_bebida = tipo;

      bebida.categoria = 'bebida';

      produtos.push(bebida);
    });
    const response = { produtos };

    return { status: 200, message: response };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const controllerProdutos = {
  listarProdutos,
};

export default controllerProdutos;
