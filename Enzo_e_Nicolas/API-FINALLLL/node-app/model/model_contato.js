/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Enzo Diógenes do Prado
 * Data Criacao: 11/12/2022
 * Versao: 1.0
 *********************************************************************/

//Funcao para inserir um novo contato
const insertContato = async function (contato) {
    try {
        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_contato(nome, telefone, celular, email, mensagem)
                    values('${contato.nome}', '${contato.telefone}', '${contato.celular}', '${contato.email}', '${contato.mensagem}')`;
        
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
const updateContato = async function (contato) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_contato set nome              = '${contato.nome}', 
                                        telefone            = '${contato.telefone}', 
                                        celular             = '${contato.celular}', 
                                        email               = '${contato.email}', 
                                        mensagem            = '${contato.mensagem}'
                            where id = '${contato.id}'
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
const deleteContato = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `delete from tbl_contato
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
const selectAllContatos = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)
    const rsContatos = await prisma.$queryRaw `select cast(id as float) as id, nome, telefone, celular, email, mensagem from tbl_contato order by id desc`;

    console.log(rsContatos);

    if (rsContatos.length > 0)
        return rsContatos;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdContato = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select cast(id as float) as id, 
                    nome,
                    telefone, 
                    celular, 
                    email,
                    mensagem
                from tbl_contato
                where id = ${id}`

    const rsContato = await prisma.$queryRawUnsafe(sql) ;

    if (rsContato.length > 0)
        return rsContato;
    else
        return false;

}

module.exports={
    insertContato,
    updateContato,
    deleteContato,
    selectAllContatos,
    selectByIdContato
}