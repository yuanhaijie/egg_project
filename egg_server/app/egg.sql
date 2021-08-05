/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80023
Source Host           : localhost:3306
Source Database       : egg

Target Server Type    : MYSQL
Target Server Version : 80023
File Encoding         : 65001

Date: 2021-08-05 14:34:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for egg_tag
-- ----------------------------
DROP TABLE IF EXISTS `egg_tag`;
CREATE TABLE `egg_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of egg_tag
-- ----------------------------
INSERT INTO `egg_tag` VALUES ('1', '国产美女', '52831840-9f86-4a55-a7e6-9302fdb45026', '2021-08-05 13:48:26', '');

-- ----------------------------
-- Table structure for egg_user
-- ----------------------------
DROP TABLE IF EXISTS `egg_user`;
CREATE TABLE `egg_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nick_name` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `other` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`) USING BTREE,
  UNIQUE KEY `nick_name` (`nick_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of egg_user
-- ----------------------------
INSERT INTO `egg_user` VALUES ('1', '16651191107', '39ee488c7696d8f3ee3456218666a3c9', 'hajcker', 'http://127.0.0.1:7001/public/upload/20210727/1627368461125.jpg', '4cceea39-8849-40a1-93fa-c7670337e48d', 'http://127.0.0.1:7001/public/upload/20210727/1627368461125.jpg', '25', '江苏省苏州市工业园区斜塘街道荷韵新村8幢408', '拥有者');
INSERT INTO `egg_user` VALUES ('4', '17701546904', '39ee488c7696d8f3ee3456218666a3c9', '乾三子', 'http://127.0.0.1:7001/public/upload/20210727/1627368461125.jpg', '52831840-9f86-4a55-a7e6-9302fdb45026', 'http://127.0.0.1:7001/public/upload/20210727/1627368461125.jpg', '25', '江苏省苏州市工业园区斜塘街道荷韵新村8幢408', '拥有者');
INSERT INTO `egg_user` VALUES ('5', '15005296538', '39ee488c7696d8f3ee3456218666a3c9', '滚滚他爸', 'http://127.0.0.1:7001/public/upload/20210727/1627368461125.jpg', 'a4bea150-c970-4699-bc62-33831bc200d3', 'http://127.0.0.1:7001/public/upload/20210727/1627368461125.jpg', '25', '江苏省苏州市工业园区斜塘街道荷韵新村8幢408', '拥有者');

