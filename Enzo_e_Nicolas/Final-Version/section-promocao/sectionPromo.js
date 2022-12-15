'use strict'

import './card-promo.js'
import { fetchCardPizza } from '../section-cardapio/sectionCardapio.js'

const {pizzaComponentes} = await fetchCardPizza(); 

const container = document.querySelector('.container-cards')

export const fetchPizzaByID = async function (id) {
    const url = `http://40.121.135.142:3000/v1/pizza/${id}` 
    const response = await fetch(url);
    const data = await response.json()

     return data
 }

pizzaComponentes.forEach(pizza => {
    
    const card = document.createElement('card-promocoes')

    const {pizzas} = fetchPizzaByID(pizza.pizzaID)

    

    card.setAttribute('nome', pizza.sabor)
    card.setAttribute('descricao', pizza.ingredients.join(', '))
    // card.setAttribute('imagem', pizzas.imagem)
        card.setAttribute('preco',`R$${pizza.informacoes.preco.toFixed(2)}`)

    container.appendChild(card)
});