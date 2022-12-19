/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Enzo Diógenes do Prado
 * Data Criacao: 11/12/2022
 * Versao: 1.0
 *********************************************************************/

//Funcao para inserir uma bebida
const insertBebida= async function (bebida) {
    try {
        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_bebida(preco, volume, id_tipo_bebida, id_sabor_bebida, id_marca_bebida)
                    values('${bebida.preco}', '${bebida.volume}', '${bebida.id_tipo_bebida}', '${bebida.id_sabor_bebida}', '${bebida.id_marca_bebida}')`;
        
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
const updateBebida = async function (bebida) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_bebida set preco                              = '${bebida.preco}', 
                                         volume                             = '${bebida.volume}', 
                                         id_tipo_bebida                     = '${bebida.id_tipo_bebida}',
                                         id_sabor_bebida                    = '${bebida.id_sabor_bebida}',
                                         id_marca_bebida                    = '${bebida.id_marca_bebida}'
                                        
                            where id = '${bebida.id}'
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
const deleteBebida = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();
        reutl
        
        let sql = `delete from tbl_bebida
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
const selectBebidas = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)
    const rsBebida = await prisma.$queryRaw `SELECT tbl_bebida.id as IDbebida, tbl_tipo_bebida.tipo, tbl_sabor_bebida.sabor, tbl_marca_bebida.marca, tbl_bebida.preco, tbl_bebida.volume FROM tbl_bebida
                                            INNER JOIN tbl_tipo_bebida on tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida
                                            INNER JOIN tbl_sabor_bebida on tbl_sabor_bebida.id = tbl_bebida.id_sabor_bebida
                                            INNER JOIN tbl_marca_bebida on tbl_marca_bebida.id = tbl_bebida.id_marca_bebida`;


    if (rsBebida.length > 0)
        return rsBebida;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdBebida = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)

    let sql = `SELECT tbl_tipo_bebida.tipo, tbl_sabor_bebida.sabor, tbl_marca_bebida.marca, tbl_bebida.preco, tbl_bebida.volume FROM tbl_bebida
                INNER JOIN tbl_tipo_bebida on tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida
                INNER JOIN tbl_sabor_bebida on tbl_sabor_bebida.id = tbl_bebida.id_sabor_bebida
                INNER JOIN tbl_marca_bebida on tbl_marca_bebida.id = tbl_bebida.id_marca_bebida where tbl_bebida.id = ${id} `

    const rsBebida = await prisma.$queryRawUnsafe(sql) ;

    if (rsBebida.length > 0)
        return rsBebida;
    else
        return false;

}

module.exports={
    insertBebida,
    updateBebida,
    deleteBebida,
    selectBebidas,
    selectByIdBebida    
}