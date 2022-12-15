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
const novaBebidaPromocao= async function (bebidaPromocao) {

    //Validacao de campos obrigatórios
    if ( bebidaPromocao.preco_promocao == '' || bebidaPromocao.preco_promocao == undefined ||bebidaPromocao.id_bebida == '' || bebidaPromocao.id_bebida == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }    
    
    
    else {
        //import da model de sabor_bebida
        const novaBebidaPromocao = require('../model/model_promocao_bebida');

        //Chama a funcao para inserir novo sabor de bebida
        const resultNovabebidaPromocao = await novaBebidaPromocao.insertBebidaPromocao(bebidaPromocao);

        //Verifica se os dados do novo funcionario foi inserido no BD
        if (resultNovabebidaPromocao) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

//Funcao para atualizar um registro
const atualizarBebidaPromocao = async function (bebidaPromocao) {

    
    //Validaçao para o ID como campo obrigatório
    if (bebidaPromocao.id == ''|| bebidaPromocao.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatórios
    else if ( bebidaPromocao.preco_promocao == '' || bebidaPromocao.preco_promocao == undefined ||bebidaPromocao.id_bebida == '' || bebidaPromocao.id_bebida == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }      
    else
    {
        //import da model de sabor bebida
        const atualizarBebidaPromocao = require('../model/model_promocao_bebida');

        //chama a funcao para atualizar um bebida
        const result = await atualizarBebidaPromocao.updateBebidaPromocao(bebidaPromocao);
        
        if (result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//Funcao para excluir um registro de sabor bebida
const excluirBebidaPromocao  = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const bebidaPromocao = await buscarBebidaPromocao(id);

        //Valida se foi encontrado um registro valido
        if (bebidaPromocao)
        {
            //import da model de sabor bebida
            const excluirBebidaPromocao = require('../model/model_promocao_bebida');
            //chama a funcao para atualizar um sabor bebida
            const result = await excluirBebidaPromocao.deleteBebidaPromocao(id);
            
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
const listarBebidasPromocao = async function () {
    let dadosBebidasPromocaoJSON = {};

    const { selectAllBebidasPromocoes} = require ('../model/model_promocao_bebida');

    const dadosBebidasPromocao= await selectAllBebidasPromocoes();

    if (dadosBebidasPromocao)
    {
        //Criamos uma chave funcionarios no JSON para retornar o array de funcionarios
        dadosBebidasPromocaoJSON.bebidasPromocoes= dadosBebidasPromocao;

        return dadosBebidasPromocaoJSON;
    }
    else
        return false;
}



//Funcao para retornar um registro baseado no ID
const buscarBebidaPromocao = async function (id) {
    let dadosBebidaPromocaoJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdBebidaPromocao} = require ('../model/model_promocao_bebida');

        const dadosBebidaPromocao = await selectByIdBebidaPromocao(id);

        if (dadosBebidaPromocao)
        {       
            //Criamos uma chave funcionario no JSON para retornar o array de funcionario
            dadosBebidaPromocaoJSON.pizzasPromocao = dadosBebidaPromocao;

            return dadosBebidaPromocaoJSON;
        }
        else
            return false;
    }
}

module.exports={
    novaBebidaPromocao,
    atualizarBebidaPromocao,
    excluirBebidaPromocao,
    listarBebidasPromocao,
    buscarBebidaPromocao
}