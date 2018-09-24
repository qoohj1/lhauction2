/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost
 Source Database       : curio

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : utf-8

 Date: 04/24/2018 12:09:33 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `curio_indexpc`
-- ----------------------------
DROP TABLE IF EXISTS `curio_indexpc`;
CREATE TABLE `curio_indexpc` (
  `id` int(11) NOT NULL,
  `clazz_id` int(11) DEFAULT NULL,
  `lot1` varchar(255) DEFAULT NULL,
  `pic1` varchar(255) DEFAULT NULL,
  `lot2` varchar(255) DEFAULT NULL,
  `pic2` varchar(255) DEFAULT NULL,
  `lot3` varchar(255) DEFAULT NULL,
  `pic3` varchar(255) DEFAULT NULL,
  `lot4` varchar(255) DEFAULT NULL,
  `pic4` varchar(255) DEFAULT NULL,
  `sort` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `curio_indexpc`
-- ----------------------------
BEGIN;
INSERT INTO `curio_indexpc` VALUES ('1', '12', '503', '/public/pic_content/img/a1/LOTNO_503_2.jpg', '501', '/public/pic_content/img/a1/LOTNO_501_2.jpg', '502', '/public/pic_content/img/a1/LOTNO_502_2.jpg', '506', '/public/pic_content/img/a1/LOTNO_506_1.jpg', '6'), ('2', '12', '503', '/public/pic_content/img/a1/LOTNO_503_1.jpg', '507', '/public/pic_content/img/a1/LOTNO_507_1.jpg', '506', '/public/pic_content/img/a1/LOTNO_506_1.jpg', '513', '/public/pic_content/img/a1/LOTNO_513_2.jpg', '5'), ('3', '26', '1003', '/public/pic_content/img/a15/LOTNO_1003_1.jpg', '1001', '/public/pic_content/img/a15/LOTNO_1001_1.jpg', '1010', '/public/pic_content/img/a15/LOTNO_1010_1.JPG', '1067', '/public/pic_content/img/a15/LOTNO_1067_1.jpg', '7');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
