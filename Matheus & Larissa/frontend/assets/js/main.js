import listenProductTypes from './modules/product-list.js';
import './modules/product-card.js';
import {
  getDrinks,
  getPizzaById,
  getPizzas,
  getProducts,
} from './integrations/productAxios.js';
import { newMessage } from './integrations/messageAxios.js';

export const { bebidas } = await getDrinks();
export const { pizzas } = await getPizzas();

listenProductTypes();

const discountPizzas = new Array();

pizzas.forEach((productInfo) => {
  if (productInfo.desconto) {
    discountPizzas.push(productInfo);
  }
});

discountPizzas.forEach((item) => {
  const container = document.querySelector('.discount-items-container');

  const card = document.createElement('product-card');
  card.setAttribute('name', item.nome);
  card.setAttribute('price', Number(item.preco).toFixed(2));
  card.setAttribute('photo', item.imagem);
  card.setAttribute('type', 'pizza');
  card.setAttribute('id_produto', item.id);

  container.appendChild(card);
});

const validateMessageForm = () => {
  const name = document.querySelector('#contact-name').value;
  const cellphoneNumber = document.querySelector(
    '#contact-cellphone-number'
  ).value;
  const email = document.querySelector('#contact-email').value;
  const critic = document.querySelector('#critic');
  const sugestion = document.querySelector('#sugestion');
  const message = document.querySelector('#message').value;

  if (name === '' || cellphoneNumber === '' || email === '' || message === '')
    return false;
  if (!critic.checked && !sugestion.checked) return false;
  return true;
};

const getMessageForm = () => {
  const name = document.querySelector('#contact-name').value;
  const cellphoneNumber = document.querySelector(
    '#contact-cellphone-number'
  ).value;
  const phoneNumber = document.querySelector('#contact-phone-number').value;
  const email = document.querySelector('#contact-email').value;

  const critic = document.querySelector('#critic');
  const sugestion = document.querySelector('#sugestion');
  let messageType;

  if (critic.checked) messageType = 2;
  if (sugestion.checked) messageType = 1;

  const message = document.querySelector('#message').value;

  const messageJSON = {
    name,
    cellphoneNumber,
    phoneNumber,
    email,
    messageType,
    message,
  };

  return messageJSON;
};

document
  .querySelector('#message-submit-button')
  .addEventListener('click', (el) => {
    if (validateMessageForm()) {
      const messageFormJSON = getMessageForm();
      const response = newMessage(messageFormJSON);
      if (response) {
        alert('Mensagem enviada com sucesso!');
      } else alert('Ocorreu um erro inesperado');
    } else alert('Preencha os campos');
  });
