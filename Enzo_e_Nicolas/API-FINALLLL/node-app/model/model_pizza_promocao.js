/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Enzo Diógenes do Prado
 * Data Criacao: 11/12/2022
 * Versao: 1.0
 *********************************************************************/

//Funcao para inserir um novo contato
const insertPizzaPromocao = async function (pizzaPromocao) {
    try {
        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_promocao_pizza(preco, id_pizza)
                    values('${pizzaPromocao.preco}', '${pizzaPromocao.id_pizza}')`;
        
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
const updatePizzaPromocao = async function (pizzaPromocao) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_pizza_promocao set preco            = '${pizzaPromocao.preco}',
                                            id_pizza              = '${pizzaPromocao.id_pizza}' 
                                                   
                                        
                            where id = '${pizzaPromocao.id}'
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
const deletePizzaPromocao = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();
        reutl
        
        let sql = `delete from tbl_pizza_promocao
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
const selectAllPizzasPromocoes = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)
    const rsPizzasPromocoes = await prisma.$queryRaw `select tbl_promocao_pizza.id as IDPromocao, tbl_promocao_pizza.preco, tbl_pizza.sabor as pizzaSabor, tbl_tamanho_pizza.tamanho as tamanhoPizza  FROM tbl_promocao_pizza
                                                        LEFT JOIN tbl_pizza on tbl_pizza.id = tbl_promocao_pizza.id_pizza
                                                        LEFT JOIN tbl_pizza_componentes on tbl_pizza_componentes.id = tbl_pizza_componentes.id_pizza
                                                        LEFT JOIN tbl_tamanho_pizza on tbl_tamanho_pizza.id = tbl_pizza_componentes.id_tamanho_pizza;`;

  

    if (rsPizzasPromocoes.length > 0)
        return rsPizzasPromocoes;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdPizzaPromocao = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select tbl_promocao_pizza.id as IDPromocao, tbl_promocao_pizza.preco, tbl_pizza.sabor as pizzaSabor, tbl_tamanho_pizza.tamanho as tamanhoPizza  FROM tbl_promocao_pizza
                    LEFT JOIN tbl_pizza on tbl_pizza.id = tbl_promocao_pizza.id_pizza
                    LEFT JOIN tbl_pizza_componentes on tbl_pizza_componentes.id = tbl_pizza_componentes.id_pizza
                    LEFT JOIN tbl_tamanho_pizza on tbl_tamanho_pizza.id = tbl_pizza_componentes.id_tamanho_pizza where tbl_promocao_pizza.id = ${id} `

    const rsPizzaPromocao = await prisma.$queryRawUnsafe(sql) ;

    if (rsPizzaPromocao.length > 0)
        return rsPizzaPromocao;
    else
        return false;

}

module.exports={
    insertPizzaPromocao,
    updatePizzaPromocao,
    deletePizzaPromocao,
    selectAllPizzasPromocoes,
    selectByIdPizzaPromocao
}