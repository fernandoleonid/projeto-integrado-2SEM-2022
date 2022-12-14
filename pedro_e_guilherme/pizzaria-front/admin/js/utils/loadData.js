import { api } from '../../../api/api.js';
import { fetchTypes } from './fetchTypes.js';

const fetchProduto = async (category, idProduct) => {
  try {
    const { data } = await api.get(`/${category}/${idProduct}`);
    return data.payload;
  } catch (e) {
    console.log(e);
  }
};

export const loadData = async (idProduct, idProductType) => {
  const categoryInput = document.querySelector('#category-select');
  const priceInput = document.querySelector('input[name="price"]');
  const stuffingInput = document.querySelector('input[name="stuffing"]');
  let product;

  const { data } = await axios(
    `https://api-pizza-client.netlify.app/.netlify/functions/server/product/${idProduct}`,
  );

  setTimeout(async () => {
    product = await fetchProduto(categoryInput.value.toLowerCase(), idProductType);
    console.log(product);

    const typeInput = document.querySelector('#type-select').childNodes;
    stuffingInput.value = product.pizza_stuffing[0].stuffing.name;

    await fetchTypes(categoryInput, document.querySelector('#type-select'));
    priceInput.value = product.product.price;

    typeInput.forEach((option) => {
      if (option.value === product.pizza_type.name) {
        option.selected = true;
      }
    });
    typeInput.value = product.pizza_type.name;
  }, 1500);

  const idCategoria = data.payload[0].category_id;

  const dataCategoria = await api.get(`/category/${idCategoria}`);
  categoryInput.value = dataCategoria.data.payload[0].name;
};

