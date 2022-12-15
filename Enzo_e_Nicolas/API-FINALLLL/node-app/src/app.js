/*********************************************************************
 * Objetivo: API responsável pela manipulacao de dados do Back-end
 *          (GET, POST, PUT, DELETE)
 * Autor: Nicolas Dobbeck
 * Data Criacao: 05/12/2022
 * Versao: 1.0
 * 
 * Versao: 2.0
 *      -Novas Implementacoes
 * 
 * Anotacoes: 
 *  //Para manipular o acesso a BD podemos utilizar o Prisma
    //Para instalar o prisma, devemos rodar os seguintes comandos
    //npm install prisma --save
    //npx prisma
    //npx prisma init
    //npm install @prisma/client
 *********************************************************************/

//Import das bibliotecas
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config');
const { request } = require('express');

const app = express();

//Configuracao de cors para liberar o acesso a API
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    app.use(cors());
    next();
});

//Criamos um objeto que permite receber um JSON no body das requisicoes
const jsonParser = bodyParser.json();


// ****** // ---------- EndPoints de Pizza---------- // ******

// ---------- EndPoint para inserir nova pizza ---------- //
app.post('/v1/pizza', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de pizza
            const controllerPizza = require('../controller/controller_pizza');
            //Chama a funcao novaPizza da controller e encaminha os dados do body 
            const novaPizza = await controllerPizza.novaPizza(dadosBody)
            console.log(dadosBody)
            statusCode = novaPizza.status;
            message = novaPizza.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});






//Recebe o token
const verifyJWT = async function (request, response, next){
    //Recebe o token encaminhado no header da requisicao
    let token = request.headers['x-acess-token']; 
    //Import da biblioteca para validacao do token 
    const jwt = require('./authentication/jwt_funcionario.js');

    const autenticidadeToken = await jwt.validateJWT(token)
    
    console.log(autenticidadeToken);

    if (autenticidadeToken) {
        next();
    }else{
        return response.status(401).end();
    }
}

app.post('/v1/funcionario/login', cors(), jsonParser, async function (request, response) {
    const { email, senha } = request.body
    const controller = require("./controller/controller_funcionario")
    const login = await controller.autenticarFuncionario(email, senha)

    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

        //Validar se o content-type é do tipo application/json
        if (headerContentType == 'application/json') {
            if(!login) {
                statusCode = 401
                message = "nao autorizado"
            } else {
                statusCode = 200
                message = login.token
            }
        } 
        else {
            statusCode = 415;
            message = MESSAGE_ERROR.CONTENT_TYPE;
        }
    
        response.status(statusCode);
        response.json(message);
})


// ***************** // ---------- EndPoints de Funcionrio ---------- // *****************

// ---------- EndPoint para inserir novo funcionario ---------- //
app.post('/v1/funcionario', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de pizza
            const controllerFuncionario = require('./controller/controller_funcionario.js');
            //Chama a funcao novaPizza da controller e encaminha os dados do body 
            const novoFuncionario = await controllerFuncionario.novoFuncionario(dadosBody)
            statusCode = novoFuncionario.status;
            message = novoFuncionario.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});


