/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Nicolas Dobbeck
 * Data Criacao: 09/12/2022
 * Versao: 1.0
 *********************************************************************/

//Funcao para inserir um novo ingrediente
const insertIngrediente = async function (ingrediente) {
    try {
        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_ingredientes_pizza (ingrediente) values('${ingrediente.ingrediente}');`;
        
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
const updateIngrediente = async function (ingrediente) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_ingredientes_pizza set ingrediente            = '${ingrediente.ingrediente}'
                                                     where id                = '${ingrediente.id}'
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
const deleteIngrediente = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `delete from tbl_ingredientes_pizza
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
const selectAllIngredientes = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rspizza) para receber os dados do BD
    //através do script SQL (select)
    const rsIngredientes = await prisma.$queryRaw `select cast(id as float) as id, ingrediente from tbl_ingredientes_pizza order by id desc`;

    

    if (rsIngredientes.length > 0)
        return rsIngredientes;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdIngredientes = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsPizzas) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select cast(id as float) as id, 
                    ingrediente
                from tbl_pizza
                where id = ${id}`

    const rsIngredientes = await prisma.$queryRawUnsafe(sql) ;

    if (rsIngredientes.length > 0)
        return rsIngredientes;
    else
        return false;

}

module.exports={
    insertIngrediente,
    updateIngrediente,
    deleteIngrediente,
    selectAllIngredientes,
    selectByIdIngredientes
}