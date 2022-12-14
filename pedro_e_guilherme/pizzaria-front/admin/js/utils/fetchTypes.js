export const fetchTypes = async (categoryInput, divToAppend) => {
  const inputName_Stuffing = document.querySelector('input[name="stuffing"]') || document.querySelector('input[name="name"]');
  try {
    if (divToAppend.lastElementChild) {
      divToAppend.innerHTML = '';
    }

    let typeSelected = categoryInput.value.toLowerCase();
    changeIngredientsDiv(typeSelected);

    inputName_Stuffing.name = 'stuffing';
    inputName_Stuffing.placeholder = 'Recheio';

    if (typeSelected.includes('bebida')) {
      typeSelected = 'drink';
      inputName_Stuffing.name = 'name';
      inputName_Stuffing.placeholder = 'Nome';
    }
    const { data } = await axios.get(`https://pizza-cms-api.netlify.app/.netlify/functions/server/${typeSelected}/types`, { headers: { common: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } } });

    data.payload.forEach((type) => {
      const option = document.createElement('option');
      option.value = type.name;
      option.textContent = type.name;

      divToAppend.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
};
