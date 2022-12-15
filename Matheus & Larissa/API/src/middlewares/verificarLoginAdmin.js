/* eslint-disable import/extensions */
import controllerAdministrador from '../controller/controllerAdministrador.js';

export default async function verifyAdminLogin(adminInfos) {
  const allAdmins = await controllerAdministrador.listarAdministradores();
  let foundAdmin;

  allAdmins.forEach((admin) => {
    if (admin.email === adminInfos.email && admin.senha === adminInfos.password) {
      foundAdmin = admin;
    }
  });
  return foundAdmin;
}
