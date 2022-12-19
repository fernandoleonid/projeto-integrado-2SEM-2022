class CardPizza extends HTMLElement{
    constructor(){
        //Sem este componente os metodos declarados lá 
        //em cima nao serao puxados (obrigatório)
        super();
        //componentes do card
        this.shadow = this.attachShadow({mode: 'open'});
        this.nome = 'Nome da pizza'
        this.descricao = 'Descricao da pizza'
        this.preco = ''
        this.preco2 = ''
        this.preco3 = ''
        this.tamanho = ''
        this.tamanhoMedio = ''
        this.tamanhoGrande = ''
        this.bgcolor = '#EBE7DB'
    }

    static get observedAttributes(){
        return ['nome', 'descricao', 'tamanho', 'preco', 'preco2', 'preco3', 'bgcolor', 'id']
    }

    attributeChangedCallback(nameAttr, oldValue, newValue){
        
        if (nameAttr === 'nome') {
            this.nome = newValue
        }else if(nameAttr === 'descricao'){
            this.descricao = newValue
        }else if(nameAttr === 'preco'){
            this.preco = newValue
        }else if(nameAttr === 'preco2'){
            this.preco2 = newValue
        }else if(nameAttr === 'preco3'){
            this.preco3 = newValue
        }else if(nameAttr === 'bgcolor'){
            this.bgcolor = newValue
        }else if(nameAttr === 'tamanho'){
            this.tamanho = newValue
        }
    }

    connectedCallback(){
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    styles(){
        const style = document.createElement('style')
        style.textContent =  
        `
        .card{
            display: flex;
            height: 150px;
            width: 600px;
            background-color: ${this.bgcolor};
            padding: 10px;
            border-radius:12px;
            gap: 15px;
            align-items: center;
            margin-left: 40px;
            padding-left: 25px;
        }
        
        .text__pizza{
            display: flex;
            flex-direction: column;
            width: 400px;
        }
        
        .title__pizza{
            font-family: 'Inter', sans-serif;
            text-transform: capitalize;
            font-weight: 400;
            font-size: 20px;
        }
        
        .descr__pizza{
            font-family: 'Inter', sans-serif;
            font-weight: 200;
        }
        
        .price__pizza{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            font-family: 'Inter', sans-serif;
        }
           
        `
        return style
    }

    component(){
        const card = document.createElement('div')
        card.classList.add('card-pizza')

        card.innerHTML = `
        <div class="card">
            <div class="text__pizza">
                <span class="title__pizza">${this.nome}</span>
                <span class="descr__pizza">${this.descricao}</span>
            </div>
            <div class="price__pizza">
                <span>${this.tamanho} - ${this.preco}</span>
            </div>
        </div>
        `
        return card
    }
}

//Para a web entender esse componente
customElements.define('card-pizza', CardPizza)