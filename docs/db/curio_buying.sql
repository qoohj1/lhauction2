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

 Date: 06/25/2018 16:54:37 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `curio_buying`
-- ----------------------------
DROP TABLE IF EXISTS `curio_buying`;
CREATE TABLE `curio_buying` (
  `id` int(11) NOT NULL,
  `banner` varchar(255) DEFAULT NULL,
  `des_tc` longtext,
  `des_en` longtext,
  `web_pic1` varchar(512) DEFAULT NULL,
  `web_t1_tc` varchar(255) DEFAULT NULL,
  `web_t1_en` varchar(255) DEFAULT NULL,
  `web_href1` varchar(255) DEFAULT NULL,
  `web_pic2` varchar(512) DEFAULT NULL,
  `web_t2_tc` varchar(255) DEFAULT NULL,
  `web_t2_en` varchar(255) DEFAULT NULL,
  `web_href2` varchar(255) DEFAULT NULL,
  `web_pic3` varchar(512) DEFAULT NULL,
  `web_t3_tc` varchar(255) DEFAULT NULL,
  `web_t3_en` varchar(255) DEFAULT NULL,
  `web_href3` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `curio_buying`
-- ----------------------------
BEGIN;
INSERT INTO `curio_buying` VALUES ('1', 'http://dev.curio.com/public/static_page/img/1529912260iiib41jk.jpg', '仕宏拍賣為使每一位買家更方便參與是次拍賣會，買家可透過網上競投、電郵或傳真競投，電話競投，及委託競投，競投今次拍賣會的經典珍藏品。買家可下載及填妥下列相關的表格，電郵至 <a href=\"mailto:auction@lh-hk.com\" _fcksavedurl=\"mailto:auction@lh-hk.com\">auction@lh-hk.com</a>。\n另外，買家可參閱拍賣目錄內的及條款或致電(+852) 3168 2192查詢有關詳情。', 'L&H Auction Co. Ltd would like to make buyer biding our valuable items in a convenient way at anywhere. Online Bid, Email/Fax Bid, Telephone Bid and Absentee Bid will be opened for bidders. Please fill in the form below and send to <a href=\"mailto:auction@lh-hk.com\" _fcksavedurl=\"mailto:auction@lh-hk.com\">auction@lh-hk.com</a>.\n\nFor details, please check our Terms and Condition of Sale or reach us at (+852) 3168 2192(+852) 3168 2192.', 'http://dev.curio.com/public/static_page/img/1529912643ubk508nn.png', 'Liveauctioneers', 'Liveauctioneers', 'https://www.liveauctioneers.com/landh-auction-co-ltd', 'http://dev.curio.com/public/static_page/img/1529912649vrvs3ycg.jpg', '易拍全球', 'epaiLive', 'http://www.epailive.com/company/1173', 'http://dev.curio.com/public/static_page/img/1529912773d22b2ipr.jpg', '艺狐在线', 'artfox', 'https://www.artfoxlive.com/match/7338');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
