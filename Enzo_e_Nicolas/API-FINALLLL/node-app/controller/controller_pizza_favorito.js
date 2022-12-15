/*********************************************************************
 * Objetivo: Arquivo resposnsável manipulacao de recebimento, 
 * tratamento e retorno de dados entre a API e a model
 * Autor: Enzo Diógenes do Prado
 * Data Criacao: 05/12/2022
 * Versao: 1.0
 *********************************************************************/

//arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config');

//Funcao para gerar um novo aluno
const novaPizzaFavorito= async function (pizzaFavorito) {

    //Validacao de campos obrigatórios
    if (pizzaFavorito.id_pizza == '' || pizzaFavorito.id_pizza == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }    
    
    
    else {
        //import da model de sabor_bebida
        const novaPizzaFavorito = require('../model/model_pizza_favorito.js');

        //Chama a funcao para inserir novo sabor de bebida
        const resultNovaPizzaFavorito = await novaPizzaFavorito.insertPizzaFavorito(pizzaFavorito);

        //Verifica se os dados do novo funcionario foi inserido no BD
        if (resultNovaPizzaFavorito) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

//Funcao para atualizar um registro
const atualizarPizzaFavorito = async function (pizzaFavorito) {

    
    //Validaçao para o ID como campo obrigatório
    if (pizzaFavorito.id == ''|| pizzaFavorito.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatórios
    else if (pizzaFavorito.id_pizza == '' || pizzaFavorito.id_pizza == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }    
    else
    {
        //import da model de sabor bebida
        const atualizarPizzaFavorito = require('../model/model_pizza_favorito.js');

        //chama a funcao para atualizar um bebida
        const result = await atualizarPizzaFavorito.updatePizzaFavorito(pizzaFavorito);
        
        if (result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//Funcao para excluir um registro de sabor bebida
const excluirPizzaFavorito = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const pizzaFavorito= await buscarPizzaFavorita(id);

        //Valida se foi encontrado um registro valido
        if (pizzaFavorito)
        {
            //import da model de sabor bebida
            const excluirPizzaFavorito = require('../model/model_pizza_favorito.js');
            //chama a funcao para atualizar um sabor bebida
            const result = await excluirPizzaFavorito.deletePizzaFavorito(id);
            
            if (result)
                return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM};
            else
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
        }
    }
}

//Funcao para retornar todos os registros de pizzas presentes dentro do banco de dados
const listarPizzasFavoritas = async function () {
    let dadosPizzasFavoritasJSON = {};

    const { selectAllPizzasFavoritos} = require ('../model/model_pizza_favorito.js');

    const dadosPizzasFavoritas = await selectAllPizzasFavoritos();

    if (dadosPizzasFavoritas)
    {
        //Criamos uma chave funcionarios no JSON para retornar o array de funcionarios
        dadosPizzasFavoritasJSON.pizzasFavoritas= dadosPizzasFavoritas;

        return dadosPizzasFavoritasJSON;
    }
    else
        return false;
}



//Funcao para retornar um registro baseado no ID
const buscarPizzaFavorita = async function (id) {
    let dadosPizzaFavoritaJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdPizzaFavorito } = require ('../model/model_pizza_favorito.js');

        const dadosPizzaFavorita = await selectByIdPizzaFavorito(id);

        if (dadosPizzaFavorita)
        {       
            //Criamos uma chave funcionario no JSON para retornar o array de funcionario
            dadosPizzaFavoritaJSON.pizzasFavorita = dadosPizzaFavorita;

            return dadosPizzaFavoritaJSON;
        }
        else
            return false;
    }
}

module.exports={
    novaPizzaFavorito,
    atualizarPizzaFavorito,
    excluirPizzaFavorito,
    listarPizzasFavoritas,
    buscarPizzaFavorita
}