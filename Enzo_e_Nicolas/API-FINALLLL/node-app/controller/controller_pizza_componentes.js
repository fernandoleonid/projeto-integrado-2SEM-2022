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
const novoPizzaComponentes = async function (pizzaComponentes) {

    //Validacao de campos obrigatórios
    if (pizzaComponentes.id_ingredientes_pizza == '' || pizzaComponentes.id_ingredientes_pizza == undefined || pizzaComponentes.id_pizza == '' || pizzaComponentes.id_pizza == undefined || pizzaComponentes.id_tamanho_pizza == '' || pizzaComponentes.id_tamanho_pizza == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }    
    
    
    else {
        //import da model de sabor_bebida
        const novoPizzaComponentes = require('../model/model_pizza_componentes.js');

        //Chama a funcao para inserir novo sabor de bebida
        const resultNovoPizzaComponentes = await novoPizzaComponentes.insertPizzaComponentes(pizzaComponentes);

        //Verifica se os dados do novo funcionario foi inserido no BD
        if (resultNovoPizzaComponentes) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

//Funcao para atualizar um registro
const atualizarPizzaComponentes = async function (pizzaComponentes) {

    
    //Validaçao para o ID como campo obrigatório
    if (pizzaComponentes.id == ''|| pizzaComponentes.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatórios
    else if (pizzaComponentes.id_ingredientes_pizza == '' || pizzaComponentes.id_ingredientes_pizza == undefined || pizzaComponentes.id_pizza == '' || pizzaComponentes.id_pizza == undefined || pizzaComponentes.id_tamanho_pizza == '' || pizzaComponentes.id_tamanho_pizza == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }    
    else
    {
        //import da model de sabor bebida
        const atualizarPizzaComponentes = require('../model/model_tipo_bebida.js');

        //chama a funcao para atualizar um bebida
        const result = await atualizarPizzaComponentes.updatePizzaComponentes(pizzaComponentes);
        
        if (result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//Funcao para excluir um registro de sabor bebida
const excluirPizzaComponentes = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const pizzaComponentes = await buscarPizzaComponentes(id);

        //Valida se foi encontrado um registro valido
        if (pizzaComponentes)
        {
            //import da model de sabor bebida
            const excluirPizzaComponentes = require('../model/model_pizza_componentes.js');
            //chama a funcao para atualizar um sabor bebida
            const result = await excluirPizzaComponentes.deletePizzaComponentes(id);
            
            if (result)
                return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM};
            else
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
        }
    }
}

//Funcao para retornar todos os registros de sabores de bebidas presentes dentro do banco de dados
const listarPizzaComponentes = async function () {
    let dadosPizzaComponentesJSON = {};

    const { selectAllPizzasComponentes } = require ('../model/model_pizza_componentes.js');

    const dadosPizzaComponentes = await selectAllPizzasComponentes();

    if (dadosPizzaComponentes)
    {
        //Criamos uma chave funcionarios no JSON para retornar o array de funcionarios
        dadosPizzaComponentesJSON.pizzaComponentes= dadosPizzaComponentes;

        return dadosPizzaComponentesJSON;
    }
    else
        return false;
}



//Funcao para retornar um registro baseado no ID
const buscarPizzaComponentes = async function (id) {
    let dadosPizzaComponentesJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdPizzaComponentes} = require ('../model/model_pizza_componentes.js');

        const dadosPizzaComponentes = await selectByIdPizzaComponentes(id);

        if (dadosPizzaComponentes)
        {       
            //Criamos uma chave funcionario no JSON para retornar o array de funcionario
            dadosPizzaComponentesJSON.pizzaComponentes = dadosPizzaComponentes;

            return dadosPizzaComponentesJSON;
        }
        else
            return false;
    }
}

module.exports={
    novoPizzaComponentes,
    atualizarPizzaComponentes,
    excluirPizzaComponentes,
    listarPizzaComponentes,
    buscarPizzaComponentes
}