DELIMITER $
	
    CREATE TRIGGER delete_protudo_ingrediente
		BEFORE DELETE ON tbl_ingrediente
			FOR EACH ROW 
				BEGIN
					DELETE FROM tbl_produto_ingrediente WHERE tbl_produto_ingrediente.id_ingrediente = OLD.id;
                END$

DELIMITER $

	CREATE TRIGGER delete_pizza_ingrediente
		BEFORE DELETE ON tbl_pizza
			FOR EACH ROW
				BEGIN
					DELETE FROM tbl_ingrediente_pizza WHERE tbl_ingrediente_pizza.id_pizza = OLD.id;
                END$