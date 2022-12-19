/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Enzo Diógenes do Prado
 * Data Criacao: 11/12/2022
 * Versao: 1.0
 *********************************************************************/

//Funcao para inserir um novo contato
const insertPizzaComponentes = async function (pizzaComponetnes) {
    try {
        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_pizza_componentes(id_ingredientes_pizza, id_pizza, id_tamanho_pizza)
                    values('${pizzaComponetnes.id_ingredientes_pizza}', '${pizzaComponetnes.id_pizza}', '${pizzaComponetnes.id_tamanho_pizza}')`;
        
        // Executa o script SQL no Banco de dados 
        //($executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql);
        // console.log(result);

        //Verifica se o script foi executado com sucesso no BD
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}


//Funcao para atualizar um registro no BD
const updatePizzaComponentes = async function (pizzaComponentes) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_pizza_componentes set id_ingredientes_pizza               = '${pizzaComponentes.id_ingredientes_pizza}', 
                                                    id_pizza                            = '${pizzaComponentes.id_pizza}', 
                                                    id_tamanho_pizza                    = '${pizzaComponentes.id_tamanho_pizza}'
                                        
                            where id = '${pizzaComponentes.id}'
                        `;
       
        
        // Executa o script SQL no Banco de dados 
        //($executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql);
        
        //Verifica se o script foi executado com sucesso no BD
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }

}

//Funcao para excluir um registro no BD
const deletePizzaComponentes = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();
        reutl
        
        let sql = `delete from tbl_pizza_componentes
                            where id = '${id}'
                        `;
        // Executa o script SQL no Banco de dados 
        //($executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql);

        
        //Verifica se o script foi executado com sucesso no BD
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}

//Funcao para retornar todos os registros do BD
const selectAllPizzasComponentes = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)
    const rsPizzaComponentes = await prisma.$queryRaw `SELECT tbl_pizza.id as pizzaID, tbl_pizza.sabor, tbl_ingredientes_pizza.ingrediente, tbl_tamanho_pizza.tamanho, tbl_tamanho_pizza.preco FROM tbl_pizza_componentes
                                                        INNER JOIN tbl_pizza on tbl_pizza.id = tbl_pizza_componentes.id_pizza
                                                        INNER JOIN tbl_ingredientes_pizza on tbl_ingredientes_pizza.id = tbl_pizza_componentes.id_ingredientes_pizza
                                                        INNER JOIN tbl_tamanho_pizza on tbl_tamanho_pizza.id = tbl_pizza_componentes.id_tamanho_pizza;`;

    console.log(rsPizzaComponentes);

    if (rsPizzaComponentes.length > 0)
        return rsPizzaComponentes;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdPizzaComponentes = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)

    let sql = `SELECT tbl_pizza.id as pizzaID, tbl_pizza.sabor, tbl_ingredientes_pizza.ingrediente, tbl_tamanho_pizza.tamanho, tbl_tamanho_pizza.preco FROM tbl_pizza_componentes
                INNER JOIN tbl_pizza on tbl_pizza.id = tbl_pizza_componentes.id_pizza
                INNER JOIN tbl_ingredientes_pizza on tbl_ingredientes_pizza.id = tbl_pizza_componentes.id_ingredientes_pizza
                INNER JOIN tbl_tamanho_pizza on tbl_tamanho_pizza.id = tbl_pizza_componentes.id_tamanho_pizza where tbl_pizza.id = ${id} `

    const rsPizzaComponentes = await prisma.$queryRawUnsafe(sql) ;

    if (rsPizzaComponentes.length > 0)
        return rsPizzaComponentes;
    else
        return false;

}

module.exports={
    insertPizzaComponentes,
    updatePizzaComponentes,
    deletePizzaComponentes,
    selectAllPizzasComponentes,
    selectByIdPizzaComponentes
}