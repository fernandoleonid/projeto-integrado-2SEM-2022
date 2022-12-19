const email = document.querySelector("#email")
const senha = document.querySelector("#senha")

const button = document.querySelector(".button")



const handleClickButton = async (e) => {
    e.preventDefault()
    
    const data = {}
    

    if(email.value === ""){
        alert("Preecha o campo de email")
        return false    
    }

    if(senha.value == "") {
        alert("preecha o campo de senha") 
        return false
    }

    console.log(email.value, senha.value);

    data.email = email.value    
    data.senha = senha.value

   

        const res = await axios.post("http://40.121.135.142:3000/v1/funcionario/login", data)
        
    
        localStorage.setItem("token", res.data) 

        location.href = "http://127.0.0.1:5500/admin/eployeeRec.html"

    console.log(res);

}


button.addEventListener("click", handleClickButton)