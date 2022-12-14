import { api } from "../../api/api.js";

const infosContainer = document.querySelector(
  ".grid-content__insights-container"
);


const createInfoCard = (title, number) => {
  const div = document.createElement("div");
  div.classList.add("grid-content__insight-container");
  const h3 = document.createElement("h3");
  h3.textContent = title;
  const span = document.createElement("span");
  span.textContent = number;
  span.classList.add("number");

  div.appendChild(h3);
  div.appendChild(span);

  infosContainer.appendChild(div);
};

const usersCountFetch = async () => {
  const { data } = await api.get("/user/count");
  return data.count;
};

const pizzasCountFetch = async () => {
  const { data } = await api.get("/pizza/count");
  return data.count;
};

const drinksCountFetch = async () => {
  const { data } = await api.get('/drink/count');
  return data.count;
};

createInfoCard('Users', await usersCountFetch());
createInfoCard('Pizzas', await pizzasCountFetch());
createInfoCard('Bebidas', await drinksCountFetch());
