import fetchProducts from '../../assets/js/utils/fetchProducts.js';
import { api } from '../../api/api.js';

const tbody = document.querySelector('.table-products tbody');

const data = await fetchProducts();
console.log(data);

const fetchCategoryById = async (id) => {
  const { data } = await api.get(`/category/${id}`);
  return data.payload[0].name;
};
const createRowsCards = async () => {
  console.log(data[0].category_id);
  console.log(await fetchCategoryById(data[0].category_id));

  await Promise.all(data.map(async (product) => {
    const tr = document.createElement('tr');
    tr.id = product.id;

    tr.classList.add('table-products__product-row');

    const categoryTh = document.createElement('th');
    categoryTh.textContent = await fetchCategoryById(product.category_id);

    const typeTh = document.createElement('th');
    if (categoryTh.textContent === 'Bebida') {
      typeTh.textContent = product.tbl_drink[0].tbl_drink_type.name;
      tr.setAttribute('id-product-type', product?.tbl_drink[0].id);
    } else {
      typeTh.textContent = product.tbl_pizza[0].tbl_pizza_type.name;
      tr.setAttribute('id-product-type', product?.tbl_pizza[0].id);
    }

    const nameTh = document.createElement('th');
    nameTh.textContent = product.name;

    const fotoTh = document.createElement('th');
    const img = document.createElement('img');
    img.classList.add('product-row__image');
    img.src = product?.tbl_product_pictures[0].tbl_picture.picture_link;

    const priceTh = document.createElement('th');
    priceTh.textContent = `R$ ${product.price.replace('.', ',')}`;

    const ingredientTh = document.createElement('th');
    if (categoryTh.textContent === 'Bebida') {
      ingredientTh.textContent = `${product.tbl_drink[0].volume}ml`;
    } else {
      ingredientTh.textContent = product?.tbl_pizza[0].tbl_pizza_ingredient.map((ingredient) => ingredient.tbl_ingredient.name).join(',');
    }

    fotoTh.appendChild(img);

    tr.appendChild(categoryTh);
    tr.appendChild(typeTh);
    tr.appendChild(nameTh);
    tr.appendChild(fotoTh);
    tr.appendChild(priceTh);
    tr.appendChild(ingredientTh);

    tbody.appendChild(tr);
  }));
};

await createRowsCards();
