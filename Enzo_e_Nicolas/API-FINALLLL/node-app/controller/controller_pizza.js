/*********************************************************************
 * Objetivo: Arquivo resposnsável manipulacao de recebimento, 
 * tratamento e retorno de dados entre a API e a model
 * Autor: Nicolas Dobbeck
 * Data Criacao: 07/12/2022
 * Versao: 1.0
 *********************************************************************/

//arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config');

//Funcao para gerar um novo aluno
const novaPizza = async function (pizza) {

    //Validacao de campos obrigatórios
    if (pizza.sabor == '' || pizza.sabor == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }   
    else {
        //import da model de pizza
        const novaPizza = require('../model/model_pizza.js');

        //Chama a funcao para inserir nova Pizza
        const resultNovaPizza = await novaPizza.insertPizza(pizza);

        //Verifica se os dados da nova Pizza foi inserido no BD
        if (resultNovaPizza) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

//Funcao para atualizar um registro
const atualizarPizza = async function (pizza) {

    
    //Validaçao para o ID como campo obrigatório
    if (pizza.id == ''|| pizza.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatórios
    else if (pizza.sabor == '' || pizza.sabor == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    else
    {
        //import da model de pizza
        const atualizarPizza = require('../model/model_pizza');

        //chama a funcao para atualizar uma pizza
        const result = await atualizarPizza.updatePizza(pizza);
        
        if (result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//Funcao para excluir um registro de uma Pizza
const excluirPizza = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const pizza = await buscarPizza(id);

        //Valida se foi encontrado um registro valido
        if (pizza)
        {
            //import da model de Pizza
            const excluirPizza = require('../model/model_pizza');
            //chama a funcao para atualizar um funcionario
            const result = await excluirPizza.deletePizza(id);
            
            if (result)
                return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM};
            else
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
        }
    }
}

//Funcao para retornar todos os registros de uma pizza presentes dentro do banco de dados
const listarPizzas = async function () {
    let dadosPizzaJSON = {};

    const { selectAllPizzas } = require ('../model/model_pizza');

    const dadosPizzas = await selectAllPizzas();

    if (dadosPizzas)
    {
        //Criamos uma chave de Pizza no JSON para retornar o array de pizza
        dadosPizzaJSON.pizzas= dadosPizzas;

        return dadosPizzaJSON;
    }
    else
        return false;
}

//Funcao para retornar um registro baseado no ID
const buscarPizza = async function (id) {
    let dadosPizzaJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdPizza } = require ('../model/model_pizza');

        const dadosPizza = await selectByIdPizza(id);

        if (dadosPizza)
        {       
            //Criamos uma chave pizza no JSON para retornar o array de pizza
            dadosPizzaJSON.pizzas = dadosPizza;

            return dadosPizzaJSON;
        }
        else
            return false;
    }
}

module.exports={
    novaPizza,
    atualizarPizza,
    excluirPizza,
    buscarPizza,
    listarPizzas
}