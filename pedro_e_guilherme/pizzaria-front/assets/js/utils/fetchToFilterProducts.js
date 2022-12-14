export const filterForCategory = async (categoryId) => {
  const { data } = await axios(
    "https://api-pizza-client.netlify.app/.netlify/functions/server/product"
  );

  const filtered = [];
  data.forEach((product) => {
    console.log(product.category_id, categoryId);
    if (product.category_id == categoryId) filtered.push(product);
  });

  return filtered;
};

export const filterForPizzaType = async (pizzaType) => {
  const { data } = await axios(
    `https://api-pizza-client.netlify.app/.netlify/functions/server/pizza?type=${pizzaType.toLowerCase()}`
  );
  return data;
};

export const filterForPizzaStuffing = async (pizzaStuffing) => {
  const { data } = await axios(
    `https://api-pizza-client.netlify.app/.netlify/functions/server/pizza?stuffing=${pizzaStuffing.toLowerCase()}`
  );

  return data;
};

export const filterForPizzaTypeAndStuffing = async (type, stuffing) => {
  const { data } = await axios(
    `https://api-pizza-client.netlify.app/.netlify/functions/server/pizza?type=${type.toLowerCase()}&stuffing=${stuffing}`
  );

  return data;
};

export const filterForDrinkType = async (type) => {
  const { data } = await axios(
    `https://api-pizza-client.netlify.app/.netlify/functions/server/drink?type=${type.toLowerCase()}`
  );

  return data;
};
