import { getAdminInfos } from './integrations/adminAxios.js';

export const loadAdminProfile = async () => {
  const adminName = document.querySelector('#admin-name');
  const adminPhoto = document.querySelector('#admin-photo');

  const adminID = localStorage.getItem('ID_ADMIN');

  const { data } = await getAdminInfos(adminID);

  adminName.textContent = data.administrador.nome;
  adminPhoto.src = data.administrador.foto;
};
