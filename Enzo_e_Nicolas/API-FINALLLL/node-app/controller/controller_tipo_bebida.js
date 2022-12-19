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
const novoTipoBebida = async function (tipoBebida) {

    //Validacao de campos obrigatórios
    if (tipoBebida.tipo == '' || tipoBebida.tipo == undefined ){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }    
    
    
    else {
        //import da model de sabor_bebida
        const novoTipoBebida = require('../model/model_tipo_bebida.js');

        //Chama a funcao para inserir novo sabor de bebida
        const resultNovoTipoBebida = await novoTipoBebida.insertTipoBebida(tipoBebida);

        //Verifica se os dados do novo funcionario foi inserido no BD
        if (resultNovoTipoBebida) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

//Funcao para atualizar um registro
const atualizarTipoBebida = async function (tipoBebida) {

    
    //Validaçao para o ID como campo obrigatório
    if (tipoBebida.id == ''|| tipoBebida.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatórios
    else if (tipoBebida.tipo == '' || tipoBebida.tipo == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    else
    {
        //import da model de sabor bebida
        const atualizarTipoBebida = require('../model/model_tipo_bebida.js');

        //chama a funcao para atualizar um bebida
        const result = await atualizarTipoBebida.updateTipoBebida(tipoBebida);
        
        if (result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//Funcao para excluir um registro de sabor bebida
const excluirTipoBebida = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const tipoBebida = await buscarTipoBebida(id);

        //Valida se foi encontrado um registro valido
        if (tipoBebida)
        {
            //import da model de sabor bebida
            const excluirTipoBebida = require('../model/model_tipo_bebida.js');
            //chama a funcao para atualizar um sabor bebida
            const result = await excluirTipoBebida.deleteTipoBebida(id);
            
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
const listarTiposBebidas = async function () {
    let dadosTiposBebidasJSON = {};

    const { selectAllTiposBebidas } = require ('../model/model_tipo_bebida.js');

    const dadosTiposBebidas = await selectAllTiposBebidas();

    if (dadosTiposBebidas)
    {
        //Criamos uma chave funcionarios no JSON para retornar o array de funcionarios
        dadosTiposBebidasJSON.tiposBebidas= dadosTiposBebidas;

        return dadosTiposBebidasJSON;
    }
    else
        return false;
}


//Funcao para retornar um registro baseado no ID
const buscarTipoBebida = async function (id) {
    let dadosTipoBebidaJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdTipoBebida } = require ('../model/model_tipo_bebida.js');

        const dadosTiposBebida = await selectByIdTipoBebida(id);

        if (dadosTiposBebida)
        {       
            //Criamos uma chave funcionario no JSON para retornar o array de funcionario
            dadosTipoBebidaJSON.saborBebida = dadosTiposBebida;

            return dadosTipoBebidaJSON;
        }
        else
            return false;
    }
}

module.exports={
    novoTipoBebida,
    atualizarTipoBebida,
    excluirTipoBebida,
    listarTiposBebidas,
    buscarTipoBebida
}