/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Nicolas Dobbeck
 * Data Criacao: 05/12/2022
 * Versao: 1.0
 *********************************************************************/

//Funcao para inserir um nova pizza
const insertPizza = async function (pizza) {
    try {
        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_pizza (sabor, imagem) values('${pizza.sabor}', '${pizza.imagem}')`;
        console.log(sql);
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
const updatePizza = async function (pizza) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_pizza set sabor            = '${pizza.sabor}',
                                        imagem           = '${pizza.imagem}'
                            where id = '${pizza.id}'
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
const deletePizza = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `delete from tbl_pizza
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
const selectAllPizzas = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rspizza) para receber os dados do BD
    //através do script SQL (select)
    const rsPizzas = await prisma.$queryRaw `select id, sabor, imagem from tbl_pizza order by id desc`;

    console.log(rsPizzas);

    if (rsPizzas.length > 0)
        return rsPizzas;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdPizza = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsPizzas) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select id, 
                    sabor,
                    imagem
                from tbl_pizza
                where id = ${id}`

    const rsPizza = await prisma.$queryRawUnsafe(sql) ;

    if (rsPizza.length > 0)
        return rsPizza;
    else
        return false;

}

module.exports={
    insertPizza,
    updatePizza,
    deletePizza,
    selectAllPizzas,
    selectByIdPizza
}