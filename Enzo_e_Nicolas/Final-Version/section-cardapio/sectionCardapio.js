'use strict'

import './card-cardapio.js'

 export const fetchCardPizza = async function () {
    const url = `http://40.121.135.142:3000/v1/pizzaComponentes` 
    const response = await fetch(url);
    const data = await response.json()

     return data
 }

export const fetchBebidas = async function () {
    const url = `http://40.121.135.142:3000/v1/bebida` 
    const response = await fetch(url);
    const data = await response.json()

    return data
}


const {pizzaComponentes}  = await fetchCardPizza();

console.log(pizzaComponentes)

const { bebidas } = await fetchBebidas();
console.log(bebidas)
const container = document.querySelector('.grid-traditional')


const criaBebida = () => {
    bebidas.forEach(bebida => {
        const cardPizza = document.createElement('card-pizza')
        cardPizza.setAttribute('nome', `${bebida.tipo} de ${bebida.sabor} ${bebida.volume}`);
        cardPizza.setAttribute('descricao', bebida.marca);
        cardPizza.setAttribute('preco1', `R$${bebida.preco.toFixed(2).replace('.', ',')}`)
        container.appendChild(cardPizza)
    })
}

criaBebida();

pizzaComponentes.forEach(pizza => {
    const cardPizza = document.createElement('card-pizza')
    cardPizza.setAttribute('nome', pizza.sabor)
    cardPizza.setAttribute('descricao', pizza.ingredients.join(', '))
    
    cardPizza.setAttribute('preco', `R$${pizza.informacoes.preco.toFixed()}`);
    // cardPizza.setAttribute('preco2', item.preco2)
    // cardPizza.setAttribute('preco3', item.preco3)
    cardPizza.setAttribute('tamanho', pizza.informacoes.tamanho[0]);
    // cardPizza.setAttribute('Medio', item.tamanho)
    // cardPizza.setAttribute('Grande', item.tamanho)
    container.appendChild(cardPizza)
});

