/** ************************************************************************************************
* Objetivo: Arquivo responsável pela configuração de variáveis, constantes e mensagens do sistema.
* Autor: Larissa Nunes
* Versão: 1.0
* Data criação: 13/10/2022
* Data modificação: 01/12/2022
************************************************************************************************* */

export const MESSAGE_ERROR = {
  REQUIRED_FIELDS: 'Preencha todos os campos obrigatórios.',
  INVALID_EMAIL: 'O e-mail informado não é válido.',
  CONTENT_TYPE: 'O cabeçalho da requisição não possui um Content-Type válido!',
  EMPTY_BODY: 'O body da requisição não pode estar vazio!',
  NOT_FOUND_BD: 'Não foram encontrados registros no Banco de Dados.',
  NOT_INSERT_ITEM: 'O item não pôde ser criado',
  INTERNAL_ERROR_DB: 'Não foi possível realizar a operação com o Banco de Dados.',
  REQUIRED_ID: 'O id do registro é obrigatório neste tipo de requisição',
};

export const MESSAGE_SUCESS = {
  INSERT_ITEM: 'Item criado com sucesso no Banco de Dados',
  UPDATE_ITEM: 'Item atualizado com sucesso no Banco de Dados',
  DELETE_ITEM: 'Item deletado com sucesso no Banco de Dados',
  JWT_CREATED: 'Autenticação feita com sucesso',
};
