import { api } from '../../api/api.js';

export const loginAdmin = async (adminInfos) => {
  const url = 'login/admin';
  const { data } = await api.post(url, {
    email: adminInfos.email,
    password: adminInfos.password,
  });

  return data;
};

export const getAdminInfos = async (adminID) => {
  const url = `administrador/${adminID}`;
  const response = await api.get(url);

  return response;
};

export const createAdmin = async (adminInfos) => {
  const url = 'administrador';
  const response = await api.post(url, {
    nome: adminInfos.name,
    email: adminInfos.email,
    senha: adminInfos.password,
    foto: adminInfos.photo,
  });

  return response;
};
