import { getMessages } from './utils/integrations/messageAxios.js';
import {
  deleteDrink,
  deletePizza,
  getAllProducts,
} from './utils/integrations/productAxios.js';
import { loadAdminProfile } from './utils/loadAdminProfile.js';

const deleteButton = document.querySelector('.delete-button');

loadAdminProfile();

const loadAllProducts = async () => {
  const { produtos } = await getAllProducts();

  produtos.forEach(async (item) => {
    if (item.desconto) {
      item.preco = item.preco * (item.desconto / 100);
    }

    const container = document.querySelector('tbody');

    const tableRow = document.createElement('tr');
    tableRow.classList.add('product-row');
    tableRow.setAttribute('id_produto', item.id);

    const productType = document.createElement('td');
    productType.classList.add('product-type');
    const productName = document.createElement('td');
    const productSize = document.createElement('td');
    const productIngredients = document.createElement('td');
    const productPrice = document.createElement('td');
    const productPhotoContainer = document.createElement('td');

    const productPhoto = document.createElement('img');
    productPhoto.classList.add('product-img');

    productType.textContent = item.categoria;
    productName.textContent = item.nome;
    productSize.textContent = item.tamanho;
    productIngredients.textContent = 'Ingredientes';
    productPrice.textContent = `R$ ${Number(item.preco).toFixed(2)}`;
    productPhoto.src = item.imagem;

    productPhotoContainer.appendChild(productPhoto);
    tableRow.appendChild(productType);
    tableRow.appendChild(productName);
    tableRow.appendChild(productSize);
    tableRow.appendChild(productIngredients);
    tableRow.appendChild(productPrice);
    tableRow.appendChild(productPhotoContainer);
    container.appendChild(tableRow);
  });
};

deleteButton.addEventListener('click', (el) => {
  deleteButton.style.backgroundColor = 'red';
  const tableRows = document.querySelectorAll('.product-row');
  tableRows.forEach((item) => {
    item.addEventListener('click', async (el) => {
      const productID = item.getAttribute('id_produto');
      const productType = item.children.item(0).textContent;

      if (productType.toLowerCase() === 'pizza') await deletePizza(productID);
      if (productType.toLowerCase() === 'bebida') await deleteDrink(productID);
      location.reload();
    });
  });
});

loadAllProducts();

const message = await getMessages();
console.log(message);