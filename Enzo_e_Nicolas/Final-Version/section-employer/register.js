const token = localStorage.getItem("token")

const checkToken = (token) => {
    if(!token) {
        alert("É necessario logar para entrar na pagina!")
        location.href = "http://127.0.0.1:5500/admin/"
    }
}

checkToken(token)


console.log(token);


const form = document.querySelector("#form-register-employee")
const button = document.querySelector(".button")

const inputs = Array.from(form.querySelectorAll("input")).slice(0,-1);

const checkEmptyInputs = (input) => {
    if(input.value === "") return false
    return true
}

const getInputData = (input) => input.value

const handleClickButton = async (e) => {
    e.preventDefault()
    let status = true;

    inputs.forEach((input) => {
        if(!checkEmptyInputs(input)) {
            alert(`Porfavor preencha o campo ${input.name}`)
            status = false
        }        
    })

    if(!status) return false;

    const data = {}

    data.nome = getInputData(inputs[0])
    data.senha = getInputData(inputs[3])
    data.email = getInputData(inputs[1])
    data.telefone = getInputData(inputs[2])
    data.foto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGsazvrLaPZ6tagkuT6XjVg0LXSaDwhWNtSuVLRC4-bA&s"
    
    try {
        const res = await axios.post("http://40.121.135.142:3000/v1/funcionario", data);    

        alert("Criado com sucesso!")
        
    } catch (error) {
        alert("Nao foi possive cadastrar")
    }
    
}


button.addEventListener("click", handleClickButton)


