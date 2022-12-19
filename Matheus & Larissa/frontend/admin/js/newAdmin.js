import { createAdmin } from './utils/integrations/adminAxios.js';
import { loadAdminProfile } from './utils/loadAdminProfile.js';

loadAdminProfile();
// getImage(adminPhotoInput);

const validateInputs = () => {
  const adminName = document.querySelector('#new-admin-name').value;
  const adminEmail = document.querySelector('#new-admin-email').value;
  const adminPassword = document.querySelector('#new-admin-password').value;
  const adminConfirmPassword = document.querySelector(
    '#confirm-admin-password'
  ).value;

  if (
    adminName === '' ||
    adminEmail === '' ||
    adminPassword === '' ||
    adminConfirmPassword === ''
  )
    return false;
  return true;
};

const validatePassword = (password, confirmPassword) => {
  if (password === confirmPassword) return true;
  return false;
};

const getFormValues = () => {
  const adminName = document.querySelector('#new-admin-name').value;
  const adminEmail = document.querySelector('#new-admin-email').value;
  const adminPassword = document.querySelector('#new-admin-password').value;
  const adminConfirmPassword = document.querySelector(
    '#confirm-admin-password'
  ).value;
  // const adminPhotoInput = document.querySelector('#new-admin-photo');
  const validatedPassword = validatePassword(
    adminPassword,
    adminConfirmPassword
  );

  if (validatedPassword) {
    const adminJSON = {
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      photo:
        'https://tm.ibxk.com.br/2021/04/23/23165043458380.jpg?ims=1200x675',
    };

    return adminJSON;
  }
  alert('As senhas não batem');
  return false;
};

document
  .querySelector('.submit-button')
  .addEventListener('click', async (el) => {
    if (validateInputs()) {
      const admin = getFormValues();
      if (admin) await createAdmin(admin);
      location.href = './cms-home.html';
    } else alert('Preencha os campos');
  });
