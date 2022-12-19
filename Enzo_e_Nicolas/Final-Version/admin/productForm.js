const selectProductType = document.querySelector(".select-product");
const formLocal = document.querySelector(".form-dynamic");

const button = document.querySelector(".button");

const URL = "http://40.121.135.142:3000/v1/";

const getIngredients = async () => {
  const { data } = await axios(URL + "ingredientes");
  return data.pizzas;
};

const getSaborPizza = async () => {
  const { data } = await axios(URL + "pizzas");
  return data.pizzas;
};
const getTamanho = async () => {
  const { data } = await axios(URL + "tamanhoPizzas");

  return data.tamanho;
};

const getSaborBebida = async () => {
  const { data } = await axios(URL + "saboresBebidas");

  console.log(data);

  return data.saboresBebidas;
};

const getTipoBebida = async () => {
  const { data } = await axios(URL + "tiposBebidas");

  return data.tiposBebidas;
};

const renderIngredientInputs = (data) => {
  const holder = document.querySelector("#ingredient__holder");
  const input = `<input class="checkBoxIngredient" type="checkbox" id="${data.id}" name="${data.ingrediente}">
    <label for="${data.id}">${data.ingrediente}</label>`;

  holder.innerHTML += input;
};

const renderPizzaSabores = (data) => {
  const holder = document.querySelector("#sabores__holder");

  const option = `<option value="${data.id}">${data.sabor}</option>`;

  holder.innerHTML += option;
};

const renderTamanho = (data) => {
  const holder = document.querySelector("#tamanho__holder");

  const option = `<option value="${data.id}">${data.tamanho}</option>`;

  holder.innerHTML += option;
};

const renderSaborBebida = (data) => {
  const holder = document.querySelector("#holder__sabores__bebidas");

  const option = `<option value="${data.id}">${data.sabor}</option>`;

  holder.innerHTML += option;
};

const renderTiposBebida = (data) => {
  const holder = document.querySelector("#holder__tipo");

  const option = `<option value="${data.id}">${data.tipo}</option>`;

  holder.innerHTML += option;
};

const renderFormPizza = async () => {
  formLocal.innerHTML = ` 
  
  <label for="">Sabor</label>
    <select class="input" id="sabores__holder">
        
    </select>

    <label for="">Ingredients:</label> 
    <div class="input" id="ingredient__holder">
    </div>
    
    <label for="">Tamanho:</label> 
    <select class="input" id="tamanho__holder"></select>
    
    <label for="">Desconto:</label> 
    <div class="input">
        <input id="desconto" name="senha" type="number" placeholder="Desconto %">
    </div>
</div>
<div class="image">
    <label class="picture" for="picture__input" tabIndex="0">
        <span class="picture__image">
            <i class="fa-light fa-plus fa-10x"></i>
        </span>
    </label>
    <input type="file" name="picture__input" id="picture__input">
</div>`;

  const ingredientes = await getIngredients();
  const sabores = await getSaborPizza();
  const tamanhos = await getTamanho();

  ingredientes.forEach((item) => renderIngredientInputs(item));

  sabores.forEach((item) => renderPizzaSabores(item));

  tamanhos.forEach((item) => renderTamanho(item));
};

const renderFormBebida = async () => {
  formLocal.innerHTML = ` 
    <label for="">Tipo </label>
    <select class="input" id="holder__tipo">

    </select>

    <label for="">Sabores </label>
    <select class="input" id="holder__sabores__bebidas">
        
    </select>

    <label for="">Marca:</label> 
    <select class="input" id="holder__marcas">
        <option id="marca" value="1" type="text" placeholder="marca">Del Vale</option>
        <option id="marca" value="2" type="text" placeholder="marca">La Pizzaria</option>
        <option id="marca" value="3" type="text" placeholder="marca">Fanta</option>
        <option id="marca" value="4" type="text" placeholder="marca">Coca-Cola</option>
        <option id="marca" value="5" type="text" placeholder="marca">Tubaina</option>
        <option id="marca" value="6" type="text" placeholder="marca">Dolly</option>        
    </select>

    <label for="">Volume:</label> 
    <div class="input">
        <input id="volume" name="volume" type="number" placeholder="Volume">
    </div>

    <label for="">Preço:</label> 
    <div class="input">
        <input id="preco" name="preco" type="number" placeholder="Preço">
    </div>

    <label for="">Desconto:</label> 
    <div class="input">
        <input id="desconto" name="desconto" type="number" placeholder="Desconto %">
    </div>
</div>
<div class="image">
    <label class="picture" for="picture__input" tabIndex="0">
        <span class="picture__image">
            <i class="fa-light fa-plus fa-10x"></i>
        </span>
    </label>
    <input type="file" name="picture__input" id="picture__input">
</div>`;

  const sabores = await getSaborBebida();
  const tipos = await getTipoBebida();

  sabores.forEach((item) => {
    renderSaborBebida(item);
  });

  tipos.forEach((item) => renderTiposBebida(item));
};

selectProductType.addEventListener("change", ({ target }) => {
  if (target.value === "pizza") {
    renderFormPizza();
  } else {
    renderFormBebida();
  }
});

const getAllSelectedIngredients = (nodeList) => {
  const inputs = nodeList.filter((input) => {
    if (input.checked) return true;
  });
  return inputs;
};

const sendPizza = async () => {
  const selectSabor = document.querySelector("#sabores__holder");
  const selectTamanho = document.querySelector("#tamanho__holder");
  const ingredients = getAllSelectedIngredients(
    Array.from(document.querySelectorAll(".checkBoxIngredient"))
  );
  const idsIngredient = ingredients.map(({ id }) => id);
  const desconto = document.querySelector("#desconto");

  const data = {
    id_pizza: selectSabor.value,
    id_tamanho_pizza: selectTamanho.value,
    id_ingredientes_pizza: [...idsIngredient],
  };

  console.log(desconto.value);

  if (desconto.value != "") {
    await axios.post(URL + "pizzaPromocao", {
      id_pizza: selectSabor.value,
      preco: desconto.value,
    });
  }

  const res = await axios.post(URL + "pizzaComponentes", data);

  console.log(res);
};

const sendBebida = async () => {
  const marca = document.querySelector("#holder__marcas");
  const tipo = document.querySelector("#holder__tipo");
  const sabor = document.querySelector("#holder__sabores__bebidas");
  const desconto = document.querySelector("#desconto");
  const volume = document.querySelector("#volume");
  const preco = document.querySelector("#preco");

  const data = {
    id_marca_bebida: marca.value,
    id_sabor_bebida: sabor.value,
    id_tipo_bebida: tipo.value,
    volume: volume.value + "ml",
    preco: preco.value,
  };

  console.log(data);

  if (desconto.value != "") {
      await axios.post(URL + "bebidaPromocao", {
        id_bebida: 1231,
        preco: desconto.value,
      });
    }

  const res = await axios.post(URL + "bebida", data);

  console.log(res);
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(selectProductType.value);
  if (selectProductType.value == "pizza") {
    sendPizza();
  } else {
    sendBebida();
  }
});
