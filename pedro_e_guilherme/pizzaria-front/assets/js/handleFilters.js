import { populateCardapio } from "./app.js";
import fetchProducts from "./utils/fetchProducts.js";
import {
  filterForCategory,
  filterForDrinkType,
  filterForPizzaStuffing,
  filterForPizzaType,
  filterForPizzaTypeAndStuffing,
} from "./utils/fetchToFilterProducts.js";

const selects = document.querySelectorAll(".select-input__option");
const categorySelect = selects[0];
const typeFilter = selects[1];
const stuffingFilter = selects[2];

console.log(categorySelect);

categorySelect.addEventListener("change", async (e) => {
  e.preventDefault();

  document.querySelector(".grid-foods").innerHTML = "";

  const { target } = e;
  const { value } = target;

  if (value.toLowerCase().includes("any")) {
    // DEFAULT
    const data = await fetchProducts();
    populateCardapio(data);
    return;
  }

  const data = await filterForCategory(value);

  populateCardapio(data);
});

typeFilter.addEventListener("change", async (e) => {
  e.preventDefault();
  document.querySelector(".grid-foods").innerHTML = "";

  const { target } = e;
  const { value } = target;

  // pizza
  if (categorySelect.value == 1) {
    if (value.toLowerCase().includes("any")) {
      // DEFAULT
      const data = await filterForCategory(1);
      populateCardapio(data);
      return;
    }
    const data = await filterForPizzaType(value);
    console.log(data);
    populateCardapio(data.payload);
  }

  if (value.toLowerCase().includes("any")) {
    // DEFAULT
    const data = await filterForCategory(2);
    populateCardapio(data);
    return;
  }

  const data = await filterForDrinkType(value);

  populateCardapio(data.payload);
});

stuffingFilter.addEventListener("change", async (e) => {
  document.querySelector(".grid-foods").innerHTML = "";

  e.preventDefault();
  const { target } = e;
  const { value } = target;
  if (typeFilter.value.toLowerCase().includes("any")) {
    if (value.toLowerCase().includes("any")) {
      // DEFAULT
      const data = await filterForCategory(1);
      populateCardapio(data);
      return;
    }
    const data = await filterForPizzaStuffing(value);

    populateCardapio(data.payload);
  } else {
    if (value.toLowerCase().includes("any")) {
      // DEFAULT
      const data = await filterForCategory(1);
      populateCardapio(data);
      return;
    }
    const data = await filterForPizzaTypeAndStuffing(typeFilter.value, value);

    populateCardapio(data.payload);
  }
});
