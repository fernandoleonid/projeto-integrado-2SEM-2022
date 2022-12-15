/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Enzo Diógenes do Prado
 * Data Criacao: 11/12/2022
 * Versao: 1.0
 *********************************************************************/

// ****** // ---------- EndPoints de Pizza---------- // ******








//Funcao para inserir uma nova promocao
const insertBebidaPromocao = async function (bebidaPromocao) {
    try {
        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_bebida_promocao(preco_promocao, id_bebida)
                    values('${bebidaPromocao.preco_promocao}', '${bebidaPromocao.id_bebida}')`;
        
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
const updateBebidaPromocao = async function (bebidaPromocao) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_bebida_promocao set preco_promocao            = '${pizzaPromocao.preco}',
                                                  id_bebida                 = '${pizzaPromocao.id_bebida}' 
                                                   
                                        
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
const deleteBebidaPromocao = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();
        reutl
        
        let sql = `delete from tbl_bebida_promocao
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
const selectAllBebidasPromocoes = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)
    const rsBebidasPromocoes = await prisma.$queryRaw `select tbl_promocao_bebida.id as IDPromocao, tbl_promocao_bebida.preco_promocao as preco, tbl_bebida.volume, tbl_tipo_bebida.tipo, tbl_sabor_bebida.sabor, tbl_marca_bebida.marca FROM tbl_promocao_bebida
                                                        INNER JOIN tbl_bebida on tbl_bebida.id = tbl_promocao_bebida.id_bebida
                                                        INNER JOIN tbl_marca_bebida on tbl_marca_bebida.id = tbl_bebida.id_marca_bebida
                                                        INNER JOIN tbl_sabor_bebida on tbl_sabor_bebida.id = tbl_bebida.id_sabor_bebida
                                                        INNER JOIN tbl_tipo_bebida on tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida;`;

  

    if (rsBebidasPromocoes.length > 0)
        return rsBebidasPromocoes;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdBebidaPromocao = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select tbl_promocao_bebida.id as IDPromocao, tbl_promocao_bebida.preco_promocao as preco, tbl_bebida.volume, tbl_tipo_bebida.tipo, tbl_sabor_bebida.sabor, tbl_marca_bebida.marca FROM tbl_promocao_bebida
                    INNER JOIN tbl_bebida on tbl_bebida.id = tbl_promocao_bebida.id_bebida
                    INNER JOIN tbl_marca_bebida on tbl_marca_bebida.id = tbl_bebida.id_marca_bebida
                    INNER JOIN tbl_sabor_bebida on tbl_sabor_bebida.id = tbl_bebida.id_sabor_bebida
                    INNER JOIN tbl_tipo_bebida on tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida; where tbl_bebida_promocao.id = ${id} `

    const rsBebidaPromocao = await prisma.$queryRawUnsafe(sql) ;

    if (rsBebidaPromocao.length > 0)
        return rsPizzaPromocao;
    else
        return false;

}

module.exports={
    insertBebidaPromocao,
    updateBebidaPromocao,
    deleteBebidaPromocao,
    selectAllBebidasPromocoes,
    selectByIdBebidaPromocao
}