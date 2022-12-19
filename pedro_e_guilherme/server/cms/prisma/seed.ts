import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// tipos de bebidas
const createDrinkTypes = async () => {
  await db.drink_type.createMany({
    data: [
      { name: "Refrigerante" },
      { name: "Chá" },
      { name: "Suco" },
      { name: "Agua" },
      { name: "Alcoolico" },
    ],
  });
};

// createDrinkTypes();

// tipos de pizzas
const createPizzaTypes = async () => {
  await db.pizza_type.createMany({
    data: [
      { name: "Broto", dimensions: "20x20" },
      { name: "Media", dimensions: "30x30" },
      { name: "Grande", dimensions: "40x40" },
      { name: "Familia", dimensions: "50x50" },
    ],
  });
};

// createPizzaTypes();

const createUsers = async () => {
  await db.user.createMany({
    data: [
      {
        name: "Guilherme Joviniano de Sousa",
        email: "00drpixelss@gmail.com",
        password: "1234",
        cellphone: "11985350197",
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/senai-pizzaria.appspot.com/o/1669297933575.jpeg?alt=media&token=c0235299-e078-40b1-ab39-e0a758761e96",
        isAdmin: true,
      },
      {
        name: "Pedro Henrique Vieira",
        email: "pedrovs3@gmail.com",
        password: "1234",
        cellphone: "1198718938",
        profile_picture:
          "https://firebasestorage.googleapis.com/v0/b/senai-pizzaria.appspot.com/o/1669297933575.jpeg?alt=media&token=c0235299-e078-40b1-ab39-e0a758761e96",
        isAdmin: true,
      },
    ],
  });
};

// createUsers();

const createProducts = async () => {
  await db.product.createMany({
    data: [
      { created_by: 1, price: 30.99, name: "4 queijos grande", likes: 1 },
      { created_by: 2, price: 25.99, name: "calabresa media", likes: 20 },
      { created_by: 1, price: 7.99, name: "Dolly", likes: 5 },
      { created_by: 2, price: 10.99, name: "Coca-Cola", likes: 2 },
      { created_by: 2, price: 35.99, name: "2 queijos Familia", likes: 30 },
    ],
  });
};

// createProducts()

const createStuffings = async () => {
  await db.stuffing.createMany({
    data: [{ name: "4 queijos" }, { name: "calabresa" }, { name: "2 queijos" }],
  });
};

// createStuffings();

const createIngredients = async () => {
  await db.tbl_ingredient.createMany({
    data: [
      { name: "queijo" },
      { name: "calabresa" },
      { name: "fermento em pó" },
    ],
  });
};

// createIngredients();

const createPizzas = async () => {
  await db.pizza.createMany({
    data: [
      { product_id: 1, pizza_type_id: 3 },
      { product_id: 2, pizza_type_id: 2 },
      { product_id: 5, pizza_type_id: 4 },
    ],
  });
};

// createPizzas()

const createPizzaWithStuffing = async () => {
  await db.pizza_stuffing.createMany({
    data: [
      { pizza_id: 1, stuffing_id: 1 },
      { pizza_id: 2, stuffing_id: 2 },
      { pizza_id: 3, stuffing_id: 3 },
    ],
  });
};

// createPizzaWithStuffing();

const createPizzaWithIngredients = async () => {
  await db.pizza_ingredient.createMany({
    data: [
      { pizza_id: 1, ingredient_id: 1 },
      { pizza_id: 2, ingredient_id: 2 },
      { pizza_id: 3, ingredient_id: 1 },
      { pizza_id: 1, ingredient_id: 3 },
      { pizza_id: 2, ingredient_id: 3 },
      { pizza_id: 3, ingredient_id: 3 },
    ],
  });
};

// createPizzaWithIngredients();

const createDrinks = async () => {
  await db.drink.createMany({
    data: [
      { product_id: 3, volume: 2000, drink_type_id: 1 },
      { product_id: 4, volume: 1000, drink_type_id: 1 },
    ],
  });
};

// createDrinks()

const createPictures = async () => {
  await db.picture.createMany({
    data: [
      {
        picture_link:
          "https://www.receitasnestle.com.br/sites/default/files/srh_recipes/31604646755f78882c27872c877d9ea5.jpg",
      },
      {
        picture_link:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREuAHsQY2RnWoZd31iCYkEcX4T-rBijynygQ&usqp=CAU",
      },
      {
        picture_link:
          "https://www.receitasnestle.com.br/sites/default/files/srh_recipes/d036cd01122da62bf581784f52d99b3a.jpg",
      },
      {
        picture_link:
          "https://trimais.vteximg.com.br/arquivos/ids/1027694-1000-1000/foto_original.jpg?v=637686859357000000",
      },
      {
        picture_link:
          "https://a-static.mlcdn.com.br/800x560/dolly-guarana-2l/adegareisdeouro/e6a185a864c911ecb4f84201ac18503a/ea6ba86711b2ae90de185e0022e8ca09.jpeg",
      },
    ],
  });
};

// createPictures();

const createProductsWithPictures = async () => {
  await db.tbl_product_pictures.createMany({
    data: [
      { picture_id: 1, product_id: 2 },
      { picture_id: 2, product_id: 5 },
      { picture_id: 3, product_id: 1 },
      { picture_id: 4, product_id: 4 },
      { picture_id: 5, product_id: 3 },
    ],
  });
};

// createProductsWithPictures()

const createSaleOffProducts = async () => {
  await db.sale_off_products.createMany({
    data: [
      { product_id: 2, off_value: 15 },
      { product_id: 1, off_value: 20 },
    ],
  });
};

// createSaleOffProducts();

const createMessages = async () => {
  await db.message.createMany({
    data: [
      {
        cellphone: "11985350196",
        content: "Gosto Bastante Das Pizzas daqui!!",
        critica: false,
        email: "ronaldo@gmail.com",
        phone: "36863796",
        name: "Ronaldo",
      },
      {
        cellphone: "11985350196",
        content: "Pizza de calabresa muito mal feita!!!!",
        critica: true,
        email: "cleber@gmail.com",
        phone: "36863796",
        name: "cleber",
      },
    ],
  });
};

// createMessages();
