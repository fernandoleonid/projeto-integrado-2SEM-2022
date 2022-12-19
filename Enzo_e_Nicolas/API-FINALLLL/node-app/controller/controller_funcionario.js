/*********************************************************************
 * Objetivo: Arquivo resposnsável manipulacao de recebimento, 
 * tratamento e retorno de dados entre a API e a model
 * Autor: Nicolas Dobbeck
 * Data Criacao: 05/12/2022
 * Versao: 1.0
 *********************************************************************/

//arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config');

//Funcao para gerar um novo aluno
const novoFuncionario = async function (funcionario) {

    //Validacao de campos obrigatórios
    if (funcionario.nome == '' || funcionario.nome == undefined || funcionario.email == '' || funcionario.email == undefined || funcionario.senha == '' || funcionario.senha == undefined || funcionario.telefone == '' || funcionario.telefone == undefined){
        console.log(funcionario);
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }    
    
    //Validacao para verificar email válido    
    else if (!funcionario.email.includes('@'))
        return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL };
    else {
        //import da model de funcionario
        const novoFuncionario = require('../model/model_funcionario');

        //Chama a funcao para inserir novo funcionario
        const resultNovoFuncionario = await novoFuncionario.insertFuncionario(funcionario);

        //Verifica se os dados do novo funcionario foi inserido no BD
        if (resultNovoFuncionario) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

//Funcao para atualizar um registro
const atualizarFuncionario = async function (funcionario) {

    
    //Validaçao para o ID como campo obrigatório
    if (funcionario.id == ''|| funcionario.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatórios
    else if (funcionario.nome == '' || funcionario.nome == undefined ||  funcionario.email == '' || funcionario.email == undefined || funcionario.senha == '' || funcionario.senha == undefined || funcionario.telefone == '' || funcionario.telefone == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    //Validacao para verificar email válido    
    else if (!funcionario.email.includes('@'))
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL};
    else
    {
        //import da model de funcionario
        const atualizarFuncionario = require('../model/model_funcionario');

        //chama a funcao para atualizar um funcionario
        const result = await atualizarFuncionario.updateFuncionario(funcionario);
        
        if (result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//Funcao para excluir um registro de Funcionario
const excluirFuncionario = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const funcionario = await buscarFuncionario(id);

        //Valida se foi encontrado um registro valido
        if (funcionario)
        {
            //import da model de funcionario
            const excluirFuncionario = require('../model/model_funcionario.js');
            //chama a funcao para atualizar um funcionario
            const result = await excluirFuncionario.deleteFuncionario(id);
            
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
const listarFuncionarios = async function () {
    let dadosFuncionariosJSON = {};

    const { selectAllFuncionarios } = require ('../model/model_funcionario.js');

    const dadosFuncionarios = await selectAllFuncionarios();

    if (dadosFuncionarios)
    {
        //Criamos uma chave funcionarios no JSON para retornar o array de funcionarios
        dadosFuncionariosJSON.funcionarios= dadosFuncionarios;

        return dadosFuncionariosJSON;
    }
    else
        return false;
}

//Funcao para retornar um registro baseado no ID
const buscarFuncionario = async function (id) {
    let dadosFuncionarioJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdFuncionario } = require ('../model/model_funcionario.js');

        const dadosFuncionario = await selectByIdFuncionario(id);

        if (dadosFuncionario)
        {       
            //Criamos uma chave funcionario no JSON para retornar o array de funcionario
            dadosFuncionarioJSON.funcionario = dadosFuncionario;

            return dadosFuncionarioJSON;
        }
        else
            return false;
    }
}

module.exports={
    novoFuncionario,
    atualizarFuncionario,
    excluirFuncionario,
    listarFuncionarios,
    buscarFuncionario
}