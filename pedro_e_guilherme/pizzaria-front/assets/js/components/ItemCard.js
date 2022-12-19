import { deslike, like } from '../utils/likeUtil.js';

class ItemCard {
  constructor() {
    this.shadow = document.createElement('div');
    this.imageURL = '';
    this.title = '';
    this.ingredients = '';
    this.price = '';
    this.id = '';
  }

  setIngredients(value) {
    this.ingredients = value;
  }

  setId(value) {
    this.id = value;
  }

  setTitle(value) {
    this.title = value;
  }

  setImage(value) {
    this.imageURL = value;
  }

  setPrice(value) {
    this.price = value;
  }

  async handleButton(e) {
    const { id } = e.target;
    const clickStatus = e.target.classList.toggle('liked_button');
    if (clickStatus) await like(id);
    else await deslike(id);
    console.log("liked!");
  }

  connectedCallback() {
    this.shadow.appendChild(this.component());
    this.shadow.appendChild(this.styles());
  }

  component() {
    const card = document.createElement('div');
    card.classList.add('item-card');

    const img = document.createElement('img');
    img.classList.add('item-card__img');
    img.setAttribute('src', this.imageURL);

    const content = document.createElement('div');
    content.classList.add('item-card__text-content');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('item-card__info');

    const title = document.createElement('h3');
    title.classList.add('item-card__title');
    title.textContent = this.title;

    const ingredients = document.createElement('span');
    ingredients.classList.add('item-card__ingredients');
    ingredients.textContent = `${this.ingredients}`;

    const price = document.createElement('div');
    price.classList.add('item-card__price');

    price.innerHTML = `R$${this.price.split('.')[0]},<span class="cents">${
      this.price.split('.')[1]
    }</span>`;

    const likeButton = document.createElement('button');
    likeButton.id = this.id;
    likeButton.classList.add('item-card__likeButton');
    likeButton.onclick = this.handleButton;

    const infoGroup = document.createElement('div');

    infoGroup.appendChild(title);
    infoGroup.appendChild(ingredients);
    content.appendChild(infoGroup);
    content.appendChild(likeButton);

    infoDiv.appendChild(img);
    infoDiv.appendChild(content);

    card.appendChild(infoDiv);
    card.appendChild(price);

    return card;
  }

  // eslint-disable-next-line class-methods-use-this
  styles() {
    const styles = document.createElement('style');
    styles.textContent = `
      .item-card {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        width: 250px;
        height: 350px;
        color: white;
        background-color: #3A3A3C;
        text-align: left;
        border-radius: 8px;
      }

      .item-card__img {
        height: 130px;
        width : 100%;
        background-size: cover;
        object-fit: cover;
        background-position: center;
        border-radius: 8px;
      }

      .item-card__info {
        width: 100%;
      }

      .item-card__text-content {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
      }

      .item-card__title {
        margin-bottom: 2px;
        margin-top: 8px;
        text-transform: capitalize;
        gap: 0px;
        font-size: 1.5rem;
        align-self: flex-start;
      } 

      .item-card__ingredients {
        color: #AEAEB0;
        align-self: flex-start;
        font-size: 1rem;
        font-weight: 400;
      }

      .item-card__likeButton {
        border: none;
        margin-top: 8px;
        justify-self: end;
        width: 40px;
        height: 35px;
        background: url(assets/img/like.svg);
        background-position: center;
        background-repeat: no-repeat;
      }
      
      .liked_button {
        background: url(assets/img/like_full.svg);
        filter: drop-shadow(0px 0px 5px #F9C739);
        background-position: center;
        background-repeat: no-repeat;
      }

      .item-card__price {
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F9C739;
        border-radius: 50px;

        font-size: 2rem;
        font-weight: 700;
        color: #000000;
      }

      .cents {
        font-size: 28px;
        transform: translateY(1px);
      }
    `;

    return styles;
  }
}

export { ItemCard };
