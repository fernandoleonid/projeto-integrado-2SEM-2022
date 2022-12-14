const form = document.querySelector(".contact-form");
const button = document.querySelector(".contact-form__submit");

const sendMessage = async (json) => {
  const { data } = await axios.post(
    "https://api-pizza-client.netlify.app/.netlify/functions/server/message/",
    { ...json }
  );

  if (!data.error) swal("Parabens!", "Mensagem Enviada com Sucesso", "success");
  else swal("Oops!", "A mensagem não pode ser enviada!", "error");
};

const handleSubmit = async (e) => {
  const inputs = e.target.querySelectorAll("input");
  const textarea = e.target.querySelector("textarea");

  const infoInputs = Array.from(inputs).slice(0, -2);
  const checkedInputs = [inputs[3], inputs[4]];

  for (let input of infoInputs) {
    if (input.value.length === 0) {
      const message = `Preencha o campo ${input.placeholder}`;
      swal("Campo vazio!", message, "error");

      return false;
    }
  }

  if (textarea.value.length === 0) {
    swal(
      "Campo vazio!",
      "Porfavor coloque o conteudo da sua mensagem/critica",
      "error"
    );
  }

  if (!checkedInputs[0].checked && !checkedInputs[1].checked) {
    swal("Campo vazio!", "Selecione o tipo de mensagem porfavor!", "error");
  }

  let critica = false;
  if (checkedInputs[1].checked) critica = true;

  const data = {
    name: infoInputs[0].value,
    email: infoInputs[2].value,
    phone: infoInputs[1].value,
    cellphone: infoInputs[1].value,
    critica,
    content: textarea.value,
  };

  await sendMessage(data);

  return true;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit(e);
});
