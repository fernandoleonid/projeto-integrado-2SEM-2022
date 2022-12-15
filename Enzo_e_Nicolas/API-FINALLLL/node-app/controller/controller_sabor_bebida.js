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
const novoSaborBebida = async function (saborBebida) {

    //Validacao de campos obrigatórios
    if (saborBebida.sabor == '' || saborBebida.sabor == undefined ){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }    
    
    
    else {
        //import da model de sabor_bebida
        const novoSaborBebida = require('../model/model_sabor_bebida.js');

        //Chama a funcao para inserir novo sabor de bebida
        const resultNovoSaborBebida = await novoSaborBebida.insertSaborBebida(saborBebida);

        //Verifica se os dados do novo funcionario foi inserido no BD
        if (resultNovoSaborBebida) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

//Funcao para atualizar um registro
const atualizarSaborBebida = async function (saborBebida) {

    
    //Validaçao para o ID como campo obrigatório
    if (saborBebida.id == ''|| saborBebida.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatórios
    else if (saborBebida.sabor == '' || saborBebida.sabor == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    else
    {
        //import da model de sabor bebida
        const atualizarSaborBebida = require('../model/model_sabor_bebida.js');

        //chama a funcao para atualizar um bebida
        const result = await atualizarSaborBebida.updateSaborBebida(saborBebida);
        
        if (result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//Funcao para excluir um registro de sabor bebida
const excluirSaborBebida = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const saborBebida = await buscarSaborBebida(id);

        //Valida se foi encontrado um registro valido
        if (saborBebida)
        {
            //import da model de sabor bebida
            const excluirSaborBebida = require('../model/model_sabor_bebida.js');
            //chama a funcao para atualizar um sabor bebida
            const result = await excluirSaborBebida.deleteSaborBebida(id);
            
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
const listarSaboresBebidas = async function () {
    let dadosSaboresBebidasJSON = {};

    const { selectAllSaboresBebidas } = require ('../model/model_sabor_bebida.js');

    const dadosSaboresBebidas = await selectAllSaboresBebidas();

    if (dadosSaboresBebidas)
    {
        //Criamos uma chave funcionarios no JSON para retornar o array de funcionarios
        dadosSaboresBebidasJSON.saboresBebidas= dadosSaboresBebidas;

        return dadosSaboresBebidasJSON;
    }
    else
        return false;
}


//Funcao para retornar um registro baseado no ID
const buscarSaborBebida = async function (id) {
    let dadosSaborBebidaJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdSaborBebida } = require ('../model/model_sabor_bebida.js');

        const dadosSaborBebida = await selectByIdSaborBebida(id);

        if (dadosSaborBebida)
        {       
            //Criamos uma chave funcionario no JSON para retornar o array de funcionario
            dadosSaborBebidaJSON.saborBebida = dadosSaborBebida;

            return dadosSaborBebidaJSON;
        }
        else
            return false;
    }
}

module.exports={
    novoSaborBebida,
    atualizarSaborBebida,
    excluirSaborBebida,
    listarSaboresBebidas,
    buscarSaborBebida
}