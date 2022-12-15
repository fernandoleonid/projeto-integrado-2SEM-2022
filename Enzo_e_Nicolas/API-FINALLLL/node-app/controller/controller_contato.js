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
const novoContato = async function (contato) {

    //Validacao de campos obrigatórios
    if (contato.nome == '' || contato.nome == undefined || contato.email == '' || contato.email == undefined || contato.celular == '' || contato.celular == undefined || contato.mensagem == '' || contato.mensagem == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }    
    
    //Validacao para verificar email válido    
    else if (!contato.email.includes('@'))
        return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL };
    else {
        //import da model de funcionario
        const novoContato = require('../model/model_contato.js');

        //Chama a funcao para inserir novo funcionario
        const resultNovoContato = await novoContato.insertContato(contato);

        //Verifica se os dados do novo funcionario foi inserido no BD
        if (resultNovoContato) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

//Funcao para atualizar um registro
const atualizarContato = async function (contato) {

    
    //Validaçao para o ID como campo obrigatório
    if (contato.id == ''|| contato.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatórios
    else if (contato.nome == '' || contato.nome == undefined || contato.email == '' || contato.email == undefined || contato.celular == '' || contato.celular == undefined || contato.mensagem == '' || contato.mensagem == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }    
    //Validacao para verificar email válido    
    else if (!contato.email.includes('@'))
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL};
    else
    {
        //import da model de funcionario
        const atualizarContato = require('../model/model_contato.js');

        //chama a funcao para atualizar um funcionario
        const result = await atualizarContato.updateContato(contato);
        
        if (result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//Funcao para excluir um registro de Funcionario
const excluirContato = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const contato = await buscarContato(id);

        //Valida se foi encontrado um registro valido
        if (contato)
        {
            //import da model de funcionario
            const excluirContato = require('../model/model_contato.js');
            //chama a funcao para atualizar um funcionario
            const result = await excluirContato.deleteContato(id);
            
            if (result)
                return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM};
            else
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
        }
    }
}

//Funcao para retornar todos os registros de funcionario presentes dentro do banco de dados
const listarContatos = async function () {
    let dadosContatosJSON = {};

    const { selectAllContatos } = require ('../model/model_contato.js');

    const dadosContatos = await selectAllContatos();

    if (dadosContatos)
    {
        //Criamos uma chave funcionarios no JSON para retornar o array de funcionarios
        dadosContatosJSON.funcionarios= dadosContatos;

        return dadosContatosJSON;
    }
    else
        return false;
}

//Funcao para retornar um registro baseado no ID
const buscarContato = async function (id) {
    let dadosContatoJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdContato } = require ('../model/model_contato.js');

        const dadosContato = await selectByIdContato(id);

        if (dadosContato)
        {       
            //Criamos uma chave funcionario no JSON para retornar o array de funcionario
            dadosContatoJSON.contato = dadosContato;

            return dadosContatoJSON;
        }
        else
            return false;
    }
}

module.exports={
    novoContato,
    atualizarContato,
    excluirContato,
    listarContatos,
    buscarContato
}