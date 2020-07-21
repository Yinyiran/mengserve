/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : meng

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 21/07/2020 16:54:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `ArtID` int(10) NOT NULL AUTO_INCREMENT,
  `ArtTitle` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ArtIntro` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `ArtContent` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `ArtStar` tinyint(1) NULL DEFAULT NULL,
  `ArtCover` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `CreateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`ArtID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10013 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `BanID` int(11) NOT NULL AUTO_INCREMENT,
  `BanName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `BanType` int(1) NOT NULL,
  `BanTargID` int(11) NOT NULL,
  `BanImg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `SortID` int(2) NULL DEFAULT 99,
  PRIMARY KEY (`BanID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10020 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify`  (
  `ClassID` int(5) NOT NULL AUTO_INCREMENT,
  `ClassName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ParentID` int(11) NOT NULL DEFAULT 0,
  `SortID` int(5) NOT NULL,
  `ClassImg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ClassID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1017 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES (1014, '龙头', 0, 1, 'resource/img/2020-06-15/1592215243545.jpg');
INSERT INTO `classify` VALUES (1016, 'BBBBB', 0, 2, 'resource/img/2020-06-16/1592297946381.jpg');

-- ----------------------------
-- Table structure for compinfo
-- ----------------------------
DROP TABLE IF EXISTS `compinfo`;
CREATE TABLE `compinfo`  (
  `CompName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `CompLogo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Telephone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `WeChat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `WeChatQR` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Facebook` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `FacebookQR` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Twitter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TwitterQR` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `YouTube` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `CompID` int(4) NOT NULL,
  `UserName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PassWord` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `AboutID` int(20) NULL DEFAULT NULL,
  PRIMARY KEY (`UserID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10001 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of compinfo
-- ----------------------------
INSERT INTO `compinfo` VALUES ('按复', '', '15555555', '按复位', '1234', '', '', NULL, NULL, NULL, NULL, 10000, 'zhaoqingmeng', 'qingmeng', 10000, NULL);

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `FileID` int(10) NOT NULL AUTO_INCREMENT,
  `FileHash` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `FilePath` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`FileID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10040 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (10004, '6402e9643c5a93dbdcb134b168b1695f', 'resource/img/2020-06-12/1591957337284.gif');
INSERT INTO `file` VALUES (10005, '912b7a05fe0815312b9ffd8ca922ec74', 'resource/img/2020-06-12/1591957337287.jpg');
INSERT INTO `file` VALUES (10006, '07263b4110c2496adbe05a17c8af23ee', 'resource/img/2020-06-15/1592214747440.jpg');
INSERT INTO `file` VALUES (10007, '8f6245de7a648565dfa248fddca011aa', 'resource/img/2020-06-15/1592215243545.jpg');
INSERT INTO `file` VALUES (10008, '3cdd6028300030a6221a65d6b6467e31', 'resource/img/2020-06-15/1592215243548.jpg');
INSERT INTO `file` VALUES (10009, '3384027fec315a0d32bcb06428fd7bfd', 'resource/img/2020-06-15/1592215243552.jpg');
INSERT INTO `file` VALUES (10011, '49181bd8ec16ffeffab9f328422092a7', 'resource/img/2020-06-16/1592297946381.jpg');
INSERT INTO `file` VALUES (10012, '14fa4498955b959c7566ff7762928d84', 'resource/img/2020-06-16/1592299290918.png');
INSERT INTO `file` VALUES (10013, '74ad3b3ba257da85a0b0922aaf046507', 'resource/img/2020-06-16/1592299290923.jpg');
INSERT INTO `file` VALUES (10014, 'f1f84f5935a92e565445e296867f2cff', 'resource/img/2020-06-16/1592299290925.jpg');
INSERT INTO `file` VALUES (10015, '8702e10328910970e23f3da85fc1497e', 'resource/img/2020-06-16/1592299290926.jpg');
INSERT INTO `file` VALUES (10016, '0e2c33cc7dd7788c377eefbbde4ca793', 'resource/img/2020-06-17/1592364868993.png');
INSERT INTO `file` VALUES (10017, '7f40354578e6b04c02e381b8d36029de', 'resource/img/2020-06-17/1592364887811.png');
INSERT INTO `file` VALUES (10018, '36aac67acaf3ac59c14f6f60343ab973', 'resource/img/2020-06-17/1592383794736.png');
INSERT INTO `file` VALUES (10019, '821d4a6acae9fc6b17cbd44c71e28453', 'resource/img/2020-06-22/1592819977712.png');
INSERT INTO `file` VALUES (10020, '21059701acb57419dfd4084952c5e226', 'resource/img/2020-06-22/1592820238638.png');
INSERT INTO `file` VALUES (10021, 'fcd58b8ff7421a2e16aefd1109588594', 'resource/img/2020-06-22/1592820238639.png');
INSERT INTO `file` VALUES (10028, 'b4896e31b0d7648f8e058f5a6464863e', 'resource/img/2020-06-23/1592879818586.png');
INSERT INTO `file` VALUES (10029, 'def256d2b7f763e06883f62c584359ac', 'resource/img/2020-06-23/1592879848426.png');
INSERT INTO `file` VALUES (10030, '5ad9e71ebb13c2ecdf26eb631d302bc1', 'resource/img/2020-06-23/1592879932899.png');
INSERT INTO `file` VALUES (10031, 'ff75b39c495527272c5d973b1c35b881', 'resource/img/2020-06-23/1592881837347.png');
INSERT INTO `file` VALUES (10032, '1950fa39b8362e4b278cb618630685ad', 'resource/img/2020-06-23/1592881861988.jpg');
INSERT INTO `file` VALUES (10034, '7ef8727b695b60cb6c0592440ac41bdd', 'resource/img/2020-06-23/1592906691404.png');
INSERT INTO `file` VALUES (10035, '17a4d1708d1fb6391d233d8c0b480c24', 'resource/img/2020-07-01/1593572697697.png');
INSERT INTO `file` VALUES (10036, '06db19a6325f6cf2ca2065dbcef335f5', 'resource/img/2020-07-01/1593572819149.jpg');
INSERT INTO `file` VALUES (10037, '751e3d5b310c64d7a0a6bf92b59e81fc', 'resource/img/2020-07-03/1593765948450.png');
INSERT INTO `file` VALUES (10038, '687d2d02871cb744d9234210c46a29ba', 'resource/img/2020-07-03/1593765948783.jpg');
INSERT INTO `file` VALUES (10039, '75bc2ee96fda0abde20646a91997721a', 'resource/img/2020-07-06/1594024773382.jpg');
INSERT INTO `file` VALUES (10040, '2bf6f12b1d3a4c66d4cf6b387c6ffed1', 'resource/img/2020-07-09/1594282375538.jpg');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `ProdID` int(10) NOT NULL AUTO_INCREMENT,
  `ProdName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Classify` int(10) NULL DEFAULT NULL,
  `ProdIntro` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `Property` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `ProdImg` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `ProdContent` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `ProdStar` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`ProdID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10022 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (10020, 'SkuID22', 1012, 'SkuID22', '{\"SkuID1\":\"SkuID1\"}', NULL, '<p>SkuIDSkuIDSkuIDSkuIDSkuID二期34&nbsp;</p>', 1);
INSERT INTO `product` VALUES (10021, '龙头', 1014, '龙头', '{\"龙头\":\"龙头\"}', NULL, NULL, 1);

-- ----------------------------
-- Table structure for sku
-- ----------------------------
DROP TABLE IF EXISTS `sku`;
CREATE TABLE `sku`  (
  `SkuID` int(20) NOT NULL AUTO_INCREMENT,
  `ProdID` int(20) NOT NULL,
  `IsMain` int(1) NOT NULL,
  `SkuName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `SkuImg` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `SkuProps` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`SkuID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sku
-- ----------------------------
INSERT INTO `sku` VALUES (11, 10021, 1, '龙头1', 'resource/img/2020-06-16/1592297946381.jpg,resource/img/2020-07-09/1594282375538.jpg', '{\"龙头1\":\"龙头1\",\"龙头2\":\"龙头2\"}');
INSERT INTO `sku` VALUES (12, 10020, 0, 'SkuID1', 'resource/img/2020-07-06/1594024773382.jpg,resource/img/2020-06-12/1591957337287.jpg', '{\"SkuID\":\"SkuID\",\"SkuProps\":\"SkuProps\"}');
INSERT INTO `sku` VALUES (13, 10020, 1, '2222', 'resource/img/2020-06-15/1592215243545.jpg,resource/img/2020-07-03/1593765948783.jpg', '{\"SkuProp22\":\"SkuProps2\",\"SkuPro22\":\"SkuPro22\"}');

SET FOREIGN_KEY_CHECKS = 1;
