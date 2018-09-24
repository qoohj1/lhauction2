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

 Date: 07/11/2018 17:21:31 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `curio_catagory`
-- ----------------------------
DROP TABLE IF EXISTS `curio_catagory`;
CREATE TABLE `curio_catagory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_tc` varchar(255) DEFAULT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `status` int(8) DEFAULT NULL,
  `sort` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `curio_catagory`
-- ----------------------------
BEGIN;
INSERT INTO `curio_catagory` VALUES ('1', '古董級普洱茶及佳茗專場', 'Vintage Pu-er Tea Auction', '1', '5'), ('2', '茶道·香道·花器專場', 'Tea Wares & Agarwood Auction', '1', '5'), ('3', '珍稀相機專場', 'Photographical Auction', '1', '5'), ('5', '補品及佳釀專場', 'Delicacies & Wine Auction', '1', '5');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
