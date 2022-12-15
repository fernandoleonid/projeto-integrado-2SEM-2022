import { getPizzas, getDrinks } from '../integrations/productAxios.js';
import { renderProducts } from '../utils/renderProducts.js';

export default function listenProductTypes() {
  let productListElements = document.querySelectorAll('.product-type');
  renderProducts();
  productListElements.forEach((element) => {
    element.addEventListener('click', (el) => {
      renderProducts();
      if (!element.classList.contains('selected')) {
        productListElements.forEach((element) => {
          element.classList.contains('selected')
            ? element.classList.remove('selected')
            : false;
        });
        element.classList.add('selected');
        document.querySelector('.product-type-title').textContent =
          element.textContent;
      } else if (element.classList.contains('selected'))
        element.classList.remove('selected');
    });
  });
}
