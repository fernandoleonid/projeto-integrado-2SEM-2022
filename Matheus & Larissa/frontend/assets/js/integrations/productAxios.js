import { api } from '../api/api.js';

export const getPizzas = async () => {
  const url = 'pizzas';
  const { data } = await api.get(url);

  return data;
};

export const getDrinks = async () => {
  const url = 'bebidas';
  const { data } = await api.get(url);

  return data;
};

export const getProducts = async () => {
  const url = 'produtos';
  const { data } = await api.get(url);

  return data;
};

export const getPizzaById = async (IDpizza) => {
  const url = `pizza/${IDpizza}`;
  const { data } = await api.get(url);

  return data;
};

export const updatePizza = async (idPizza, pizzaJSON) => {
  const url = `pizza/${idPizza}`;
  const { data } = await api.put(url, {
    nome: pizzaJSON.nome,
    imagem:
      'https://swiftbr.vteximg.com.br/arquivos/ids/174177-768-768/pizza-artesanal-mussarela-swift-618284-2.jpg?v=637545446363400000',
    tamanho: pizzaJSON.tamanho,
    preco: pizzaJSON.preco,
    desconto: pizzaJSON.desconto,
    quantidade_vezes_favorito: pizzaJSON.quantidade_vezes_favorito,
    id_tipo_pizza: pizzaJSON.tipo.id,
  });

  return data;
};
