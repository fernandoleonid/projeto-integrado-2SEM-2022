CREATE DATABASE  IF NOT EXISTS `db_senailicious` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_senailicious`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: db_senailicious
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('2d4473ce-4244-4f5b-bbef-61a62fbb0f5c','b00a5b996384d71055c3ebe9483b4719a582138ac0c33a7de36ed780194f2bc4','2022-12-13 01:14:44.128','20221212222458_alteracoes_no_banco',NULL,NULL,'2022-12-13 01:14:44.099',1),('7ef29e5d-72f3-4fed-b22b-d26dd4cb87eb','c3e25c4056392550fe0b9934762e0f0ef7d8789a3bf93f99c6a6a727137f0ca1','2022-12-13 01:14:44.064','20221207135848_alterando_a_tabela_de_administrador',NULL,NULL,'2022-12-13 01:14:44.051',1),('c5157c86-bc26-4ff2-bcae-f1b2fa58f7ad','aca4afd390fd62c9e21e1efc2c7ce78ac6a8b6c74d9bf881cc879577248acefe','2022-12-13 01:14:44.049','20221130133434_conectando_o_banco',NULL,NULL,'2022-12-13 01:14:44.027',1),('f8ccde1a-f11d-4621-aafb-26914521b1a9','0e7f1705e8e2e4bd6e4091ea0f0a891ae8947e3e95bd60a5978b7502f664ffad','2022-12-13 01:14:44.096','20221211210226_alterando_a_tabela_de_produtos',NULL,NULL,'2022-12-13 01:14:44.067',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clear_db`
--

DROP TABLE IF EXISTS `clear_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clear_db` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clear_db`
--

LOCK TABLES `clear_db` WRITE;
/*!40000 ALTER TABLE `clear_db` DISABLE KEYS */;
/*!40000 ALTER TABLE `clear_db` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_administrador`
--

DROP TABLE IF EXISTS `tbl_administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_administrador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `foto` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_administrador`
--

