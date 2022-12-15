import { insertDrink, insertPizza } from './utils/integrations/productAxios.js';
import { loadAdminProfile } from './utils/loadAdminProfile.js';

loadAdminProfile();

const checkbox = document.querySelector('#yes-discount-option');

const sanitizeSizeOptions = () => {
  const options = document.querySelectorAll('#product-size-select option');

  options.forEach((item) => {
    item.remove();
  });
};

const populateSizeOptions = (options) => {
  const select = document.querySelector('#product-size-select');
  options.forEach((item) => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });
};

const changeSizesOptions = (type) => {
  const drinkOptions = ['350ml', '500ml', '1L', '1,5L'];
  const pizzaOptions = ['Broto', 'Grande'];
  if (type === 'pizza') {
    sanitizeSizeOptions();
    populateSizeOptions(pizzaOptions);
  }
  if (type === 'drink') {
    sanitizeSizeOptions();
    populateSizeOptions(drinkOptions);
  }
};

const listenDiscountChecked = () => {
  if (!checkbox.checked) {
    document
      .querySelector('#product-discount')
      .setAttribute('disabled', 'disabled');
  } else
    document
      .querySelector('#product-discount')
      .removeAttribute('disabled', 'disabled');
};

listenDiscountChecked();
changeSizesOptions(document.querySelector('#product-type-select').value);

checkbox.addEventListener('change', () => {
  listenDiscountChecked();
});

const validateInputs = () => {
  const productName = document.querySelector('#product-name-input').value;
  const productType = document.querySelector('#product-type-select').value;
  const productSize = document.querySelector('#product-size-select').value;
  const productCategory = document.querySelector(
    '#product-category-input'
  ).value;
  const productPrice = document.querySelector('#product-price-input').value;

  if (productName === '' || productType === '' || productSize === '' || productCategory === '' || productPrice === '')
    return false
  return true
}

const getFormValues = () => {
  const productName = document.querySelector('#product-name-input').value;
  const productType = document.querySelector('#product-type-select').value;
  const productSize = document.querySelector('#product-size-select').value;
  const productCategory = document.querySelector(
    '#product-category-input'
  ).value;
  const productPrice = document.querySelector('#product-price-input').value;
  let discount = document.querySelector('#product-discount').value;

  if (discount === '' || discount === undefined) discount = null;

  const productJSON = {
    name: productName,
    type: productType,
    size: productSize,
    category: productCategory,
    price: productPrice,
    discount,
  };

  return productJSON;
};

document.querySelector('.submit-button').addEventListener('click', async () => {
  if (validateInputs()) {
    const product = getFormValues();
  
    if (product.type === 'pizza') {
      if (product.category.toLowerCase() === 'salgada') product.type = 1;
      if (product.category.toLowerCase() === 'doce') product.type = 2;
      await insertPizza(product);
      location.href = './cms-home.html'
    }
    if (product.type === 'drink') {
      if (
        product.category.toLowerCase().includes('alcoolica') ||
        product.category.toLowerCase().includes('alcoólica')
      )
        product.type = 1;
      if (product.category.toLowerCase() === 'suco') product.type = 2;
      if (product.category.toLowerCase() === 'refrigerante') product.type = 3;
      await insertDrink(product);
      location.href = './cms-home.html'
    }
  } else alert('Preencha os campos corretamente');
});

document
  .querySelector('#product-type-select')
  .addEventListener('change', (el) => {
    changeSizesOptions(el.target.value);
  });
