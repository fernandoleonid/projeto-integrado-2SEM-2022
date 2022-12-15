/* eslint-disable import/extensions */
import { MESSAGE_ERROR, MESSAGE_SUCESS } from '../module/config.js';
import administradorDao from '../model/DAO/administradores.js';

const buscarAdministrador = async (id) => {
  const dadosAdministradorJSON = {};

  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const dadosAdministrador = await administradorDao.selectByIdAdministrador(id);

  if (dadosAdministrador) {
    dadosAdministradorJSON.administrador = dadosAdministrador;
    return dadosAdministradorJSON;
  }
  return false;
};

const novoAdministrador = async (administrador) => {
  if (administrador.nome === '' || administrador.email === '' || administrador.senha === '' || administrador.foto === '') {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }
  if (!administrador.email.includes('@')) {
    return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL };
  }
  const result = await administradorDao.insertAdministrador(administrador);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const atualizarAdministrador = async (administrador) => {
  if (administrador.id === '' || administrador.id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  if (administrador.nome === '' || administrador.email === '' || administrador.senha === '' || administrador.foto === '') {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  } if (!administrador.email.includes('@')) {
    return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL };
  }
  const result = await administradorDao.updateAdministrador(administrador);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
  }
  return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD };
};

const deletarAdministrador = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const administrador = await buscarAdministrador(id);
  if (administrador) {
    const result = await administradorDao.deleteAdministrador(id);

    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  }
  return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD };
};

const listarAdministradores = async () => {
  const administrador = await administradorDao.selectAllAdministradores();

  if (administrador) {
    return administrador;
  }
  return false;
};

const controllerAdministrador = {
  listarAdministradores,
  novoAdministrador,
  deletarAdministrador,
  atualizarAdministrador,
  buscarAdministrador,
};

export default controllerAdministrador;
