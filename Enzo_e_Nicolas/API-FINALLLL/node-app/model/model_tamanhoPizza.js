/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Nicolas Dobbeck
 * Data Criacao: 09/12/2022
 * Versao: 1.0
 *********************************************************************/

//Funcao para inserir um novo tamanho de pizza 
const insertTamanhoPizza = async function (tamanhoPizza) {
    try {
        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_tamanho_pizza (tamanho, preco)
                                                values(
                                                    '${tamanhoPizza.tamanho}',
                                                    '${tamanhoPizza.preco}'
                                                )`;
        
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


//Funcao para atualizar um registro de tamanho no BD
const updateTamanhoPizza = async function (tamanhoPizza) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_tamanho_pizza set tamanho       = '${tamanhoPizza.tamanho}', 
                                                preco         = '${tamanhoPizza.preco}'
                            where id = '${tamanhoPizza.id}'
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
const deleteTamanhoPizza = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `delete from tbl_tamanho_pizza
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
const selectAllTamanhoPizza = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsTamanho) para receber os dados do BD
    //através do script SQL (select)
    const rsTamanho = await prisma.$queryRaw `select cast(id as float) as id, tamanho, preco from tbl_tamanho_pizza order by id desc`;

    

    if (rsTamanho.length > 0)
        return rsTamanho;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdTamanhoPizza = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsTamanho) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select cast(id as float) as id, 
                    tamanho,
                    preco
                from tbl_tamanho_pizza
                where id = ${id}`

    const rsTamanho = await prisma.$queryRawUnsafe(sql) ;

    if (rsTamanho.length > 0)
        return rsTamanho;
    else
        return false;

}

module.exports={
    insertTamanhoPizza,
    updateTamanhoPizza,
    deleteTamanhoPizza,
    selectAllTamanhoPizza,
    selectByIdTamanhoPizza
}
