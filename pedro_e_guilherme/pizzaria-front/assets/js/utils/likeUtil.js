export const like = async (id) => {
  const { data } = await axios.put(
    `https://api-pizza-client.netlify.app/.netlify/functions/server/product/like/${id}`
  );

  return data;
};

export const deslike = async (id) => {
  const { data } = await axios.put(
    `https://api-pizza-client.netlify.app/.netlify/functions/server/product/deslike/${id}`
  );

  return data;
};
