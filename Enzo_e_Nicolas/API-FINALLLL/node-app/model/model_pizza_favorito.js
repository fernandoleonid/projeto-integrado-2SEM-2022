/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Enzo Diógenes do Prado
 * Data Criacao: 11/12/2022
 * Versao: 1.0
 *********************************************************************/

//Funcao para inserir um novo contato
const insertPizzaFavorito = async function (pizzaFavorito) {
    try {
        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_pizza_favorito(id_pizza)
                    values('${pizzaFavorito.id_pizza}')`;
        
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
const updatePizzaFavorito = async function (pizzaFavorito) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_pizza_favorito set id_pizza              = '${pizzaFavorito.id_pizza}', 
                                                   
                                        
                            where id = '${pizzaFavorito.id}'
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
const deletePizzaFavorito = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();
        reutl
        
        let sql = `delete from tbl_pizza_favorito
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
const selectAllPizzasFavoritos = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)
    const rsPizzaFavoritos = await prisma.$queryRaw `select tbl_pizza_favorito.id as IDFavorito, tbl_pizza.sabor as pizzaSabor, tbl_tamanho_pizza.tamanho as tamanhoPizza, tbl_tamanho_pizza.preco as precoPizza FROM tbl_pizza_favorito
                                                LEFT JOIN tbl_pizza on tbl_pizza.id = tbl_pizza_favorito.id_pizza
                                                LEFT JOIN tbl_pizza_componentes on tbl_pizza_componentes.id = tbl_pizza_componentes.id_pizza
                                                LEFT JOIN tbl_tamanho_pizza on tbl_tamanho_pizza.id = tbl_pizza_componentes.id_tamanho_pizza`;

  

    if (rsPizzaFavoritos.length > 0)
        return rsPizzaFavoritos;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdPizzaFavorito = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsFuncionarios) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select tbl_pizza_favorito.id as IDFavorito, tbl_pizza.sabor as pizzaSabor, tbl_tamanho_pizza.tamanho as tamanhoPizza, tbl_tamanho_pizza.preco as precoPizza FROM tbl_pizza_favorito
                LEFT JOIN tbl_pizza on tbl_pizza.id = tbl_pizza_favorito.id_pizza
                LEFT JOIN tbl_pizza_componentes on tbl_pizza_componentes.id = tbl_pizza_componentes.id_pizza
                LEFT JOIN tbl_tamanho_pizza on tbl_tamanho_pizza.id = tbl_pizza_componentes.id_tamanho_pizza where tbl_pizza_favorito.id = ${id} `

    const rsPizzaFavoritos = await prisma.$queryRawUnsafe(sql) ;

    if (rsPizzaFavoritos.length > 0)
        return rsPizzaFavoritos;
    else
        return false;

}

module.exports={
    insertPizzaFavorito,
    updatePizzaFavorito,
    deletePizzaFavorito,
    selectAllPizzasFavoritos,
    selectByIdPizzaFavorito
}