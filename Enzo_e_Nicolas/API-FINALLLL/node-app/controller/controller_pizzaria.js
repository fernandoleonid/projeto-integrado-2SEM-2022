/*********************************************************************
 * Objetivo: Arquivo resposnsável manipulacao de recebimento, 
 * tratamento e retorno de dados entre a API e a model
 * Autor: Nicolas Dobbeck
 * Data Criacao: 05/12/2022
 * Versao: 1.0
 *********************************************************************/

//arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config');

//Funcao para gerar uma nova pizzaria
const novaPizzaria = async function (pizzaria) {

    //Validacao de campos obrigatórios
    if (pizzaria.nome == '' || pizzaria.nome == undefined || pizzaria.rua == '' || pizzaria.rua == undefined || pizzaria.bairro == '' || pizzaria.bairro == undefined || pizzaria.cep == '' || pizzaria.cep == undefined || pizzaria.cidade == '' || pizzaria.cidade == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }

    //Validacao para verificar email válido    
    else if (!pizzaria.email.includes('@'))
        return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL };
    else {
        //import da model de pizzaria
        const novaPizzaria = require('../model/model_pizzaria');

        //Chama a funcao para inserir uma nova pizzaria
        const resultNovaPizzaria = await novaPizzaria.insertPizzaria(pizzaria);

        //Verifica se os dados do novo funcionario foi inserido no BD
        if (resultNovaPizzaria) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM };
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

//Funcao para atualizar um registro
const atualizarPizzaria = async function (pizzaria) {


    //Validaçao para o ID como campo obrigatório
    if (pizzaria.id == '' || pizzaria.id == undefined)
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    //Validacao de campos obrigatórios
    else if (pizzaria.nome == '' || pizzaria.nome == undefined || pizzaria.rua == '' || pizzaria.rua == undefined || pizzaria.bairro == '' || pizzaria.bairro == undefined || pizzaria.cep == '' || pizzaria.cep == undefined || pizzaria.cidade == '' || pizzaria.cidade == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }
    //Validacao para verificar email válido    
    else if (!pizzaria.email.includes('@'))
        return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL };
    else {
        //import da model de pizzaria
        const atualizarPizzaria = require('../model/model_pizzaria');

        //chama a funcao para atualizar uma pizzaria
        const result = await atualizarPizzaria.updatePizzaria(pizzaria);

        if (result)
            return { status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM };
        else
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
    }
}

//Funcao para excluir um registro de pizzaria
const excluirPizzaria = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == '' || id == undefined)
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    else {
        //Validaçao para verificar se ID existe no BD
        const pizzaria = await buscarPizzaria(id);

        //Valida se foi encontrado um registro valido
        if (pizzaria) {
            //import da model de funcionario
            const excluirPizzaria = require('../model/model_pizzaria');
            //chama a funcao para atualizar um funcionario
            const result = await excluirPizzaria.deletePizzaria(id);

            if (result)
                return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM };
            else
                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };
        }
    }
}

//Funcao para retornar todos os registros de sabores de bebidas presentes dentro do banco de dados
const listarPizzarias = async function () {
    let dadosPizzariasJSON = {};

    const { selectAllPizzarias } = require('../model/model_pizzaria');

    const dadosPizzarias = await selectAllPizzarias();

    if (dadosPizzarias) {
        //Criamos uma chave funcionarios no JSON para retornar o array de funcionarios
        dadosPizzariasJSON.saboresBebidas = dadosPizzarias;

        return dadosPizzariasJSON;
    }
    else
        return false;
}


//Funcao para retornar um registro baseado no ID
const buscarPizzaria = async function (id) {
    let dadosPizzariaJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == '' || id == undefined)
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    else {

        const { selectByIdPizzaria } = require('../model/model_pizzaria');

        const dadosPizzaria = await selectByIdPizzaria(id);

        if (dadosPizzaria) {
            //Criamos uma chave pizzaria no JSON para retornar o array de funcionario
            dadosPizzariaJSON.pizzaria = dadosPizzaria;

            return dadosPizzariaJSON;
        }
        else
            return false;
    }
}

module.exports = {
    novaPizzaria,
    atualizarPizzaria,
    excluirPizzaria,
    listarPizzarias,
    buscarPizzaria
}