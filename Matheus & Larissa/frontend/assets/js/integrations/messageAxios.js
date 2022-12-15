import { api } from '../api/api.js';

export const newMessage = async (messageJSON) => {
  console.log(messageJSON);
  const url = 'mensagem';
  const { data } = api.post(url, {
    nome: messageJSON.name,
    email: messageJSON.email,
    telefone: messageJSON.phoneNumber,
    celular: messageJSON.cellphoneNumber,
    mensagem: messageJSON.message,
    id_tipo_mensagem: messageJSON.messageType,
  });

  return data;
};
