import { api } from '../../../api/api.js';

export const fetchCategory = async (divToAppend) => {
  try {
    const { data } = await api.get('/category');

    data.payload.forEach((type) => {
      const option = document.createElement('option');
      option.value = type.name;
      option.textContent = type.name;

      divToAppend.appendChild(option);
    });
  } catch (e) {
    console.log('Ops! Houve um erro!', e);
  }
};
