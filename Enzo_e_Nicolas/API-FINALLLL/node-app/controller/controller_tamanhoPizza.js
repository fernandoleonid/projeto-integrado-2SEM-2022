/*********************************************************************
 * Objetivo: Arquivo resposnsável manipulacao de recebimento, 
 * tratamento e retorno de dados entre a API e a model
 * Autor: Nicolas Dobbeck
 * Data Criacao: 05/12/2022
 * Versao: 1.0
 *********************************************************************/

//arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config');

//Funcao para gerar um novo tamanho de pizza
const novoTamanhoPizza = async function (tamanhoPizza) {

    //Validacao de campos obrigatórios
    if (tamanhoPizza.tamanho == '' || tamanhoPizza.tamanho == undefined || tamanhoPizza.preco == '' || tamanhoPizza.preco == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }    
    else {
        //import da model de tamanhoPizza
        const novoTamanhoPizza = require('../model/model_tamanhoPizza.js');

        //Chama a funcao para inserir novo tamanho
        const resultNovoTamanhoPizza = await novoTamanhoPizza.insertTamanhoPizza(tamanhoPizza);

        //Verifica se os dados do novo tamanho foi inserido no BD
        if (resultNovoTamanhoPizza) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

//Funcao para atualizar um registro
const atualizarTamanhoPizza = async function (tamanhoPizza) {

    
    //Validaçao para o ID como campo obrigatório
    if (tamanhoPizza.id == ''|| tamanhoPizza.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatórios
    else if (tamanhoPizza.tamanho == '' || tamanhoPizza.tamanho == undefined || tamanhoPizza.preco == '' || tamanhoPizza.preco == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    else
    {
        //import da model de tamanho
        const atualizarTamanhoPizza = require('../model/model_tamanhoPizza.js');

        //chama a funcao para atualizar um tamanho
        const result = await atualizarTamanhoPizza.updateTamanhoPizza(tamanhoPizza);
        
        if (result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//Funcao para excluir um registro de Tamanho
const excluirTamanhoPizza = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const tamanho = await buscarTamanhoPizza(id);

        //Valida se foi encontrado um registro valido
        if (tamanho)
        {
            //import da model de tamanho
            const excluirTamanhoPizza = require('../model/model_tamanhoPizza.js');
            //chama a funcao para atualizar um tamanho
            const result = await excluirTamanhoPizza.deleteTamanhoPizza(id);
            
            if (result)
                return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM};
            else
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
        }
    }
}

//Funcao para retornar todos os registros de tamanho presentes dentro do banco de dados
const listarTamanhosPizza = async function () {
    let dadosTamanhosJSON = {};

    const { selectAllTamanhoPizza } = require ('../model/model_tamanhoPizza.js');

    const dadosTamanhosPizza = await selectAllTamanhoPizza();

    if (dadosTamanhosPizza)
    {
        //Criamos uma chave tamanhos no JSON para retornar o array de tamanhos
        dadosTamanhosJSON.tamanho= dadosTamanhosPizza;

        return dadosTamanhosJSON;
    }
    else
        return false;
}

//Funcao para retornar um registro baseado no ID
const buscarTamanhoPizza = async function (id) {
    let dadosTamanhoJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdTamanhoPizza } = require ('../model/model_tamanhoPizza.js');

        const dadosTamanho = await selectByIdTamanhoPizza(id);

        if (dadosTamanho)
        {       
            //Criamos uma chave tamanho no JSON para retornar o array de tamanho
            dadosTamanhoJSON.tamanho = dadosTamanho;

            return dadosTamanhoJSON;
        }
        else
            return false;
    }
}

module.exports={
    novoTamanhoPizza,
    atualizarTamanhoPizza,
    excluirTamanhoPizza,
    listarTamanhosPizza,
    buscarTamanhoPizza
}