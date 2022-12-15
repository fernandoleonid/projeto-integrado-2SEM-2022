import { api } from '../../api/api.js';

export const getAllProducts = async () => {
  const url = 'produtos';
  const { data } = await api.get(url);

  return data;
};

export const insertPizza = async (pizzaJSON) => {
  const url = 'pizza';
  const { data } = await api.post(url, {
    nome: pizzaJSON.name,
    imagem:
      'https://swiftbr.vteximg.com.br/arquivos/ids/174177-768-768/pizza-artesanal-mussarela-swift-618284-2.jpg?v=637545446363400000',
    tamanho: pizzaJSON.size,
    preco: pizzaJSON.price,
    desconto: pizzaJSON.discount,
    quantidade_vezes_favorito: 0,
    id_tipo_pizza: pizzaJSON.type,
  });

  return data;
};

export const deletePizza = async (pizzaID) => {
  const url = `pizza/${pizzaID}`;
  const { data } = await api.delete(url);

  return data;
}

export const insertDrink = async (drinkJSON) => {
  const url = 'bebida';
  const { data } = await api.post(url, {
    nome: drinkJSON.name,
    imagem:
      'https://s.yimg.com/ny/api/res/1.2/PMq6_sloX7iK.4Upivk88A--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://s.yimg.com/os/creatr-uploaded-images/2021-12/c4a8eb20-5dae-11ec-bffa-10ccbc40f940',
    tamanho: drinkJSON.size,
    preco: drinkJSON.price,
    desconto: drinkJSON.discount,
    id_tipo_bebida: drinkJSON.type,
  });

  return data;
};

export const deleteDrink = async (drinkID) => {
  const url = `bebida/${drinkID}`;
  const { data } = await api.delete(url);

  return data;
}
