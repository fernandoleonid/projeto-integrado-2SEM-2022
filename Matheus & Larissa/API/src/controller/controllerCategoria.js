/* eslint-disable import/extensions */
import { MESSAGE_ERROR, MESSAGE_SUCESS } from '../module/config.js';
import categoriaDao from '../model/DAO/categorias.js';

const buscarTipoProduto = async (id) => {
  const dadosTipoProdutoJSON = {};

  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const dadosTipoProduto = await categoriaDao.selectByIdTipoProduto(id);

  if (dadosTipoProduto) {
    dadosTipoProdutoJSON.tipoProduto = dadosTipoProduto;
    return dadosTipoProdutoJSON;
  }
  return false;
};

const novoTipoProduto = async (tipoProduto) => {
  if (tipoProduto.tipo === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }
  const result = await categoriaDao.insertTipoProduto(tipoProduto);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const deletarTipoProduto = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const tipoProduto = buscarTipoProduto(id);
  if (tipoProduto) {
    const result = await categoriaDao.deleteTipoProduto(id);

    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  }
  return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD };
};

const atualizarTipoProduto = async (tipoProduto) => {
  if (tipoProduto.id === '' || tipoProduto.id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  if (tipoProduto.tipo === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }

  const result = await categoriaDao.updateTipoProduto(tipoProduto);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const listarTiposProdutos = async () => {
  const tipoProdutos = await categoriaDao.selectAllTiposProdutos();

  if (tipoProdutos) {
    return tipoProdutos;
  }
  return false;
};
// ################################################################

const buscarTipoBebida = async (id) => {
  const dadosTipoBebidaJSON = {};

  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const dadosTipoBebida = await categoriaDao.selectByIdTipoBebida(id);

  if (dadosTipoBebida) {
    dadosTipoBebidaJSON.tipoBebida = dadosTipoBebida;
    return dadosTipoBebidaJSON;
  }
  return false;
};

const novoTipoBebida = async (tipoBebida) => {
  if (tipoBebida.tipo === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }
  const result = await categoriaDao.insertTipoBebida(tipoBebida);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const deletarTipoBebida = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const tipoBebida = await buscarTipoBebida(id);
  if (tipoBebida) {
    const result = await categoriaDao.deleteTipoBebida(id);

    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  }
  return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD };
};

const atualizarTipoBebida = async (tipoBebida) => {
  if (tipoBebida.id === '' || tipoBebida.id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  if (tipoBebida.tipo === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }

  const result = await categoriaDao.updateTipoBebida(tipoBebida);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const listarTiposBebidas = async () => {
  const tipoBebidas = await categoriaDao.selectAllTiposBebidas();

  if (tipoBebidas) {
    return tipoBebidas;
  }
  return false;
};

// #########################################################################################

const buscarTipoPizza = async (id) => {
  const dadosTipoPizzaJSON = {};

  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const dadosTipoPizza = await categoriaDao.selectByIdTipoPizza(id);

  if (dadosTipoPizza) {
    dadosTipoPizzaJSON.tipoPizza = dadosTipoPizza;
    return dadosTipoPizzaJSON;
  }
  return false;
};

const novoTipoPizza = async (tipoPizza) => {
  if (tipoPizza.tipo === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }
  const result = await categoriaDao.insertTipoPizza(tipoPizza);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const deletarTipoPizza = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const tipoPizza = await buscarTipoPizza(id);
  if (tipoPizza) {
    const result = await categoriaDao.deleteTipoPizza(id);

    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  }
  return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD };
};

const atualizarTipoPizza = async (tipoPizza) => {
  if (tipoPizza.id === '' || tipoPizza.id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  if (tipoPizza.tipo === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }

  const result = await categoriaDao.updateTipoPizza(tipoPizza);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const listarTiposPizzas = async () => {
  const tipoPizzas = await categoriaDao.selectAllTiposPizzas();

  if (tipoPizzas) {
    return tipoPizzas;
  }
  return false;
};

const controllerCategoria = {
  buscarTipoProduto,
  listarTiposProdutos,
  atualizarTipoProduto,
  deletarTipoProduto,
  novoTipoProduto,
  buscarTipoPizza,
  listarTiposPizzas,
  atualizarTipoPizza,
  deletarTipoPizza,
  novoTipoPizza,
  buscarTipoBebida,
  listarTiposBebidas,
  atualizarTipoBebida,
  deletarTipoBebida,
  novoTipoBebida,
};

export default controllerCategoria;
