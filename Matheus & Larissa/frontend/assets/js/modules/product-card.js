import { getPizzaById, updatePizza } from '../integrations/productAxios.js';

class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.productPhoto = '';
    this.productName = '';
    this.productPrice = '';
    this.productType = '';
    this.id_produto = '';
  }

  connectedCallback() {
    this.shadow.appendChild(this.styles());
    this.shadow.appendChild(this.component());
  }

  static get observedAttributes() {
    return ['photo', 'name', 'price', 'type', 'id_produto'];
  }

  attributeChangedCallback(attribName, oldValue, newValue) {
    if (attribName === 'photo') this.productPhoto = newValue;
    if (attribName === 'name') this.productName = newValue;
    if (attribName === 'price') this.productPrice = newValue;
    if (attribName === 'type') this.productType = newValue;
    if (attribName === 'id_produto') this.id_produto = newValue;
  }

  styles() {
    const styles = document.createElement('style');

    styles.textContent = `

    .item-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--yellow-700);
      height: 22.5rem;
      border-radius: 20px;
      overflow: hidden;
      width: 260px;
      height: 360px;
    }
    
    .card-content-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1rem;
      font-size: 2rem;
    }

    .card-image {
      height: 188px;
      width: 100%;
    }

    .card-upper-content {
      display: flex;
      gap: 10px;
    }
    
    .product-name,
    .favorite-button,
    .card-price,
    .price-cents {
      color: var(--white-500);
      text-shadow: 0 0 2px var(--black-500);
    }
    
    .product-name,
    .card-price,
    .price-cents {
      font-weight: 700;
    }
    
    .product-name {
      font-size: 2rem;
      text-transform: capitalize;
      text-align: center;
    }
    
    .card-price {
      font-size: 4rem;
    }
    
    .price-cents {
      font-size: 1.5rem;
      position: absolute;
    }
    
    .card-price,
    .price-cents {
      transform: translateX(-10px);
    }
    
    .favorite-button {
      cursor: pointer;
      height: 2rem;
    }
    `;

    return styles;
  }

  component() {
    const cardElement = document.createElement('div');
    cardElement.classList.add('item-card');

    const photo = document.createElement('img');
    photo.src = this.productPhoto;
    photo.classList.add('card-image');
    if (this.productType === 'pizza') photo.alt = 'Imagem de uma Pizza';
    if (this.productType === 'bebida') photo.alt = 'Imagem de uma bebida';

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('card-content-container');

    const upperContentContainer = document.createElement('div');
    upperContentContainer.classList.add('card-upper-content');

    const name = document.createElement('span');
    name.classList.add('product-name');
    name.textContent = this.productName;

    const favoriteButton = document.createElement('img');
    favoriteButton.src = './assets/svg/heart-regular.svg';
    favoriteButton.classList.add('favorite-button');
    favoriteButton.id = 'favorite-button';

    favoriteButton.addEventListener('click', async (e) => {
      if (e.target.src.includes('regular')) {
        e.target.src = './assets/svg/heart-solid.svg';
        const productID = this.id_produto;
        const { pizzas } = await getPizzaById(productID);
        pizzas.quantidade_vezes_favorito = pizzas.quantidade_vezes_favorito + 1;
        await updatePizza(pizzas.id, pizzas);
      } else if (e.target.src.includes('solid')) {
        e.target.src = './assets/svg/heart-regular.svg';
        const productID = this.id_produto;
        const { pizzas } = await getPizzaById(productID);
        pizzas.quantidade_vezes_favorito = pizzas.quantidade_vezes_favorito - 1;
        await updatePizza(pizzas.id, pizzas);
      }
    });

    upperContentContainer.appendChild(name);
    upperContentContainer.appendChild(favoriteButton);

    const price = document.createElement('span');
    price.classList.add('card-price');
    let priceContent = this.productPrice.split('.');
    price.textContent = `R$ ${priceContent[0]},`;

    const priceCents = document.createElement('span');
    priceCents.classList.add('price-cents');
    priceCents.textContent = priceContent[1];

    price.appendChild(priceCents);

    contentContainer.appendChild(upperContentContainer);
    contentContainer.appendChild(price);

    cardElement.appendChild(photo);
    cardElement.appendChild(contentContainer);

    return cardElement;
  }
}

customElements.define('product-card', ProductCard);
