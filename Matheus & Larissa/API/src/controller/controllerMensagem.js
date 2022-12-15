/* eslint-disable import/extensions */
/** ************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes e Matheus Alves
* Versão: 1.0
* Data criação: 24-11-2022
* Data modificação: 01/12/2022
************************************************************************************************* */

import { MESSAGE_ERROR, MESSAGE_SUCESS } from '../module/config.js';
import mensagemDao from '../model/DAO/mensagens.js';

const buscarMensagem = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const dadosMensagens = await mensagemDao.selectByIdMensagem(id);

  if (dadosMensagens) {
    const tipoMensagem = {
      id_tipo_mensagem: dadosMensagens.id_tipo_mensagem,
      tipo_mensagem: dadosMensagens.tipo_mensagem,
    };

    delete dadosMensagens.id_tipo_mensagem;
    delete dadosMensagens.tipo_mensagem;

    dadosMensagens.tipo = tipoMensagem;

    return { mensagem: dadosMensagens };
  }
  return false;
};

const novaMensagem = async (mensagem) => {
  if (mensagem.nome === '' || mensagem.email === '' || mensagem.celular === '' || mensagem.mensagem === '' || mensagem.id_tipo_mensagem === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }
  const result = await mensagemDao.insertMensagem(mensagem);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const deletarMensagem = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const mensagem = buscarMensagem(id);
  if (mensagem) {
    const result = await mensagemDao.deleteMensagem(id);

    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.NOT_FOUND_BD };
  }
  return { status: 404, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const atualizarMensagem = async (mensagem) => {
  if (mensagem.id === '' || mensagem.id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  } if (mensagem.nome === '' || mensagem.email === '' || mensagem.telefone === '' || mensagem.celular === '' || mensagem.mensagem === '' || mensagem.id_tipo_mensagem === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }

  const result = await mensagemDao.updateMensagem(mensagem);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const listarMensagens = async () => {
  const result = await mensagemDao.selectAllMensagens();

  if (result) {
    result.map((item) => {
      const tipoMensagem = {
        id_tipo_mensagem: item.id_tipo_mensagem,
        tipo_mensagem: item.tipo_mensagem,
      };

      delete item.id_tipo_mensagem;
      delete item.tipo_mensagem;

      item.tipo = tipoMensagem;

      return item;
    });

    return result;
  }
  return false;
};

const controllerMensagem = {
  listarMensagens,
  novaMensagem,
  deletarMensagem,
  atualizarMensagem,
  buscarMensagem,
};

export default controllerMensagem;
