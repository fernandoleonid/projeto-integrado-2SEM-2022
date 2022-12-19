/*********************************************************************
 * Objetivo: Arquivo resposnsável manipulacao de recebimento, 
 * tratamento e retorno de dados entre a API e a model
 * Autor: Enzo Diógenes do Prado
 * Data Criacao: 05/12/2022
 * Versao: 1.0
 *********************************************************************/

//arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config');

//Funcao para gerar uma nova bebida
const novaBebida = async function (bebida) {

    //Validacao de campos obrigatórios
    if (bebida.preco == '' || bebida.preco == undefined || bebida.volume == '' || bebida.volume == undefined || bebida.id_tipo_bebida == '' || bebida.id_tipo_bebida == undefined || bebida.id_sabor_bebida == '' || bebida.id_sabor_bebida == undefined || bebida.id_marca_bebida == '' || bebida.id_marca_bebida == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }    
    
    
    else {
        //import da model de sabor_bebida
        const novaBebida = require('../model/model_bebida')

        //Chama a funcao para inserir novo sabor de bebida
        const resultNovaBebida = await novaBebida.insertBebida(bebida);

        //Verifica se os dados do novo funcionario foi inserido no BD
        if (resultNovaBebida) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

//Funcao para atualizar um registro
const atualizarBebida = async function (bebida) {

    
    //Validaçao para o ID como campo obrigatório
    if (bebida.id == ''|| bebida.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatórios
    else if (bebida.preco == '' || bebida.preco == undefined || bebida.volume == '' || bebida.volume == undefined || bebida.id_tipo_bebida == '' || bebida.id_tipo_bebida == undefined || bebida.id_sabor_bebida == '' || bebida.id_sabor_bebida == undefined || bebida.id_marca_bebida == '' || bebida.id_marca_bebida == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }      
    else
    {
        //import da model de sabor bebida
        const atualizarBebida = require('../model/model_bebida.js');

        //chama a funcao para atualizar um bebida
        const result = await atualizarBebida.updateBebida(bebida);
        
        if (result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//Funcao para excluir um registro de sabor bebida
const excluirBebida = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const bebida = await buscarBebida(id);

        //Valida se foi encontrado um registro valido
        if (bebida)
        {
            //import da model de sabor bebida
            const excluirBebida = require('../model/model_bebida.js');
            //chama a funcao para atualizar um sabor bebida
            const result = await excluirBebida.deleteBebida(id);
            
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
const listarBebidas = async function () {
    let dadosBebidasJSON = {};

    const { selectBebidas } = require ('../model/model_bebida.js');

    const dadosBebidas = await selectBebidas();

    if (dadosBebidas)
    {
        //Criamos uma chave funcionarios no JSON para retornar o array de funcionarios
        dadosBebidasJSON.bebidas= dadosBebidas;

        return dadosBebidasJSON;
    }
    else
        return false;
}



//Funcao para retornar um registro baseado no ID
const buscarBebida = async function (id) {
    let dadosBebidaJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdBebida} = require ('../model/model_bebida.js');

        const dadosBebida= await selectByIdBebida(id);

        if (dadosBebida)
        {       
            //Criamos uma chave funcionario no JSON para retornar o array de funcionario
            dadosBebidaJSON.bebida = dadosBebida;

            return dadosBebidaJSON;
        }
        else
            return false;
    }
}

module.exports={
    novaBebida,
    atualizarBebida,
    excluirBebida,
    listarBebidas,
    buscarBebida
}