/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Enzo Diógenes do Prado
 * Data Criacao: 10/12/2022
 * Versao: 1.0
 *********************************************************************/

//Funcao para inserir um novo funcionario
const insertPizzaria = async function (pizzaria) {
    try {
        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_pizzaria (nome, 
                                                rua, 
                                                bairro, 
                                                cep, 
                                                cidade,
                                                email,
                                                telefone,
                                                celular)
                                                values(
                                                    '${pizzaria.nome}',
                                                    '${pizzaria.rua}',
                                                    '${pizzaria.bairro}',
                                                    '${pizzaria.cep}',
                                                    '${pizzaria.cidade}',
                                                    '${pizzaria.email}',
                                                    '${pizzaria.telefone}',
                                                    '${pizzaria.celular}'
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


//Funcao para atualizar um registro no BD
const updatePizzaria = async function (pizzaria) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_pizzaria set nome            = '${pizzaria.nome}', 
                                        rua                   = '${pizzaria.rua}', 
                                        bairro                = '${pizzaria.bairro}', 
                                        cep                   = '${pizzaria.cep}', 
                                        cidade                = '${pizzaria.cidade}',
                                        email                 = '${pizzaria.email}',
                                        telefone              = '${pizzaria.telefone}',
                                        celular               = '${pizzaria.celular}'                            
                            where id = '${pizzaria.id}'
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
const deletePizzaria = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `delete from tbl_pizzaria
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
const selectAllPizzarias = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)
    const rsPizzarias = await prisma.$queryRaw `select cast(id as float) as id, nome, rua, bairro, cep, cidade, email, telefone, celular from tbl_pizzaria order by id desc`;

    if (rsPizzarias.length > 0)
        return rsPizzarias;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdPizzaria = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select cast(id as float) as id, 
                    nome,
                    rua, 
                    bairro, 
                    cep,
                    cidade,
                    email,
                    telefone,
                    celular
                from tbl_pizzaria
                where id = ${id}`

    const rsPizzaria = await prisma.$queryRawUnsafe(sql) ;

    if (rsPizzaria.length > 0)
        return rsPizzaria;
    else
        return false;

}

module.exports={
    insertPizzaria,
    updatePizzaria,
    deletePizzaria,
    selectAllPizzarias,
    selectByIdPizzaria
}