// ---------- EndPoint para buscar funcionario pelo ID---------- //
app.get('/v1/funcionario/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerFuncionario
        const controllerFuncionario = require('./controller/controller_funcionario.js');

        //Retorna todos os funcionarios existentes no BD
        const dadosFuncionario = await controllerFuncionario.buscarFuncionario(id);

        //Valida se existe retorno de dados
        if (dadosFuncionario) {   //Status 200
            statusCode = 200;
            message = dadosFuncionario;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para listar todos os funcionarios existentes no BD---------- //
app.get('/v1/funcionarios', verifyJWT,  cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerFuncionario
    const controllerFuncionario = require('./controller/controller_funcionario.js');

    //Retorna todos os funcionarios existentes no BD
    const dadosFuncionarios = await controllerFuncionario.listarFuncionarios();

    //Valida se existe retorno de dados
    if (dadosFuncionarios) {   //Status 200
        statusCode = 200;
        message = dadosFuncionarios;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para atualizar usuario existente---------- //
app.put('/v1/funcionario/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de funcionario
                const controllerFuncionario = require('./controller/controller_funcionario.js');
                //Chama a funcao novoFuncionario da controller e encaminha os dados do body 
                const novoFuncionario = await controllerFuncionario.atualizarFuncionario(dadosBody);

                statusCode = novoFuncionario.status;
                message = novoFuncionario.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para excluir usuario existente---------- //
app.delete('/v1/funcionario/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de funcionario
        const controllerFuncionario = require('./controller/controller_funcionario.js');
        
        //Chama a funcao para excluir um item 
        const funcionario = await controllerFuncionario.excluirFuncionario(id);

        statusCode = funcionario.status;
        message = funcionario.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});

















// ---------- EndPoint para buscar pizza pelo ID---------- //
app.get('/v1/pizza/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerPizza
        const controllerPizza = require('../controller/controller_pizza');

        //Retorna todos as pizzas existentes no BD
        const dadosPizza = await controllerPizza.buscarPizza(id);

        //Valida se existe retorno de dados
        if (dadosPizza) {   //Status 200
            statusCode = 200;
            message = dadosPizza;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para listar todas as pizzas existentes no BD---------- //
app.get('/v1/pizzas', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerPizza
    const controllerPizza = require('../controller/controller_pizza');

    //Retorna todos os pizzas existentes no BD
    const dadosPizza = await controllerPizza.listarPizzas();

    //Valida se existe retorno de dados
    if (dadosPizza) {   //Status 200
        statusCode = 200;
        message = dadosPizza;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para atualizar uma pizza pelo ID---------- //
app.put('/v1/pizza/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de pizza
                const controllerPizza = require('../controller/controller_pizza');
                //Chama a funcao novaPizza da controller e encaminha os dados do body 
                const novaPizza = await controllerPizza.atualizarPizza(dadosBody);
                console.log(dadosBody);
                statusCode = novaPizza.status;
                message = novaPizza.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});



app.delete('/v1/pizza/:id', cors(),jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de pizza
        const controllerPizza = require('../controller/controller_pizza');
        
        //Chama a funcao para excluir um item 
        const pizza = await controllerPizza.excluirPizza(id);

        statusCode = pizza.status;
        message = pizza.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});

// ****** // ---------- EndPoints de Tamanho de Pizza---------- // ******

// ---------- EndPoint para inserir novo tamanho pizza ---------- //
app.post('/v1/tamanhoPizza', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de tamanho pizza
            const controllerTamanhoPizza = require('../controller/controller_tamanhoPizza');
            //Chama a funcao novoTamanhoPizza da controller e encaminha os dados do body 
            const novoTamanhoPizza = await controllerTamanhoPizza.novoTamanhoPizza(dadosBody)
            statusCode = novoTamanhoPizza.status;
            message = novoTamanhoPizza.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

// ---------- EndPoint para buscar tamanho de pizza pelo ID---------- //
app.get('/v1/tamanhoPizza/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerPizza
        const controllerTamanhoPizza = require('../controller/controller_tamanhoPizza');

        //Retorna todos as pizzas existentes no BD
        const dadosTamanhoPizza = await controllerTamanhoPizza.buscarTamanhoPizza(id);

        //Valida se existe retorno de dados
        if (dadosTamanhoPizza) {   //Status 200
            statusCode = 200;
            message = dadosPizza;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para listar todas as pizzas existentes no BD---------- //
app.get('/v1/tamanhoPizzas', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerPizza
    const controllerTamanhoPizza = require('../controller/controller_tamanhoPizza');

    //Retorna todos os pizzas existentes no BD
    const dadosTamanhoPizza = await controllerTamanhoPizza.listarTamanhosPizza();

    //Valida se existe retorno de dados
    if (dadosTamanhoPizza) {   //Status 200
        statusCode = 200;
        message = dadosTamanhoPizza;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para atualizar uma pizza pelo ID---------- //
app.put('/v1/tamanhoPizza/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de pizza
                const controllerTamanhoPizza = require('../controller/controller_tamanhoPizza');
                //Chama a funcao novaPizza da controller e encaminha os dados do body 
                const novoTamanhoPizza = await controllerTamanhoPizza.atualizarTamanhoPizza(dadosBody);
                
                statusCode = novoTamanhoPizza.status;
                message = novoTamanhoPizza.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para excluir tamanho existente---------- //
app.delete('/v1/tamanhoPizza/:id', cors(),jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de pizza
        const controllerTamanhoPizza = require('../controller/controller_tamanhoPizza');
        
        //Chama a funcao para excluir um item 
        const pizza = await controllerTamanhoPizza.excluirTamanhoPizza(id);

        statusCode = pizza.status;
        message = pizza.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});



// ****** // ---------- EndPoints de Ingredientes ---------- // ******

// ---------- EndPoint para inserir novo ingrediente ---------- //
app.post('/v1/ingrediente', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de tamanho pizza
            const controllerIngrediente = require('../controller/controller_ingredientes');
            //Chama a funcao novoTamanhoPizza da controller e encaminha os dados do body 
            const novoIngrediente = await controllerIngrediente.novoIngrediente(dadosBody)
            statusCode = novoIngrediente.status;
            message = novoIngrediente.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});



// ---------- EndPoint para listar todos os ingredientes existentes no BD---------- //
app.get('/v1/ingredientes', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerPizza
    const controllerIngrediente = require('../controller/controller_ingredientes');

    //Retorna todos os pizzas existentes no BD
    const dadosIngrediente = await controllerIngrediente.listarIngrediente();

    //Valida se existe retorno de dados
    if (dadosIngrediente) {   //Status 200
        statusCode = 200;
        message = dadosIngrediente;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para atualizar uma pizza pelo ID---------- //
app.put('/v1/ingrediente/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de pizza
                const controllerIngrediente = require('../controller/controller_ingredientes');
                //Chama a funcao novaPizza da controller e encaminha os dados do body 
                const novoIngrediente = await controllerIngrediente.atualizarIngrediente(dadosBody);
                
                statusCode = novoIngrediente.status;
                message = novoIngrediente.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para excluir tamanho existente---------- //
app.delete('/v1/ingrediente/:id', cors(),jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de pizza
        const controllerIngrediente = require('../controller/controller_ingredientes');
        
        //Chama a funcao para excluir um item 
        const ingrediente = await controllerIngrediente.excluirIngrediente(id);

        statusCode = ingrediente.status;
        message = ingrediente.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

}); 




// ---------- EndPoint para inserir novo sabor de bebida ---------- //
app.post('/v1/saborBebida', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de sabor bebida
            const controllerSaborBebida = require('../controller/controller_sabor_bebida');
            //Chama a funcao novoAluno da controller e encaminha os dados do body 
            const novoSaborBebida = await controllerSaborBebida.novoSaborBebida(dadosBody)
            statusCode = novoSaborBebida.status;
            message = novoSaborBebida.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

// ---------- EndPoint para buscar sabor de bebida pelo ID---------- //
app.get('/v1/saborBebida/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerSaborBebida
        const controllerSaborBebida = require('../controller/controller_sabor_bebida');

        //Retorna todos os sabores de bebidas existentes no BD
        const dadosSaborBebida = await controllerSaborBebida.buscarSaborBebida(id);

        //Valida se existe retorno de dados
        if (dadosSaborBebida) {   //Status 200
            statusCode = 200;
            message = dadosSaborBebida;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para listar todos os sabores existentes no BD---------- //
app.get('/v1/saboresBebidas', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerSaborBebida
    const controllerSaborBebida = require('../controller/controller_sabor_bebida');

    //Retorna todos os funcionarios existentes no BD
    const dadosSaboresBebidas = await controllerSaborBebida.listarSaboresBebidas();

    //Valida se existe retorno de dados
    if (dadosSaboresBebidas) {   //Status 200
        statusCode = 200;
        message = dadosSaboresBebidas;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para atualizar um sabor existente---------- //
app.put('/v1/saborBebida/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de sabor bebida
                const controllerSaborBebida = require('../controller/controller_sabor_bebida');
                //Chama a funcao novoFuncionario da controller e encaminha os dados do body 
                const novoFuncionario = await controllerSaborBebida.atualizarSaborBebida(dadosBody);

                statusCode = novoFuncionario.status;
                message = novoFuncionario.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});



// ---------- EndPoint para excluir sabor existente---------- //
app.delete('/v1/saborBebida/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de funcionario
        const controllerSaborBebida = require('../controller/controller_sabor_bebida');
        
        //Chama a funcao para excluir um item 
        const saborBebida = await controllerSaborBebida.excluirSaborBebida(id);

        statusCode = saborBebida.status;
        message = saborBebida.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});





// ---------- EndPoint para inserir novo tipo de bebida ---------- //
app.post('/v1/tipoBebida', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de sabor bebida
            const controllerTipoBebida = require('../controller/controller_tipo_bebida');
            //Chama a funcao novoAluno da controller e encaminha os dados do body 
            const novoTipoBebida = await controllerTipoBebida.novoTipoBebida(dadosBody)
            statusCode = novoTipoBebida.status;
            message = novoTipoBebida.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

// ---------- EndPoint para buscar tipo de bebida pelo ID---------- //
app.get('/v1/tipoBebida/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerSaborBebida
        const controllerTipoBebida = require('../controller/controller_tipo_bebida');

        //Retorna todos os sabores de bebidas existentes no BD
        const dadosTiposBebida = await controllerTipoBebida.buscarTipoBebida(id);

        //Valida se existe retorno de dados
        if (dadosTiposBebida) {   //Status 200
            statusCode = 200;
            message = dadosTiposBebida;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para listar todos os tipos de bebida existentes no BD---------- //
app.get('/v1/tiposBebidas', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerTipoBebida
    const controllerTipoBebida = require('../controller/controller_tipo_bebida');

    //Retorna todos os tipos de bebidas existentes no BD
    const dadosTiposBebidas = await controllerTipoBebida.listarTiposBebidas();

    //Valida se existe retorno de dados
    if (dadosTiposBebidas) {   //Status 200
        statusCode = 200;
        message = dadosTiposBebidas;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para atualizar um tipo de bebida existente---------- //
app.put('/v1/tipoBebida/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de sabor bebida
                const controllerTipoBebida = require('../controller/controller_tipo_bebida');
                //Chama a funcao novoFuncionario da controller e encaminha os dados do body 
                const novoTipoBebida = await controllerTipoBebida.atualizarTipoBebida(dadosBody);

                statusCode = novoTipoBebida.status;
                message = novoTipoBebida.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para excluir tipo de bebida existente---------- //
app.delete('/v1/tipoBebida/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de tipo de bebida
        const controllerTipoBebida = require('../controller/controller_tipo_bebida');
        
        //Chama a funcao para excluir um item 
        const tipoBebida = await controllerTipoBebida.excluirTipoBebida(id);

        statusCode = tipoBebida.status;
        message = tipoBebida.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});





// ---------- EndPoint para inserir uma nova pizzaria ---------- //
app.post('/v1/pizzaria', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de sabor bebida
            const controllerPizzaria = require('../controller/controller_pizzaria');
            //Chama a funcao novoAluno da controller e encaminha os dados do body 
            const novaPizzaria = await controllerPizzaria.novaPizzaria(dadosBody)
            statusCode = novaPizzaria.status;
            message = novaPizzaria.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

// ---------- EndPoint para buscar uma pizzaria pelo ID---------- //
app.get('/v1/pizzaria/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerSaborBebida
        const controllerPizzaria = require('../controller/controller_pizzaria');

        //Retorna todos os sabores de bebidas existentes no BD
        const dadosPizzaria = await controllerPizzaria.buscarPizzaria(id);

        //Valida se existe retorno de dados
        if (dadosPizzaria) {   //Status 200
            statusCode = 200;
            message = dadosPizzaria;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para listar todos as pizzarias existentes no BD---------- //
app.get('/v1/pizzaria', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerTipoBebida
    const controllerPizzaria = require('../controller/controller_pizzaria');

    //Retorna todos os tipos de bebidas existentes no BD
    const dadosPizzaria = await controllerPizzaria.listarPizzarias();

    //Valida se existe retorno de dados
    if (dadosPizzaria) {   //Status 200
        statusCode = 200;
        message = dadosPizzaria;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para atualizar uma pizzaria existente---------- //
app.put('/v1/pizzaria/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de sabor bebida
                const controllerPizzaria = require('../controller/controller_pizzaria');
                //Chama a funcao novoFuncionario da controller e encaminha os dados do body 
                const novaPizzaria = await controllerPizzaria.atualizarPizzaria(dadosBody);

                statusCode = novaPizzaria.status;
                message = novaPizzaria.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para excluir tipo uma pizzaria existente---------- //
app.delete('/v1/pizzaria/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de tipo de bebida
        const controllerPizzaria = require('../controller/controller_pizzaria');
        
        //Chama a funcao para excluir um item 
        const pizzaria = await controllerPizzaria.excluirPizzaria(id);

        statusCode = pizzaria.status;
        message = pizzaria.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});





// ---------- EndPoint para inserir um novo contato ---------- //
app.post('/v1/contato', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de sabor bebida
            const controllerContato = require('../controller/controller_contato');
            //Chama a funcao novoAluno da controller e encaminha os dados do body 
            const novoContato = await controllerContato.novoContato(dadosBody)
            statusCode = novoContato.status;
            message = novoContato.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

// ---------- EndPoint para buscar um contato pelo ID---------- //
app.get('/v1/contato/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerSaborBebida
        const controllerContato = require('../controller/controller_contato');

        //Retorna todos os sabores de bebidas existentes no BD
        const dadosContato = await controllerContato.buscarContato(id);

        //Valida se existe retorno de dados
        if (dadosContato) {   //Status 200
            statusCode = 200;
            message = dadosContato;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para listar todos os contatos existentes no BD---------- //
app.get('/v1/contato', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerTipoBebida
    const controllerContato = require('../controller/controller_contato');

    //Retorna todos os tipos de contatos existentes no BD
    const dadosContatos = await controllerContato.listarContatos();

    //Valida se existe retorno de dados
    if (dadosContatos) {   //Status 200
        statusCode = 200;
        message = dadosContatos;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para atualizar um contato existente---------- //
app.put('/v1/contato/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de sabor bebida
                const controllerContato = require('../controller/controller_contato');
                //Chama a funcao novoFuncionario da controller e encaminha os dados do body 
                const novoContato = await controllerContato.atualizarContato(dadosBody);

                statusCode = novoContato.status;
                message = novoContato.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para excluir tipo um contato existente---------- //
app.delete('/v1/contato/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de tipo de bebida
        const controllerContato = require('../controller/controller_contato');
        
        //Chama a funcao para excluir um item 
        const contato = await controllerContato.excluirContato(id);

        statusCode = contato.status;
        message = contato.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});





// ---------- EndPoint para inserir pizza componentes ---------- //
app.post('/v1/pizzaComponentes', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de sabor bebida
            const controllerPizzaComponentes = require('../controller/controller_pizza_componentes');
            //Chama a funcao novoAluno da controller e encaminha os dados do body 
            const novoPizzaComponentes = await controllerPizzaComponentes.novoPizzaComponentes(dadosBody)
            statusCode = novoPizzaComponentes.status;
            message = novoPizzaComponentes.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

// ---------- EndPoint para buscar pizza componentes pelo ID---------- //
app.get('/v1/pizzaComponentes/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerSaborBebida
        const controllerPizzaComponentes = require('../controller/controller_pizza_componentes');

        //Retorna todos os sabores de bebidas existentes no BD
        const dadosPizzaComponentes = await controllerPizzaComponentes.buscarPizzaComponentes(id);

        //Valida se existe retorno de dados
        if (dadosPizzaComponentes) {   //Status 200
            statusCode = 200;
            message = dadosPizzaComponentes ;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para listar todas as pizzas existentes no BD---------- //
app.get('/v1/pizzaComponentes', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerTipoBebida
    const controllerPizzaComponentes = require('../controller/controller_pizza_componentes');

    //Retorna todos os tipos de contatos existentes no BD
    const dadosPizzaComponentes = await controllerPizzaComponentes.listarPizzaComponentes();

    //Valida se existe retorno de dados
    if (dadosPizzaComponentes) {   //Status 200
        statusCode = 200;
        message = dadosPizzaComponentes;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para atualizar um componente de pizza existente---------- //
app.put('/v1/pizzaComponentes/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de sabor bebida
                const controllerPizzaComponentes = require('../controller/controller_pizza_componentes');
                //Chama a funcao novoFuncionario da controller e encaminha os dados do body 
                const novoPizzaComponentes = await controllerPizzaComponentes.atualizarPizzaComponentes(dadosBody);

                statusCode = novoPizzaComponentes.status;
                message = novoPizzaComponentes.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para excluir um pizza componentes existente---------- //
app.delete('/v1/pizzaComponentes/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de tipo de bebida
        const controllerPizzaComponentes = require('../controller/controller_pizza_componentes');
        
        //Chama a funcao para excluir um item 
        const contato = await controllerPizzaComponentes.excluirPizzaComponentes(id);

        statusCode = contato.status;
        message = contato.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    

    response.status(statusCode);
    response.json(message);

});




// ---------- EndPoint para inserir uma bebida ---------- //
app.post('/v1/bebida', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de sabor bebida
            const controllerBebida = require('../controller/controller_bebida');
            //Chama a funcao novoAluno da controller e encaminha os dados do body 
            const novaBebida = await controllerBebida.novaBebida(dadosBody)
            statusCode = novaBebida.status;
            message = novaBebida.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

// ---------- EndPoint para buscar uma bebida pelo ID---------- //
app.get('/v1/bebida/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerSaborBebida
        const controllerBebida = require('../controller/controller_bebida');

        //Retorna todos os sabores de bebidas existentes no BD
        const dadosBebida = await controllerBebida.buscarBebida(id);

        //Valida se existe retorno de dados
        if (dadosBebida) {   //Status 200
            statusCode = 200;
            message = dadosBebida ;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para listar todas as bebidas existentes no BD---------- //
app.get('/v1/bebida', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerTipoBebida
    const controllerBebida = require('../controller/controller_bebida');

    //Retorna todos os tipos de contatos existentes no BD
    const dadosBebida = await controllerBebida.listarBebidas();

    //Valida se existe retorno de dados
    if (dadosBebida) {   //Status 200
        statusCode = 200;
        message = dadosBebida;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para atualizar uma bebida existente---------- //
app.put('/v1/bebida/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de sabor bebida
                const controllerBebida = require('../controller/controller_bebida');
                //Chama a funcao novoFuncionario da controller e encaminha os dados do body 
                const novaBebida = await controllerBebida.atualizarBebida(dadosBody);

                statusCode = novaBebida.status;
                message = novaBebida.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para excluir um pizza componentes existente---------- //
app.delete('/v1/bebida/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de tipo de bebida
        const controllerBebida= require('../controller/controller_bebida');
        
        //Chama a funcao para excluir um item 
        const bebida = await controllerBebida.excluirBebida(id);

        statusCode = bebida.status;
        message = bebida.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    

    response.status(statusCode);
    response.json(message);

});





// ---------- EndPoint para inserir uma pizza favorita ---------- //
app.post('/v1/pizzaFavorita', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de sabor bebida
            const controllerPizzaFavorita = require('../controller/controller_pizza_favorito');
            //Chama a funcao novoAluno da controller e encaminha os dados do body 
            const novaPizzaFavorito = await controllerPizzaFavorita.novaPizzaFavorito(dadosBody)
            statusCode = novaPizzaFavorito.status;
            message = novaPizzaFavorito.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

// ---------- EndPoint para buscar uma pizza favorita pelo ID---------- //
app.get('/v1/pizzaFavorito/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerSaborBebida
        const controllerPizzaFavorito = require('../controller/controller_pizza_favorito');

        //Retorna todos os sabores de bebidas existentes no BD
        const dadosPizzaFavorito= await controllerPizzaFavorito.buscarPizzaFavorita(id);

        //Valida se existe retorno de dados
        if (dadosPizzaFavorito) {   //Status 200
            statusCode = 200;
            message = dadosPizzaFavorito ;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para listar todas as pizzas favoritas existentes no BD---------- //
app.get('/v1/pizzaFavorito', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerTipoBebida
    const controllerPizzaFavorito = require('../controller/controller_pizza_favorito');

    //Retorna todos os tipos de contatos existentes no BD
    const dadosPizzaFavorito = await controllerPizzaFavorito.listarPizzasFavoritas();

    //Valida se existe retorno de dados
    if (dadosPizzaFavorito) {   //Status 200
        statusCode = 200;
        message = dadosPizzaFavorito;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para atualizar uma pizza favorita existente---------- //
app.put('/v1/pizzaFavorito/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de sabor bebida
                const controllerPizzaFavorito = require('../controller/controller_pizza_favorito');
                //Chama a funcao novoFuncionario da controller e encaminha os dados do body 
                const novaPizzaFavorito = await controllerPizzaFavorito.atualizarPizzaFavorito(dadosBody);

                statusCode = novaPizzaFavorito.status;
                message = novaPizzaFavorito.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para excluir uma pizza favorita  existente---------- //
app.delete('/v1/pizzaFavorito/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de tipo de bebida
        const controllerPizzaFavorito= require('../controller/controller_pizza_favorito');
        
        //Chama a funcao para excluir um item 
        const pizzaFavorito = await controllerPizzaFavorito.excluirPizzaFavorito(id);

        statusCode = pizzaFavorito.status;
        message = pizzaFavorito.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    

    response.status(statusCode);
    response.json(message);

});







// ---------- EndPoint para inserir uma pizza promocao ---------- //
app.post('/v1/pizzaPromocao', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de sabor bebida
            const controllerPizzaPromocao = require('../controller/controller_pizza_promocao');
            //Chama a funcao novoAluno da controller e encaminha os dados do body 
            const novaPizzaPromocao = await controllerPizzaPromocao.novaPizzaPromocao(dadosBody)
            statusCode = novaPizzaPromocao.status;
            message = novaPizzaPromocao.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

// ---------- EndPoint para buscar uma promocao de uma pizza pelo ID---------- //
app.get('/v1/pizzaPromocao/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerSaborBebida
        const controllerPizzaPromocao = require('../controller/controller_pizza_promocao');

        //Retorna todos os sabores de bebidas existentes no BD
        const dadosPizzaPromocao= await controllerPizzaPromocao.buscarPizzaPromocao(id);

        //Valida se existe retorno de dados
        if (dadosPizzaPromocao) {   //Status 200
            statusCode = 200;
            message = dadosPizzaPromocao;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para listar todas as promocoes de pizzas existentes no BD---------- //
app.get('/v1/pizzaPromocao', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerTipoBebida
    const controllerPizzaPromocao = require('../controller/controller_pizza_promocao');

    //Retorna todos os tipos de contatos existentes no BD
    const dadosPizzaPromocao = await controllerPizzaPromocao.listarPizzasPromocao();

    //Valida se existe retorno de dados
    if (dadosPizzaPromocao) {   //Status 200
        statusCode = 200;
        message = dadosPizzaPromocao;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para atualizar uma promocao de pizza existente---------- //
app.put('/v1/pizzaPromocao/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de sabor bebida
                const controllerPizzaPromocao = require('../controller/controller_pizza_promocao');
                //Chama a funcao novoFuncionario da controller e encaminha os dados do body 
                const novaPizzaPromocao = await controllerPizzaPromocao.atualizarPizzaPromocao(dadosBody);

                statusCode = novaPizzaPromocao.status;
                message = novaPizzaPromocao.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para excluir uma promocao de pizza existente---------- //
app.delete('/v1/pizzaPromocao/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de tipo de bebida
        const controllerPizzaPromocao= require('../controller/controller_pizza_promocao');
        
        //Chama a funcao para excluir um item 
        const pizzaPromocao = await controllerPizzaPromocao.excluirPizzaPromocao(id);

        statusCode = pizzaPromocao.status;
        message = pizzaPromocao.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    

    response.status(statusCode);
    response.json(message);

});






// ---------- EndPoint para inserir uma promocao de bebida ---------- //
app.post('/v1/bebidaPromocao', cors(), jsonParser, async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
    //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}') {
            //imnport do arquivo da controller de sabor bebida
            const controllerBebidaPromocao = require('../controller/controller_bebida_promocao');
            //Chama a funcao novoAluno da controller e encaminha os dados do body 
            const novaBebidaPromocao = await controllerBebidaPromocao.novaBebidaPromocao(dadosBody)
            statusCode = novaBebidaPromocao.status;
            message = novaBebidaPromocao.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    } else {
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

// ---------- EndPoint para buscar uma promocao de uma bebida pelo ID---------- //
app.get('/v1/bebidaPromocao/:id', cors(), async function (request, response) {

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined) {
        //import do arquivo controllerSaborBebida
        const controllerBebidaPromocao = require('../controller/controller_bebida_promocao');

        //Retorna todos os sabores de bebidas existentes no BD
        const dadosBebidaPromocao= await controllerBebidaPromocao.buscarBebidaPromocao(id);

        //Valida se existe retorno de dados
        if (dadosBebidaPromocao) {   //Status 200
            statusCode = 200;
            message = dadosBebidaPromocao;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para listar todas as promocoes de bebidas existentes no BD---------- //
app.get('/v1/bebidaPromocao', cors(), async function (request, response) {

    let statusCode;
    let message;

    //import do arquivo controllerTipoBebida
    const controllerBebidaPromocao = require('../controller/controller_bebida_promocao');

    //Retorna todos os tipos de contatos existentes no BD
    const dadosBebidaPromocao = await controllerBebidaPromocao.listarBebidasPromocao();

    //Valida se existe retorno de dados
    if (dadosBebidaPromocao) {   //Status 200
        statusCode = 200;
        message = dadosBebidaPromocao;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para atualizar uma promocao de bebidas existente---------- //
app.put('/v1/pizzaPromocao/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudo
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de sabor bebida
                const controllerBebidaPromocao = require('../controller/controller_bebida_promocao');
                //Chama a funcao novoFuncionario da controller e encaminha os dados do body 
                const novaBebidaPromocao = await controllerBebidaPromocao.atualizarBebidaPromocao(dadosBody);

                statusCode = novaBebidaPromocao.status;
                message = novaBebidaPromocao.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});

// ---------- EndPoint para excluir uma promocao de bebida existente---------- //
app.delete('/v1/bebidaPromocao/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de tipo de bebida
        const controllerBebidaPromocao= require('../controller/controller_bebida_promocao');
        
        //Chama a funcao para excluir um item 
        const bebidaPromocao = await controllerBebidaPromocao.excluirBebidaPromocao(id);

        statusCode = bebidaPromocao.status;
        message = bebidaPromocao.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    

    response.status(statusCode);
    response.json(message);

});







//Ativa o servidor para receber requisicoes HTTP
app.listen(5050 , function () {
    console.log('Servidor aguardando requisicoes! :)');
});

module.exports = app