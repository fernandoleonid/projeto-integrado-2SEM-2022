/* eslint-disable import/extensions */
/** ************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes e Matheus Alves
* Versão: 1.0
* Data criação: 24-11-2022
* Data modificação: 01/12/2022
************************************************************************************************* */

import { MESSAGE_ERROR, MESSAGE_SUCESS } from '../module/config.js';
import bebidaDao from '../model/DAO/bebidas.js';

const listarBebidas = async () => {
  const bebida = await bebidaDao.selectAllBebidas();

  if (bebida) {
    const response = bebida.map((item) => {
      const tipo = { id: item.id_tipo_bebida, nome: item.tipo_bebida };

      delete item.id_tipo_bebida;
      delete item.tipo_bebida;

      item.tipo = tipo;
      return item;
    });

    return response;
  }
  return false;
};

const buscarBebida = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const dadosBebida = await bebidaDao.selectByIdBebida(id);

  if (dadosBebida) {
    const tipo = { id: dadosBebida.id_tipo_bebida, nome: dadosBebida.tipo_bebida };

    delete dadosBebida.id_tipo_bebida;
    delete dadosBebida.tipo_bebida;
    dadosBebida.tipo = tipo;

    return dadosBebida;
  }
  return false;
};

const novaBebida = async (bebida) => {
  if (bebida.nome === '' || bebida.imagem === '' || bebida.tamanho === '' || bebida.preco === '' || bebida.desconto === '' || bebida.id_tipo_bebida === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }
  const result = await bebidaDao.insertBebida(bebida);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const deletarBebida = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const bebida = buscarBebida(id);
  if (bebida) {
    const result = await bebidaDao.deleteBebida(id);

    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  }
  return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD };
};

const atualizarBebida = async (bebida) => {
  if (bebida.id === '' || bebida.id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  if (bebida.nome === '' || bebida.imagem === '' || bebida.tamanho === '' || bebida.preco === '' || bebida.desconto === undefined || bebida.id_tipo_bebida === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }

  const result = await bebidaDao.updateBebida(bebida);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const controllerBebida = {
  listarBebidas,
  novaBebida,
  deletarBebida,
  atualizarBebida,
  buscarBebida,
};

export default controllerBebida;