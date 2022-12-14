export default async () => {
  const { data } = await axios(
    "https://api-pizza-client.netlify.app/.netlify/functions/server/product?like=true"
  );

  const response = data.filter(({likes}) => { if(likes >= 5) return true })


  return response;
};
