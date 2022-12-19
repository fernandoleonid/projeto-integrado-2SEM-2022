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
const novoIngrediente = async function (ingrediente) {

    //Validacao de campos obrigatórios
    if (ingrediente.ingrediente == '' || ingrediente.ingrediente == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }   
    else {
        //import da model de pizza
        const novoIngrediente = require('../model/model_ingredientes.js');

        //Chama a funcao para inserir nova Pizza
        const resultNovoIngrediente = await novoIngrediente.insertIngrediente(ingrediente);

        //Verifica se os dados da nova Pizza foi inserido no BD
        if (resultNovoIngrediente) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

//Funcao para atualizar um registro
const atualizarIngrediente = async function (ingrediente) {

    
    //Validaçao para o ID como campo obrigatório
    if (ingrediente.id == ''|| ingrediente.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatórios
    else if (ingrediente.ingrediente == '' || ingrediente.ingrediente == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    else
    {
        //import da model de pizza
        const atualizarIngrediente = require('../model/model_ingredientes.js');

        //chama a funcao para atualizar uma pizza
        const result = await atualizarIngrediente.updateIngrediente(ingrediente);
        
        if (result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//Funcao para excluir um registro de uma Pizza
const excluirIngrediente = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const ingrediente = await buscarIngrediente(id);

        //Valida se foi encontrado um registro valido
        if (ingrediente)
        {
            //import da model de Pizza
            const excluirIngrediente = require('../model/model_ingredientes');
            //chama a funcao para atualizar um funcionario
            const result = await excluirIngrediente.deleteIngrediente(id);
            
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
const listarIngrediente = async function () {
    let dadosIngredienteJSON = {};

    const { selectAllIngredientes } = require ('../model/model_ingredientes');

    const dadosIngredientes = await selectAllIngredientes();

    if (dadosIngredientes)
    {
        //Criamos uma chave de Pizza no JSON para retornar o array de pizza
        dadosIngredienteJSON.pizzas= dadosIngredientes;

        return dadosIngredienteJSON;
    }
    else
        return false;
}

//Funcao para retornar um registro baseado no ID
const buscarIngrediente = async function (id) {
    let dadosIngredienteJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdIngredientes } = require ('../model/model_ingredientes');

        const dadosIngrediente = await selectByIdIngredientes(id);

        if (dadosIngrediente)
        {       
            //Criamos uma chave pizza no JSON para retornar o array de pizza
            dadosIngredienteJSON.ingrediente = dadosIngrediente;

            return dadosIngredienteJSON;
        }
        else
            return false;
    }
}

module.exports={
    novoIngrediente,
    atualizarIngrediente,
    excluirIngrediente,
    listarIngrediente,
    buscarIngrediente
}