LOCK TABLES `tbl_administrador` WRITE;
/*!40000 ALTER TABLE `tbl_administrador` DISABLE KEYS */;
INSERT INTO `tbl_administrador` VALUES (2,'matheus@gmail.com','321321','matheus','https://i.pinimg.com/736x/34/8e/a4/348ea49f89162a070660dcdebd8e167a.jpg');
/*!40000 ALTER TABLE `tbl_administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_bebida`
--

DROP TABLE IF EXISTS `tbl_bebida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_bebida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `preco` decimal(4,2) NOT NULL,
  `tamanho` varchar(45) NOT NULL,
  `imagem` varchar(300) NOT NULL,
  `id_tipo_bebida` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_tipo_bebida_bebida` (`id_tipo_bebida`),
  CONSTRAINT `FK_tipo_bebida_bebida` FOREIGN KEY (`id_tipo_bebida`) REFERENCES `tbl_tipo_bebida` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_bebida`
--

LOCK TABLES `tbl_bebida` WRITE;
/*!40000 ALTER TABLE `tbl_bebida` DISABLE KEYS */;
INSERT INTO `tbl_bebida` VALUES (2,'Suco de Laranja',6.90,'350 ml','https://comeonburger.com.br/wp-content/uploads/2019/12/laranja.jpg',2),(3,'Coca Cola',7.90,'350 ml','https://comeonburger.com.br/wp-content/uploads/2019/12/laranja.jpg',3);
/*!40000 ALTER TABLE `tbl_bebida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ingrediente`
--

DROP TABLE IF EXISTS `tbl_ingrediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ingrediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ingrediente`
--

LOCK TABLES `tbl_ingrediente` WRITE;
/*!40000 ALTER TABLE `tbl_ingrediente` DISABLE KEYS */;
INSERT INTO `tbl_ingrediente` VALUES (1,'Calabresa'),(2,'Cebola'),(3,'Azeitona'),(4,'Água'),(5,'Laranja'),(6,'Açucar'),(7,'Morango'),(8,'Chocolate'),(9,'cebolinha');
/*!40000 ALTER TABLE `tbl_ingrediente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ingrediente_bebida`
--

DROP TABLE IF EXISTS `tbl_ingrediente_bebida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ingrediente_bebida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_bebida` int NOT NULL,
  `id_ingrediente` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_bebida_bebida_ingrediente` (`id_bebida`),
  KEY `FK_ingrediente_bebida_ingrediente` (`id_ingrediente`),
  CONSTRAINT `FK_bebida_bebida_ingrediente` FOREIGN KEY (`id_bebida`) REFERENCES `tbl_bebida` (`id`),
  CONSTRAINT `FK_ingrediente_bebida_ingrediente` FOREIGN KEY (`id_ingrediente`) REFERENCES `tbl_ingrediente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ingrediente_bebida`
--

LOCK TABLES `tbl_ingrediente_bebida` WRITE;
/*!40000 ALTER TABLE `tbl_ingrediente_bebida` DISABLE KEYS */;
INSERT INTO `tbl_ingrediente_bebida` VALUES (1,2,4),(2,2,5),(3,2,6);
/*!40000 ALTER TABLE `tbl_ingrediente_bebida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ingrediente_pizza`
--

DROP TABLE IF EXISTS `tbl_ingrediente_pizza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ingrediente_pizza` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_pizza` int NOT NULL,
  `id_ingrediente` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_pizza_pizza_ingrediente` (`id_pizza`),
  KEY `FK_ingrediente_pizza_ingrediente` (`id_ingrediente`),
  CONSTRAINT `FK_ingrediente_pizza_ingrediente` FOREIGN KEY (`id_ingrediente`) REFERENCES `tbl_ingrediente` (`id`),
  CONSTRAINT `FK_pizza_pizza_ingrediente` FOREIGN KEY (`id_pizza`) REFERENCES `tbl_pizza` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ingrediente_pizza`
--

LOCK TABLES `tbl_ingrediente_pizza` WRITE;
/*!40000 ALTER TABLE `tbl_ingrediente_pizza` DISABLE KEYS */;
INSERT INTO `tbl_ingrediente_pizza` VALUES (4,2,1),(5,2,2),(6,2,3),(10,3,7),(11,3,8);
/*!40000 ALTER TABLE `tbl_ingrediente_pizza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_mensagem`
--

DROP TABLE IF EXISTS `tbl_mensagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_mensagem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `email` varchar(256) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `mensagem` text NOT NULL,
  `id_tipo_mensagem` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_tipo_mensagem_mensagem` (`id_tipo_mensagem`),
  CONSTRAINT `FK_tipo_mensagem_mensagem` FOREIGN KEY (`id_tipo_mensagem`) REFERENCES `tbl_tipo_mensagem` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_mensagem`
--

LOCK TABLES `tbl_mensagem` WRITE;
/*!40000 ALTER TABLE `tbl_mensagem` DISABLE KEYS */;
INSERT INTO `tbl_mensagem` VALUES (1,'Larissa','larissanunes@senai.com','35993326','11 986271996','Sugiro que coloquem mais calabresa na pizza de calabresa.',1),(4,'string','string','string','string','string',1);
/*!40000 ALTER TABLE `tbl_mensagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_pizza`
--

DROP TABLE IF EXISTS `tbl_pizza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_pizza` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `preco` decimal(4,2) NOT NULL,
  `tamanho` varchar(45) NOT NULL,
  `imagem` varchar(300) NOT NULL,
  `quantidade_vezes_favorito` int NOT NULL,
  `id_tipo_pizza` int NOT NULL,
  `desconto` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_tipo_pizza_pizza` (`id_tipo_pizza`),
  CONSTRAINT `FK_tipo_pizza_pizza` FOREIGN KEY (`id_tipo_pizza`) REFERENCES `tbl_tipo_pizza` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pizza`
--

LOCK TABLES `tbl_pizza` WRITE;
/*!40000 ALTER TABLE `tbl_pizza` DISABLE KEYS */;
INSERT INTO `tbl_pizza` VALUES (2,'Calabresa',39.90,'Grande','https://img.freepik.com/fotos-premium/pizza-a-brasileira-com-queijo-mussarela-linguica-calabresa-e-cebola-vista-do-topo_261158-2018.jpg?w=2000',0,1,NULL),(3,'Morango com chocolate',59.90,'Grande','https://i.pinimg.com/originals/c4/85/c4/c485c4c00f738d6329c40c8a8ef72997.jpg',0,2,NULL),(4,'com chocolate',50.00,'Grande','https://master-b2b-img.azureedge.net/product/1785-cerveja-heineken-lager-beer-cc-600ml-g.jpg',0,1,NULL);
/*!40000 ALTER TABLE `tbl_pizza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_bebida`
--

DROP TABLE IF EXISTS `tbl_tipo_bebida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_bebida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_bebida`
--

LOCK TABLES `tbl_tipo_bebida` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_bebida` DISABLE KEYS */;
INSERT INTO `tbl_tipo_bebida` VALUES (1,'Alcoólica'),(2,'Suco'),(3,'Refrigerante');
/*!40000 ALTER TABLE `tbl_tipo_bebida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_mensagem`
--

DROP TABLE IF EXISTS `tbl_tipo_mensagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_mensagem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_mensagem`
--

LOCK TABLES `tbl_tipo_mensagem` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_mensagem` DISABLE KEYS */;
INSERT INTO `tbl_tipo_mensagem` VALUES (1,'Sugestão'),(2,'Crítica');
/*!40000 ALTER TABLE `tbl_tipo_mensagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_pizza`
--

DROP TABLE IF EXISTS `tbl_tipo_pizza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_pizza` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_pizza`
--

LOCK TABLES `tbl_tipo_pizza` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_pizza` DISABLE KEYS */;
INSERT INTO `tbl_tipo_pizza` VALUES (1,'undefined'),(2,'Doce');
/*!40000 ALTER TABLE `tbl_tipo_pizza` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-13  6:12:21
