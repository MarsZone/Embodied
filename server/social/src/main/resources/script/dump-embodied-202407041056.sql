-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 120.78.142.84    Database: embodied
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookmarks`
--

DROP TABLE IF EXISTS `bookmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmarks` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `uid` bigint NOT NULL,
  `tid` bigint NOT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarks`
--

LOCK TABLES `bookmarks` WRITE;
/*!40000 ALTER TABLE `bookmarks` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channel`
--

DROP TABLE IF EXISTS `channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '键值',
  `name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `desc` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '描述',
  `lang` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'zh_CN' COMMENT '语言',
  `order` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel`
--

LOCK TABLES `channel` WRITE;
/*!40000 ALTER TABLE `channel` DISABLE KEYS */;
INSERT INTO `channel` VALUES (1,'information_plaza','广场','所有消息','zh_CN',10000),(2,'music','音乐','音乐频道','zh_CN',10100),(3,'game','游戏','游戏频道','zh_CN',10200),(4,'movie','电影','电影频道','zh_CN',10300),(5,'sports','体育','体育频道','zh_CN',10400),(6,'entertainment','娱乐','娱乐频道','zh_CN',10500),(7,'news','时事新闻','时事新闻','zh_CN',10600);
/*!40000 ALTER TABLE `channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_like`
--

DROP TABLE IF EXISTS `comment_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_like` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tc_id` bigint NOT NULL,
  `uid` bigint NOT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_like`
--

LOCK TABLES `comment_like` WRITE;
/*!40000 ALTER TABLE `comment_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `file_name` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `original_file_name` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (2,'20240519145623419-8f56b1d6-world.jpeg','world.jpeg','2024-05-19 14:56:23'),(5,'20240409231020112-5b8bec60-1.png','1.png','2024-04-09 23:10:20'),(6,'20240409231020578-b57d001c-2.png','2.png','2024-04-09 23:10:21'),(7,'20240423112114497-e4686cb0-20240409223127614-b60b2202-1.png','20240409223127614-b60b2202-1.png','2024-04-23 11:21:15'),(8,'20240423112157756-471b90ed-36633503_p0.jpg','36633503_p0.jpg','2024-04-23 11:21:58'),(9,'20240423112424931-3440a29d-影 - 副本.jpg','影 - 副本.jpg','2024-04-23 11:24:25'),(10,'20240423112425046-8da5706d-2 format.png','2 format.png','2024-04-23 11:24:25'),(11,'20240423235720449-609dce76-Screenshot 2024-04-23 235720.png','Screenshot 2024-04-23 235720.png','2024-04-23 23:57:21'),(12,'20240424171443560-846e40d4-2 format.png','2 format.png','2024-04-24 17:14:44'),(13,'20240424175917238-fc48a4a6-2 format.png','2 format.png','2024-04-24 17:59:17'),(14,'20240424175855798-4fa5757d-2 format.png','2 format.png','2024-04-24 17:58:56'),(15,'20240425091252244-a9ea8510-屏幕截图 2021-10-21 160021.png','屏幕截图 2021-10-21 160021.png','2024-04-25 09:12:52'),(16,'20240425091450542-e36132e6-影.jpg','影.jpg','2024-04-25 09:14:51'),(17,'20240425095523563-58573270-2 format.png','2 format.png','2024-04-25 09:55:24'),(18,'20240425095513609-1db104a9-2 format.png','2 format.png','2024-04-25 09:55:14'),(19,'20240425095853759-43fb63ec-2 format.png','2 format.png','2024-04-25 09:58:54'),(20,'20240425180336768-0b3c60de-2 format.png','2 format.png','2024-04-25 18:03:37'),(21,'20240426124015234-a1c5b543-2 format.png','2 format.png','2024-04-26 12:40:15'),(22,'20240426124750184-6d54ceb9-2 format.png','2 format.png','2024-04-26 12:47:50'),(23,'20240426124820015-d3845595-2 format.png','2 format.png','2024-04-26 12:48:20'),(24,'20240426140547176-4756a0f1-2 format.png','2 format.png','2024-04-26 14:05:47'),(25,'20240426140704003-fa68eff6-2 format.png','2 format.png','2024-04-26 14:07:04'),(26,'20240426140831154-0360e9ad-2 format.png','2 format.png','2024-04-26 14:08:31'),(27,'20240426140931342-75d9edcc-if 3个条件2个TRUE.png','if 3个条件2个TRUE.png','2024-04-26 14:09:31'),(28,'20240426141427571-325b3ddb-if 3个条件2个TRUE.png','if 3个条件2个TRUE.png','2024-04-26 14:14:28'),(29,'20240426143954542-863ca61f-2 format.png','2 format.png','2024-04-26 14:39:55'),(30,'20240426143937796-3d93c35e-2 format.png','2 format.png','2024-04-26 14:39:38'),(31,'20240426144027454-3eadce1c-2 format.png','2 format.png','2024-04-26 14:40:28'),(32,'20240426144141684-7f07db44-2 format.png','2 format.png','2024-04-26 14:41:42'),(33,'20240426144340622-253b721b-2 format.png','2 format.png','2024-04-26 14:43:41'),(34,'20240426144535213-a1aa4665-2 format.png','2 format.png','2024-04-26 14:45:35'),(35,'20240426145824585-c57460e8-2 format.png','2 format.png','2024-04-26 14:58:25'),(36,'20240426145842085-6cfadbbc-2 format.png','2 format.png','2024-04-26 14:58:42'),(37,'20240426150027134-3a403bf2-2 format.png','2 format.png','2024-04-26 15:00:27'),(38,'20240426150101664-865c279b-2 format.png','2 format.png','2024-04-26 15:01:02'),(39,'20240426175244701-c368d79f-2 format.png','2 format.png','2024-04-26 17:52:45'),(40,'20240426175323379-c1c34fad-2 format.png','2 format.png','2024-04-26 17:53:23'),(41,'20240426175441360-fbc2f7ee-2 format.png','2 format.png','2024-04-26 17:54:41'),(42,'20240428230506645-8afdd74d-test.png','test.png','2024-04-28 23:05:07'),(43,'20240504000613052-eb3dd610-test.png','test.png','2024-05-04 00:06:13'),(44,'20240504000749518-b36a74ba-test.png','test.png','2024-05-04 00:07:50'),(45,'20240504000800412-3ab642d3-test.png','test.png','2024-05-04 00:08:01'),(46,'20240504000912845-b2ebe160-Screenshot 2024-04-23 235720.png','Screenshot 2024-04-23 235720.png','2024-05-04 00:09:13'),(47,'20240504001850314-c87a783f-test.png','test.png','2024-05-04 00:18:50'),(48,'20240504002253981-e9fb7330-test.png','test.png','2024-05-04 00:22:54'),(49,'20240504002428671-5163654f-test.png','test.png','2024-05-04 00:24:29'),(50,'20240506161808987-f99a534e-2 format.png','2 format.png','2024-05-06 16:18:11'),(51,'20240506161917751-0b7f1e5c-2 format.png','2 format.png','2024-05-06 16:19:18'),(52,'20240519142942518-ae25b3e8-world.jpeg','world.jpeg','2024-05-19 14:29:43'),(53,'20240519144044000-db27b5c5-world.jpeg','world.jpeg','2024-05-19 14:40:44'),(54,'20240519144416669-cafff9ca-world.jpeg','world.jpeg','2024-05-19 14:44:17'),(55,'20240519145623419-8f56b1d6-world.jpeg','world.jpeg','2024-05-19 14:56:23'),(56,'20240521004346617-8cc6037e-test.png','test.png','2024-05-21 00:43:47'),(57,'20240521004748671-1d55ddbb-test.png','test.png','2024-05-21 00:47:49'),(58,'20240521005106147-d29f75f7-test.png','test.png','2024-05-21 00:51:06'),(59,'20240521005330254-66baf294-test.png','test.png','2024-05-21 00:53:30'),(60,'20240527235749576-a94f2c5b-test.png','test.png','2024-05-27 23:57:50'),(61,'20240528003219997-a885a8fc-test.png','test.png','2024-05-28 00:32:20'),(62,'20240528003244148-36c46f63-test.png','test.png','2024-05-28 00:32:44'),(63,'20240528003724053-5c1c08cd-test.png','test.png','2024-05-28 00:37:24'),(64,'20240528003959557-8832b122-test.png','test.png','2024-05-28 00:40:00'),(65,'20240528004925567-ee24c7a9-test.png','test.png','2024-05-28 00:49:26'),(66,'20240528232957763-1cc10359-test.png','test.png','2024-05-28 23:29:58'),(67,'20240528233756856-b48a8dcf-test.png','test.png','2024-05-28 23:37:57'),(68,'20240528235239733-75577b32-test.png','test.png','2024-05-28 23:52:40'),(69,'20240617093809836-9077e250-影 - 副本.jpg','影 - 副本.jpg','2024-06-17 09:38:10');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendships`
--

DROP TABLE IF EXISTS `friendships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendships` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `uid_source` bigint NOT NULL,
  `uid_to` bigint NOT NULL,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'applying' COMMENT 'applying,friends,rejected,blocked',
  `reject_reason` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `msg_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendships`
--

LOCK TABLES `friendships` WRITE;
/*!40000 ALTER TABLE `friendships` DISABLE KEYS */;
INSERT INTO `friendships` VALUES (1,1,2,'friends',NULL,'2024-04-15 23:26:15','2024-04-21 15:52:23',NULL),(6,2,1,'applying',NULL,'2024-05-19 13:57:14','2024-05-19 13:57:14',13);
/*!40000 ALTER TABLE `friendships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `msg_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'u' COMMENT 'u 用户消息 s 系统消息',
  `sender_id` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `receiver_uid` bigint NOT NULL,
  `content` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `send_time` datetime NOT NULL,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'unread' COMMENT 'unread checked deleted',
  `mark` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' COMMENT 'important top',
  `sys_msg_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'notice',
  `receive_time` datetime DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (3,'u','1',2,'天气不错','2024-04-12 19:10:20','unCheck','','',NULL,NULL),(4,'g','g_2',1,'递四方速递','2024-04-13 23:46:54','unCheck','','',NULL,NULL),(5,'u','16',1,'第三方斯蒂芬递速递','2024-04-13 23:47:37','unCheck','','',NULL,NULL),(6,'u','2',1,'请问请问递四递','2024-04-13 23:47:45','checked','','',NULL,NULL),(7,'u','1',2,'第三方斯蒂芬递速递','2024-04-13 23:48:27','unCheck','','',NULL,NULL),(8,'u','2',1,'递四方速递范文芳','2024-04-13 23:48:27','checked','','',NULL,NULL),(9,'s','s_1',2,'you have a new friends request','2024-04-15 23:26:15','unCheck','','notice',NULL,NULL),(12,'u','1',1,'天气不错','2024-05-16 23:58:14','unCheck','','',NULL,NULL),(13,'s','2',1,'you have a new friends request','2024-05-19 13:57:14','unCheck','','notice',NULL,NULL),(14,'u','1',2,'天气不错','2024-05-20 00:19:40','unCheck','','',NULL,NULL),(15,'u','1',1,'天气不错','2024-05-20 23:58:52','unCheck','','',NULL,NULL),(16,'u','2',1,'测试','2024-05-21 00:03:19','unCheck','','',NULL,NULL),(17,'u','2',1,'再次测试','2024-05-21 00:06:46','unCheck','','',NULL,NULL),(18,'u','2',1,'1111','2024-05-22 09:06:50','unCheck','','',NULL,NULL),(19,'u','2',1,'测试webSocket','2024-05-25 19:11:24','unCheck','','',NULL,NULL),(20,'u','2',1,'测试ws','2024-05-25 19:13:12','unCheck','','',NULL,NULL),(21,'u','2',1,'','2024-05-25 20:14:12','unCheck','','',NULL,NULL),(22,'u','1',2,'测试websocket','2024-05-25 20:16:08','unCheck','','',NULL,NULL),(23,'u','1',2,'11111','2024-05-26 23:49:08','unCheck','','',NULL,NULL),(24,'u','2',1,'222','2024-05-27 00:03:32','unCheck','','',NULL,NULL),(25,'u','1',2,'333','2024-05-27 00:05:26','unCheck','','',NULL,NULL),(26,'u','2',1,'444','2024-05-27 00:15:54','unCheck','','',NULL,NULL),(27,'u','2',1,'555','2024-05-27 00:17:55','unCheck','','',NULL,NULL),(28,'u','1',2,'666','2024-05-27 00:27:12','unCheck','','',NULL,NULL),(112,'u','1',2,'测试websocket','2024-05-30 23:55:35','unCheck','','','2024-05-30 23:55:35','2024-05-30 23:55:35'),(113,'u','1',2,'111','2024-05-30 23:56:20','unCheck','','','2024-05-30 23:56:20','2024-05-30 23:56:20'),(114,'u','2',1,'777','2024-05-30 23:56:58','unCheck','','','2024-05-30 23:56:58','2024-05-30 23:56:58'),(115,'u','1',2,'888','2024-05-30 23:57:54','unCheck','','','2024-05-30 23:57:54','2024-05-30 23:57:54'),(116,'u','2',1,'999','2024-05-30 23:58:07','unCheck','','','2024-05-30 23:58:07','2024-05-30 23:58:07'),(117,'u','1',2,'000','2024-05-31 00:01:17','unCheck','','','2024-05-31 00:01:17','2024-05-31 00:01:17'),(118,'u','2',1,'111','2024-05-31 00:03:46','unCheck','','','2024-05-31 00:03:46','2024-05-31 00:03:46'),(119,'u','1',2,'222','2024-06-02 22:34:34','unCheck','','','2024-06-02 22:34:34','2024-06-02 22:34:34'),(120,'u','1',2,'123','2024-06-05 21:35:47','unCheck','','','2024-06-05 21:35:47','2024-06-05 21:35:47'),(121,'u','1',2,'奇了怪了','2024-06-05 21:39:58','unCheck','','','2024-06-05 21:39:58','2024-06-05 21:39:58'),(122,'u','1',2,'怎么没刷新？','2024-06-05 21:40:19','unCheck','','','2024-06-05 21:40:19','2024-06-05 21:40:19'),(123,'u','1',2,'3213','2024-06-06 01:13:32','unCheck','','','2024-06-06 01:13:32','2024-06-06 01:13:32'),(124,'u','1',2,'从手机发送消息。','2024-06-06 01:22:57','unCheck','','','2024-06-06 01:22:57','2024-06-06 01:22:57'),(125,'u','1',2,'牛逼，厉害！！！','2024-06-06 01:23:08','unCheck','','','2024-06-06 01:23:08','2024-06-06 01:23:08'),(126,'u','1',2,'111','2024-06-06 11:36:35','unCheck','','','2024-06-06 11:36:35','2024-06-06 11:36:35'),(127,'u','1',2,'','2024-06-06 11:36:36','unCheck','','','2024-06-06 11:36:36','2024-06-06 11:36:36'),(128,'u','1',2,'111','2024-06-08 17:06:11','unCheck','','','2024-06-08 17:06:11','2024-06-08 17:06:11'),(129,'u','2',1,'测试1','2024-06-08 17:09:49','unCheck','','','2024-06-08 17:09:49','2024-06-08 17:09:49'),(130,'u','2',1,'测试2','2024-06-08 17:10:03','unCheck','','','2024-06-08 17:10:03','2024-06-08 17:10:03'),(131,'u','1',2,'测试3','2024-06-08 17:10:26','unCheck','','','2024-06-08 17:10:26','2024-06-08 17:10:26'),(132,'u','1',2,'测试4','2024-06-08 17:11:33','unCheck','','','2024-06-08 17:11:33','2024-06-08 17:11:33'),(133,'u','1',2,'5','2024-06-18 12:19:09','unCheck','','','2024-06-18 12:19:09','2024-06-18 12:19:09'),(134,'u','1',2,'today','2024-06-18 16:04:33','unCheck','','','2024-06-18 16:04:33','2024-06-18 16:04:33'),(135,'u','2',1,'聊天','2024-06-24 09:33:58','unCheck','','','2024-06-24 09:33:58','2024-06-24 09:33:58');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (4,'风景'),(5,'西伯利亚'),(6,'雪山'),(7,'海风'),(8,'月球'),(9,'美食'),(10,'测试'),(11,'react');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `author_uid` bigint NOT NULL,
  `content_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'common',
  `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `publish_time` datetime DEFAULT NULL,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'draft' COMMENT '发布状态 draft草稿 released发布',
  `likes` int DEFAULT '0',
  `comments` int DEFAULT '0',
  `shares` int DEFAULT '0',
  `bookmarks` int DEFAULT '0',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `is_delete` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'false',
  `visits` bigint DEFAULT '0',
  `channel_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'information_plaza' COMMENT '默认是广场话题',
  `cover_img` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (44,'hellow world!',1,'common','new apps new life xD','2024-05-19 14:56:30','released',0,0,0,0,'2024-05-19 14:56:30','2024-05-19 14:56:30','false',5,'information_plaza',NULL),(46,'递四方速递发生的',1,'text','水电费色粉瓦房店市防守打法','2024-05-23 21:45:03','released',0,0,2,0,'2024-05-23 21:45:03','2024-05-23 21:45:03','false',1,'information_plaza',NULL),(47,'1111',2,'common','00000','2024-05-27 11:23:10','released',0,0,0,0,'2024-05-27 11:23:10','2024-05-27 11:23:10','false',2,'information_plaza',NULL),(48,'2333333333',3,'common','Flex 组件提供了24列栅格。使用单一的一组 Flex 和 Flex.Item 栅格组件，就可以创建一个基本的栅格系统，所有列（Flex.Item）必须放在 Flex 内。','2024-05-27 12:26:59','released',0,0,0,0,'2024-05-27 12:26:59','2024-05-27 12:26:59','false',1,'information_plaza',NULL),(50,'测试测试测试',4,'common','哈哈哈哈恍恍惚惚','2024-05-28 00:49:27','released',0,0,0,0,'2024-05-28 00:49:27','2024-05-28 00:49:27','false',3,'information_plaza',NULL),(51,'测试测试测试',2,'common','哈哈哈哈恍恍惚惚','2024-05-28 00:50:57','released',0,1,0,0,'2024-05-28 00:50:57','2024-05-28 00:50:57','false',5,'music',65),(52,'dfs',1,'common','dwa','2024-05-31 01:00:20','released',0,0,0,0,'2024-05-31 01:00:20','2024-05-31 01:00:20','false',16,'information_plaza',NULL),(53,'你好',1,'common','我是你好','2024-06-18 16:09:38','released',0,0,0,0,'2024-06-18 16:09:38','2024-06-18 16:09:38','false',0,'information_plaza',NULL);
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_comment`
--

DROP TABLE IF EXISTS `topic_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tid` bigint NOT NULL,
  `uid` bigint NOT NULL,
  `content` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `reply_id` bigint DEFAULT '-1',
  `create_time` datetime NOT NULL,
  `likes` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_comment`
--

LOCK TABLES `topic_comment` WRITE;
/*!40000 ALTER TABLE `topic_comment` DISABLE KEYS */;
INSERT INTO `topic_comment` VALUES (1,36,1,'就开始了福建省开发进度说法手打',-1,'2024-04-11 00:26:38',0),(2,36,1,'但是多少分威风威风',-1,'2024-04-11 00:27:18',0),(3,36,1,'胜多负少范围分为',2,'2024-04-11 00:27:45',0),(4,36,2,'但是多少分威风威风',2,'2024-05-08 00:38:27',0),(5,40,3,'测试',-1,'2024-05-08 01:03:39',0),(6,40,2,'测试',-1,'2024-05-08 01:06:05',0),(7,43,1,'测试评论刷新',-1,'2024-05-15 09:10:27',0),(8,36,1,'测试',-1,'2024-05-15 12:18:21',0),(9,51,1,'Eee',-1,'2024-06-06 11:56:10',0);
/*!40000 ALTER TABLE `topic_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_files`
--

DROP TABLE IF EXISTS `topic_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_files` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `uid` bigint DEFAULT NULL,
  `tid` bigint DEFAULT NULL,
  `fid` bigint DEFAULT NULL,
  `file_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'image',
  `file_desc` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `is_delete` varchar(20) NOT NULL DEFAULT 'false',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_files`
--

LOCK TABLES `topic_files` WRITE;
/*!40000 ALTER TABLE `topic_files` DISABLE KEYS */;
INSERT INTO `topic_files` VALUES (1,1,5,3,'image',NULL,'2024-04-23 22:09:01','2024-04-23 22:09:25','true'),(2,1,5,4,'image',NULL,'2024-04-23 22:09:01','2024-04-23 22:09:25','true'),(3,1,5,5,'image','1.png','2024-04-23 22:09:01','2024-04-23 22:09:25','true'),(4,1,5,6,'image','2.png','2024-04-23 22:09:01','2024-04-23 22:09:25','true'),(5,1,5,7,'image','20240409223127614-b60b2202-1.png','2024-04-23 22:09:01','2024-04-23 22:09:25','true'),(6,1,5,3,'image',NULL,'2024-04-23 22:09:25',NULL,'false'),(7,1,5,4,'image',NULL,'2024-04-23 22:09:25',NULL,'false'),(8,1,5,5,'image','1.png','2024-04-23 22:09:25',NULL,'false'),(9,1,5,6,'image','2.png','2024-04-23 22:09:25',NULL,'false'),(10,1,5,7,'image','20240409223127614-b60b2202-1.png','2024-04-23 22:09:25',NULL,'false');
/*!40000 ALTER TABLE `topic_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_like`
--

DROP TABLE IF EXISTS `topic_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_like` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tid` bigint NOT NULL,
  `uid` bigint NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_like`
--

LOCK TABLES `topic_like` WRITE;
/*!40000 ALTER TABLE `topic_like` DISABLE KEYS */;
INSERT INTO `topic_like` VALUES (7,40,3,'2024-05-15 01:04:35'),(14,36,2,'2024-05-15 12:18:15');
/*!40000 ALTER TABLE `topic_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_tags`
--

DROP TABLE IF EXISTS `topic_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_tags` (
  `topic_id` bigint NOT NULL,
  `tag_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_tags`
--

LOCK TABLES `topic_tags` WRITE;
/*!40000 ALTER TABLE `topic_tags` DISABLE KEYS */;
INSERT INTO `topic_tags` VALUES (1,4),(1,5),(1,8),(46,4),(46,9),(46,8),(47,10),(47,11),(48,10),(48,11),(49,10),(49,11),(50,11),(51,11);
/*!40000 ALTER TABLE `topic_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_view_his`
--

DROP TABLE IF EXISTS `topic_view_his`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_view_his` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `uid` bigint NOT NULL,
  `tid` bigint NOT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=852 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_view_his`
--

LOCK TABLES `topic_view_his` WRITE;
/*!40000 ALTER TABLE `topic_view_his` DISABLE KEYS */;
INSERT INTO `topic_view_his` VALUES (3,1,1,'2024-04-25 22:42:10'),(409,1,36,'2024-05-07 10:53:38'),(410,1,36,'2024-05-07 10:53:38'),(411,1,36,'2024-05-07 10:53:38'),(412,1,36,'2024-05-07 10:53:38'),(413,1,36,'2024-05-07 10:53:38'),(414,1,36,'2024-05-07 10:53:38'),(415,1,36,'2024-05-07 10:53:38'),(416,1,36,'2024-05-07 10:53:39'),(417,1,36,'2024-05-07 10:53:39'),(418,1,36,'2024-05-07 10:53:39'),(419,1,36,'2024-05-07 10:53:39'),(420,1,36,'2024-05-07 10:53:39'),(421,1,36,'2024-05-07 10:53:39'),(422,1,36,'2024-05-07 10:53:39'),(423,1,36,'2024-05-07 10:53:39'),(424,1,36,'2024-05-07 10:53:39'),(425,1,36,'2024-05-07 10:53:39'),(426,1,36,'2024-05-07 10:53:39'),(427,1,36,'2024-05-07 10:53:39'),(428,1,36,'2024-05-07 10:53:39'),(429,1,36,'2024-05-07 10:53:39'),(430,1,36,'2024-05-07 10:53:39'),(431,1,36,'2024-05-07 10:53:39'),(432,1,36,'2024-05-07 10:53:39'),(433,1,36,'2024-05-07 10:53:39'),(434,1,36,'2024-05-07 10:53:39'),(435,1,36,'2024-05-07 10:53:39'),(436,1,36,'2024-05-07 10:53:39'),(437,1,36,'2024-05-07 10:53:39'),(438,1,36,'2024-05-07 10:53:39'),(439,1,36,'2024-05-07 10:53:39'),(440,1,36,'2024-05-07 10:53:40'),(441,1,36,'2024-05-07 10:53:40'),(442,1,36,'2024-05-07 10:53:40'),(443,1,36,'2024-05-07 10:53:40'),(664,1,40,'2024-05-07 15:18:10'),(665,1,40,'2024-05-07 15:19:15'),(666,1,40,'2024-05-07 15:21:26'),(667,1,40,'2024-05-07 15:21:30'),(668,1,40,'2024-05-07 15:27:38'),(669,1,40,'2024-05-07 15:27:43'),(670,1,40,'2024-05-07 15:27:45'),(671,1,40,'2024-05-07 15:31:22'),(672,1,40,'2024-05-07 15:31:25'),(673,1,40,'2024-05-07 15:31:34'),(674,1,40,'2024-05-07 15:32:35'),(675,1,40,'2024-05-07 15:34:57'),(676,1,40,'2024-05-07 15:35:35'),(677,1,40,'2024-05-07 15:36:21'),(678,1,40,'2024-05-07 15:37:12'),(679,1,40,'2024-05-07 15:37:22'),(680,1,40,'2024-05-07 15:37:56'),(681,1,40,'2024-05-07 15:38:02'),(682,1,40,'2024-05-07 15:45:09'),(683,1,40,'2024-05-07 15:45:49'),(684,1,40,'2024-05-07 15:46:18'),(685,1,40,'2024-05-07 15:46:36'),(686,1,40,'2024-05-07 15:47:37'),(687,1,40,'2024-05-07 16:05:17'),(688,1,40,'2024-05-07 16:05:24'),(689,1,40,'2024-05-07 16:05:27'),(690,1,40,'2024-05-07 16:06:32'),(691,1,40,'2024-05-07 16:07:43'),(692,1,40,'2024-05-07 16:08:51'),(693,1,40,'2024-05-07 16:08:54'),(694,1,40,'2024-05-07 16:27:39'),(695,1,40,'2024-05-07 16:27:54'),(696,1,40,'2024-05-07 16:28:50'),(697,1,40,'2024-05-07 16:31:30'),(698,1,40,'2024-05-07 16:31:54'),(699,1,40,'2024-05-07 16:33:04'),(700,1,40,'2024-05-07 16:34:22'),(701,1,40,'2024-05-07 16:34:31'),(702,1,40,'2024-05-07 16:35:42'),(703,1,40,'2024-05-07 16:35:46'),(704,1,40,'2024-05-07 16:36:14'),(705,1,40,'2024-05-07 16:36:39'),(706,1,40,'2024-05-07 16:36:44'),(707,1,40,'2024-05-07 16:38:25'),(708,1,40,'2024-05-07 16:38:28'),(709,1,40,'2024-05-07 17:05:04'),(710,1,40,'2024-05-07 17:05:06'),(711,1,40,'2024-05-07 17:05:46'),(712,1,40,'2024-05-07 17:06:18'),(713,1,40,'2024-05-07 17:07:03'),(714,1,40,'2024-05-07 17:07:20'),(715,1,40,'2024-05-07 17:07:37'),(716,1,40,'2024-05-07 17:09:32'),(717,1,40,'2024-05-07 17:09:51'),(718,1,40,'2024-05-07 17:24:29'),(719,1,40,'2024-05-07 17:24:53'),(720,1,40,'2024-05-07 17:25:14'),(721,1,40,'2024-05-07 17:25:25'),(722,1,40,'2024-05-07 17:25:40'),(723,1,40,'2024-05-07 17:25:56'),(724,1,40,'2024-05-07 17:26:36'),(725,1,40,'2024-05-07 17:27:36'),(726,1,40,'2024-05-07 17:28:22'),(727,1,40,'2024-05-07 17:33:45'),(728,1,40,'2024-05-07 17:33:52'),(729,1,40,'2024-05-07 17:36:57'),(730,1,40,'2024-05-07 17:37:15'),(731,1,40,'2024-05-07 17:37:26'),(732,1,40,'2024-05-07 17:37:50'),(733,1,40,'2024-05-07 17:38:57'),(734,1,40,'2024-05-07 17:39:44'),(735,1,40,'2024-05-07 17:39:58'),(736,1,40,'2024-05-07 17:40:37'),(737,1,40,'2024-05-07 17:54:47'),(738,1,40,'2024-05-07 17:56:16'),(739,1,40,'2024-05-07 17:58:27'),(740,1,40,'2024-05-07 17:59:37'),(741,1,40,'2024-05-07 17:59:42'),(742,1,40,'2024-05-07 17:59:46'),(743,1,40,'2024-05-07 18:00:35'),(744,1,40,'2024-05-07 18:00:47'),(745,1,40,'2024-05-07 18:01:56'),(746,1,40,'2024-05-07 18:03:27'),(747,1,40,'2024-05-07 18:04:43'),(748,1,40,'2024-05-07 18:04:58'),(749,1,40,'2024-05-07 18:05:18'),(750,1,40,'2024-05-07 18:05:23'),(751,1,40,'2024-05-07 18:07:57'),(752,1,40,'2024-05-08 00:55:22'),(753,1,40,'2024-05-08 00:58:48'),(754,1,40,'2024-05-08 00:59:29'),(755,1,40,'2024-05-08 00:59:37'),(756,1,40,'2024-05-08 01:01:19'),(757,1,40,'2024-05-08 01:02:15'),(758,1,40,'2024-05-08 01:03:16'),(759,1,40,'2024-05-08 01:03:37'),(760,1,40,'2024-05-08 01:05:18'),(761,1,40,'2024-05-08 01:06:03'),(762,1,40,'2024-05-08 01:14:38'),(763,1,40,'2024-05-08 01:15:02'),(764,1,40,'2024-05-08 01:17:28'),(765,1,40,'2024-05-08 01:18:07'),(766,1,40,'2024-05-08 01:18:48'),(767,1,40,'2024-05-08 09:05:30'),(768,1,40,'2024-05-09 17:11:02'),(769,1,40,'2024-05-09 17:15:37'),(775,1,42,'2024-05-13 16:56:31'),(777,1,39,'2024-05-13 16:57:43'),(778,1,36,'2024-05-13 16:57:48'),(780,1,36,'2024-05-14 14:26:29'),(783,1,40,'2024-05-14 16:48:36'),(784,1,36,'2024-05-15 01:03:39'),(785,1,36,'2024-05-15 01:05:45'),(786,1,36,'2024-05-15 01:06:59'),(787,1,36,'2024-05-15 01:07:08'),(800,1,41,'2024-05-15 09:17:02'),(802,1,38,'2024-05-15 09:17:30'),(804,1,2,'2024-05-15 09:23:36'),(805,1,37,'2024-05-15 09:24:24'),(807,1,4,'2024-05-15 09:29:12'),(808,1,40,'2024-05-15 09:45:09'),(810,1,40,'2024-05-15 10:15:48'),(822,1,43,'2024-05-15 12:17:49'),(823,1,36,'2024-05-15 12:18:08'),(824,1,40,'2024-05-15 17:17:51'),(825,1,40,'2024-05-15 17:23:48'),(826,1,40,'2024-05-15 21:54:28'),(828,2,44,'2024-05-20 23:53:57'),(830,1,46,'2024-05-31 18:06:54'),(831,1,44,'2024-05-31 18:06:58'),(834,1,47,'2024-05-31 18:07:13'),(847,1,51,'2024-06-06 12:17:44'),(848,1,48,'2024-06-06 12:23:13'),(850,1,50,'2024-06-08 11:06:27'),(851,1,52,'2024-06-08 16:31:39');
/*!40000 ALTER TABLE `topic_view_his` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `email` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '邮箱',
  `phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '手机号',
  `register_time` datetime DEFAULT NULL COMMENT '注册日期',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录日期',
  `is_active` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL COMMENT '用户类型标识',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'zhangshan','e10adc3949ba59abbe56e057f20f883e','abc@abc.com','123','2024-03-18 23:24:45','2024-03-18 23:24:45','true',NULL),(2,'user2','e10adc3949ba59abbe56e057f20f883e','x.tjlijuuot@jkrkojt.lt','19877551778','2024-03-21 00:25:52','2024-03-21 00:25:52','true',NULL),(3,'wangwu','e10adc3949ba59abbe56e057f20f883e','y.dfirnpy@fzdoqqhi.pg','18600035806','2024-05-08 15:09:25','2024-05-08 15:09:25','true',NULL),(4,'Christopher Young1','e10adc3949ba59abbe56e057f20f883e','y.dfirnpy@fzdoqqhi.pg','18600035806','2024-03-21 00:27:47','2024-03-21 00:27:47','true',NULL),(12,'Christopher xdfd','e10adc3949ba59abbe56e057f20f883e','y.dfirnpy@fzdoqqhi.pg','18600035806','2024-03-27 12:44:51','2024-03-27 12:44:51','true',NULL),(13,'Christopher werwe','e10adc3949ba59abbe56e057f20f883e','y.dfirnpy@fzdoqqhi.pg','18600035806','2024-03-30 12:17:46','2024-03-30 12:17:46','true',NULL),(14,'Christopher Young','e10adc3949ba59abbe56e057f20f883e','y.dfirnpy@fzdoqqhi.pg','18600035806','2024-04-11 21:03:21','2024-04-11 21:03:21','true',NULL),(16,'lisi','a0a475cf454cf9a06979034098167b9e','lisi@123.com','13645678900','2024-05-08 15:10:11','2024-05-08 15:10:11','true',NULL),(17,'zhaoliu','74b6e2feb8b08087d6f29897b401052c','zhaoliu@111.com',NULL,'2024-06-07 16:15:57','2024-06-07 16:15:57','true',NULL),(18,'ljq867','40fb09d74b0b994232dd8a0ef18f9c3f','ljq867@163.com',NULL,'2024-06-24 15:59:40','2024-06-24 15:59:40','true',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_details`
--

DROP TABLE IF EXISTS `user_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `uid` bigint NOT NULL COMMENT '用户id',
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '姓',
  `second_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名',
  `nick_name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `gender` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '性别',
  `birthdate` date DEFAULT NULL COMMENT '出生日期',
  `country` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `signature` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_details`
--

LOCK TABLES `user_details` WRITE;
/*!40000 ALTER TABLE `user_details` DISABLE KEYS */;
INSERT INTO `user_details` VALUES (7,1,'张','三','三体人lo','mail','2000-01-01','cn','shenzhen','快乐老家','5','2000-01-01 00:00:00',NULL),(8,2,'Donna','Lopez','lolx','femail','2002-01-01','usa',NULL,'somewhere',NULL,'2002-01-01 00:00:00',NULL),(9,3,'Li','Si','刘备lx',NULL,NULL,NULL,NULL,NULL,'5',NULL,NULL);
/*!40000 ALTER TABLE `user_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_follow`
--

DROP TABLE IF EXISTS `user_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_follow` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `follower_uid` bigint NOT NULL,
  `followed_uid` bigint NOT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_follow`
--

LOCK TABLES `user_follow` WRITE;
/*!40000 ALTER TABLE `user_follow` DISABLE KEYS */;
INSERT INTO `user_follow` VALUES (4,1,3,'2024-05-09 08:39:29'),(18,1,2,'2024-06-17 09:36:49');
/*!40000 ALTER TABLE `user_follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `uid` bigint NOT NULL,
  `role` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1,'admin');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_share`
--

DROP TABLE IF EXISTS `user_share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_share` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tid` bigint NOT NULL,
  `uid` bigint NOT NULL,
  `share_time` datetime DEFAULT NULL,
  `share_token` varchar(200) NOT NULL,
  `url_link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_share`
--

LOCK TABLES `user_share` WRITE;
/*!40000 ALTER TABLE `user_share` DISABLE KEYS */;
INSERT INTO `user_share` VALUES (1,46,1,'2024-06-17 22:23:20','7rh3eagsqt','/share/3'),(2,46,1,'2024-06-17 22:29:23','scmefkji6e','/share/3');
/*!40000 ALTER TABLE `user_share` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'embodied'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-04 10:56:45
