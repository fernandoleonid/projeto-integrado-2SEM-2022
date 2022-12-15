import { api } from '../../api/api.js';

export const getMessages = async () => {
  const url = 'mensagens';
  const { data } = await api.get(url);

  return data;
};
