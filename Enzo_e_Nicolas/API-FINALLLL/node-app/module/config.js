/**************************************************************************************************
 * Objetivo: Arquivo responsável pela configuracao de variaveis, constantes e mensagens do sistema, 
 * Autor: Nicolas Dobbeck
 * Data Criacao: 05/12/2022
 * Versao: 1.0
 * 
 **************************************************************************************************/

 const MESSAGE_ERROR = {
    REQUIRED_FIELDS     :   'Existe(m) campo(s) obrigatório(s) que deve(m) ser enviado(s)!',
    INVALID_EMAIL       :   'O e-mail informado não é válido!',
    CONTENT_TYPE        :   'O cabeçalho da requisição não possui um Content-Type válido!',
    EMPTY_BODY          :   'O body da requisição não pode ser vazio!',
    NOT_FOUND_DB        :   'Não foram encontrados registros no Banco de Dados!',
    INTERNAL_ERROR_DB   :   'Não foi possivel realizar a operação com o Banco de Dados!',
    REQUIRED_ID         :   'O ID do registro é obrigatório neste tipo de requisição!',
    NO_COURSE           :   'Nenhum curso matriculado'    
}

const MESSAGE_SUCCESS = {
    INSERT_ITEM         :   'Item criado com sucesso no Banco de Dados',
    UPDATE_ITEM         :   'Item atualizado com sucesso no Banco de Dados',
    DELETE_ITEM         :   'Item excluido com sucesso no Banco de Dados'
}

module.exports = {
    MESSAGE_ERROR,
    MESSAGE_SUCCESS
}
