export const categoryFetch = async () => {
  const { data } = await axios(
    "https://api-pizza-client.netlify.app/.netlify/functions/server/category"
  );
  return data;
};

export const drinkTypesFetch = async () => {
  const { data } = await axios(
    "https://api-pizza-client.netlify.app/.netlify/functions/server/types/drink"
  );
  return data;
};

export const pizzaTypesFetch = async () => {
  const { data } = await axios(
    "https://api-pizza-client.netlify.app/.netlify/functions/server/types/pizza"
  );
  return data;
};

export const pizzaStuffingFetch = async () => {
  const { data } = await axios(
    "https://api-pizza-client.netlify.app/.netlify/functions/server/types/pizza/stuffing"
  );
  return data;
};
