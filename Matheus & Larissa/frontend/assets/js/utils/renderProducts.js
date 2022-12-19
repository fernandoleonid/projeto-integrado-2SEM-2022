import { bebidas, pizzas } from '../main.js';

const sanitizeProductsContainer = () => {
  const products = document.querySelectorAll(
    '.menu-items-container product-card'
  );
  products.forEach((item) => {
    item.remove();
  });
};

export const renderProducts = () => {
  const productType = document.querySelector('#chosen-product-type');
  const type = productType.textContent;
  const container = document.querySelector('.menu-items-container');

  sanitizeProductsContainer();

  if (type.toLowerCase() === 'pizzas') {
    pizzas.forEach((productInfo) => {
      const productCard = document.createElement('product-card');

      productCard.setAttribute('name', productInfo.nome);
      productCard.setAttribute('price', Number(productInfo.preco).toFixed(2));
      productCard.setAttribute('photo', productInfo.imagem);
      productCard.setAttribute('type', 'pizza');
      productCard.setAttribute('id_produto', productInfo.id);

      container.appendChild(productCard);
    });
  }
  if (type.toLowerCase() === 'pizzas favoritas') {
    pizzas.forEach((favoritePizzaItem) => {
      if (favoritePizzaItem.quantidade_vezes_favorito > 3) {
        const productCard = document.createElement('product-card');
        productCard.setAttribute('name', favoritePizzaItem.nome);
        productCard.setAttribute(
          'price',
          Number(favoritePizzaItem.preco).toFixed(2)
        );
        productCard.setAttribute('photo', favoritePizzaItem.imagem);
        productCard.setAttribute('type', 'pizza');
        productCard.setAttribute('id_produto', favoritePizzaItem.id);

        container.appendChild(productCard);
      }
    });
  }
  if (type.toLowerCase() === 'bebidas') {
    bebidas.forEach((bebidaItem) => {
      const productCard = document.createElement('product-card');
      productCard.setAttribute('name', bebidaItem.nome);
      productCard.setAttribute('price', Number(bebidaItem.preco).toFixed(2));
      productCard.setAttribute('photo', bebidaItem.imagem);
      productCard.setAttribute('type', 'pizza');
      productCard.setAttribute('id_produto', bebidaItem.id);

      container.appendChild(productCard);
    });
  }
};
