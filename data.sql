/*
 Navicat Premium Data Transfer
 Date: 01/04/2020 11:51:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dzushop_ADS
-- ----------------------------
DROP TABLE IF EXISTS `dzushop_ADS`;
CREATE TABLE `dzushop_ADS` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `img` varchar(255) NOT NULL COMMENT '广告图片地址',
  `sort` int(10) NOT NULL DEFAULT '0' COMMENT '广告排序',
  `href` varchar(255) NOT NULL COMMENT '广告链接地址',
  `title` varchar(88) NOT NULL COMMENT '广告标题',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of dzushop_ADS
-- ----------------------------
BEGIN;
INSERT INTO `dzushop_ADS` VALUES (1, './uploads/20190717/1563367817.jpg', 12, 'http://dzushop.debuginn.cn', '震惊  清仓甩货了！！！');
INSERT INTO `dzushop_ADS` VALUES (2, './uploads/20190719/1563519567.jpg', 12, '121212', '1121212');
COMMIT;

-- ----------------------------
-- Table structure for dzushop_addr
-- ----------------------------
DROP TABLE IF EXISTS `dzushop_addr`;
CREATE TABLE `dzushop_addr` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(10) NOT NULL COMMENT '用户ID',
  `sname` varchar(50) NOT NULL COMMENT '收货人姓名',
  `stel` varchar(11) NOT NULL COMMENT '收货人电话',
  `addr` varchar(255) NOT NULL COMMENT '收货人地址',
  `addrInfo` varchar(255) NOT NULL COMMENT '收货人详细地址',
  `email` varchar(255) NOT NULL COMMENT '收货人邮箱',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of dzushop_addr
-- ----------------------------
BEGIN;
INSERT INTO `dzushop_addr` VALUES (1, 1, '张三', '17862666529', '山东德州', '山东德州德州学院', '1@qq.com');
INSERT INTO `dzushop_addr` VALUES (2, 2, '李四', '13168571472', '山东德州', '山东德州德州学院', '2@qq.xom');
COMMIT;

-- ----------------------------
-- Table structure for dzushop_admin
-- ----------------------------
DROP TABLE IF EXISTS `dzushop_admin`;
CREATE TABLE `dzushop_admin` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) NOT NULL COMMENT '管理员用户名',
  `pass` varchar(255) NOT NULL COMMENT '管理员密码',
  `time` int(11) NOT NULL COMMENT '管理员注册时间',
  `lasttime` int(11) NOT NULL COMMENT '管理员最后修改时间',
  `count` int(11) NOT NULL COMMENT '管理员登陆次数',
  `status` tinyint(4) NOT NULL COMMENT '管理员用户状态',
  `delstatus` tinyint(4) NOT NULL COMMENT '管理员用户是否删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of dzushop_admin
-- ----------------------------
BEGIN;
INSERT INTO `dzushop_admin` VALUES (1, 'admin', 'eyJpdiI6Ik9vVjZtV3dnVExpRHRCS1k1RldcL3l3PT0iLCJ2YWx1ZSI6IlVFdDdDKzdjUm5IR09kR0Y5eG5KSnc9PSIsIm1hYyI6IjlmMGJkNWQ4NzM4N2MwNTQ4ZmNjN2Y4MWY4ODE5ODZkNjhjNGJjOTFkYzE2ZDNhNjk3ZDczNWVlNTlhZmU1ZWQifQ==', 1562419212, 1585208269, 42, 0, 0);
INSERT INTO `dzushop_admin` VALUES (2, 'admin1', 'eyJpdiI6IjJMRnlHeFRCV1VuRDgyQkplYlNlRHc9PSIsInZhbHVlIjoiQ1hMTmljWGNhSDBmZWZQNG5rdTNCUT09IiwibWFjIjoiNDRiNTliYzg5NjUyZWUxNjM3MTE1YTY4NjRhZjk0ZmE0YWU2Njc1MzUxZjIwOWQ0OTRhZTU0N2U3MDViM2I0OSJ9', 1562420364, 1562420364, 1, 0, 0);
INSERT INTO `dzushop_admin` VALUES (10, 'admin3', 'eyJpdiI6IkhCbkFHUzhLbEpjWkhrMUlYUWN4Nnc9PSIsInZhbHVlIjoiSWlkUlZ3aThIYmNMWCtWK25TRWpkdz09IiwibWFjIjoiMWU5Zjg2NTJiNjExZWIxYmRlMGVjZjk0NTI0NzQ3ZTEyMWQzODVhZDBiOTljMzNhNDc3MWE0ZTljZDg2NDZmNCJ9', 1562586293, 1562586293, 1, 0, 0);
INSERT INTO `dzushop_admin` VALUES (11, 'admin4', 'eyJpdiI6IlhRQmQyeElieXBTVDVQSFFTcVV2eFE9PSIsInZhbHVlIjoiSGVYNDlaUnJBc1dcL2EzaWhqN3VCM3c9PSIsIm1hYyI6ImU4NDg1YTgxMTU2ZDJkNjM4NTc0OWJkZTExMDFhZDc4YjhhODlhM2ZjMGU2ZDA5YjE0MmFhZTcwMjM1MGE0MmMifQ==', 1562892480, 1562892480, 1, 1, 0);
INSERT INTO `dzushop_admin` VALUES (12, 'mengxianhui', 'eyJpdiI6IjBUKzVrbXVNUUdUZ2ZRUWNoK1VKRHc9PSIsInZhbHVlIjoiT0FsZXBFMHNRU29pT1haOEpJUU5MNXhhdFJjbVpyUXJMK0ZpK01wOFdIMD0iLCJtYWMiOiI1YjQ1ZjE5ZDZlN2RhYTFlZGYyNjE1NmMyNzM4MzBhOTkwOTJkYmMyNmVkY2FkZTQ0MDQ0NjZhZjA4NGY2NmRmIn0=', 1562979977, 1562979977, 1, 0, 0);
COMMIT;

-- ----------------------------
-- Table structure for dzushop_comment
-- ----------------------------
DROP TABLE IF EXISTS `dzushop_comment`;
CREATE TABLE `dzushop_comment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(10) NOT NULL COMMENT '评论用户ID',
  `gid` int(10) NOT NULL COMMENT '评论用户商品ID',
  `text` varchar(255) NOT NULL COMMENT '评论内容',
  `star` int(10) NOT NULL COMMENT '星星个数',
  `time` int(11) NOT NULL COMMENT '评论时间',
  `status` varchar(50) NOT NULL COMMENT '评论状态',
  `img` varchar(255) NOT NULL COMMENT '评论图片路径',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of dzushop_comment
-- ----------------------------
BEGIN;
INSERT INTO `dzushop_comment` VALUES (1, 1, 2, '很好，不错', 4, 123456789, '0', './uploads/20190720/1563585995.jpg');
INSERT INTO `dzushop_comment` VALUES (2, 2, 1, '1111111111111', 3, 123789456, '0', './uploads/20190720/1563586260.jpg');
COMMIT;

-- ----------------------------
-- Table structure for dzushop_goods
-- ----------------------------
DROP TABLE IF EXISTS `dzushop_goods`;
CREATE TABLE `dzushop_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `cid` int(10) NOT NULL COMMENT '所属分类',
  `title` varchar(255) NOT NULL COMMENT '商品标题',
  `info` varchar(255) NOT NULL COMMENT '商品介绍',
  `img` varchar(255) NOT NULL COMMENT '商品图片',
  `price` decimal(10,5) NOT NULL COMMENT '商品价格',
  `num` int(80) NOT NULL COMMENT '商品库存',
  `text` text NOT NULL COMMENT '商品详细信息',
  `config` text NOT NULL COMMENT '商品配置信息',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of dzushop_goods
-- ----------------------------
BEGIN;
INSERT INTO `dzushop_goods` VALUES (1, 4, '泰国原装进口第七代天然负离子乳胶床垫', 'paratex 泰国原装进口第七代天然负离子乳胶床垫 床褥子180*200*7.5cm 94%乳胶含量', './uploads/20190720/1563585995.jpg', 3399.00000, 12, '<p>&lt;ul id=\"parameter-brand\"&gt;&lt;li title=\"paratex\"&gt;品牌：&amp;nbsp;&lt;a href=\"https://list.jd.com/list.html?cat=15248,15249,15274&amp;amp;ev=exbrand_162854\" clstag=\"shangpin|keycount|product|pinpai_2\" target=\"_blank\"&gt;paratex&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;&lt;ul&gt;&lt;li title=\"paratex乳胶床垫\"&gt;商品名称：paratex乳胶床垫&lt;/li&gt;&lt;li title=\"100006050206\"&gt;商</p><table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p><br></p><p>品编号：100006050206&lt;/li&gt;&lt;li title=\"27.0kg\"&gt;商品毛重：27.0kg&lt;/li&gt;&lt;li title=\"泰国\"&gt;商品产地：泰国&lt;/li&gt;&lt;li title=\"天然乳胶\"&gt;材质：天然乳胶&lt;/li&gt;&lt;li title=\"6-10cm\"&gt;厚度：6-10cm&lt;/li&gt;&lt;li title=\"床垫\"&gt;类别：床垫&lt;/li&gt;&lt;li title=\"居家\"&gt;适用场景：居家&lt;/li&gt;&lt;li title=\"180*200cm\"&gt;尺寸：180*200cm&lt;/li&gt;&lt;li title=\"其它\"&gt;面料：其它&lt;/li&gt;&lt;/ul&gt;</p>', '<p>&lt;div&gt;&lt;div&gt;&lt;h3&gt;主体&lt;/h3&gt;&lt;dl&gt;&lt;dl&gt;&lt;dt&gt;面料&lt;/dt&gt;&lt;dd&gt;其它&lt;/dd&gt;&lt;/dl&gt;&lt;dl&gt;&lt;dt&gt;分类&lt;/dt&gt;&lt;dd&gt;床垫&lt;/dd&gt;&lt;/dl&gt;&lt;dl&gt;&lt;dt&gt;材质&lt;/dt&gt;&lt;dd&gt;天然乳胶&lt;/dd&gt;&lt;/dl&gt;&lt;dl&gt;&lt;dt&gt;厚度（cm）&lt;/dt&gt;&lt;dd&gt;7.5&lt;/dd&gt;&lt;/dl&gt;&lt;dl&gt;&lt;dt&gt;适用尺寸&lt;/dt&gt;&lt;dd&gt;1.8mx2.0m&lt;/dd&gt;&lt;/dl&gt;&lt;dl&gt;&lt;dt&gt;适用场景&lt;/dt&gt;&lt;dd&gt;居家&lt;/dd&gt;&lt;/dl&gt;&lt;/dl&gt;&lt;/div&gt;&lt;/div&gt;&lt;div&gt;&lt;h3&gt;包装清单&lt;/h3&gt;&lt;p&gt;床垫x1、外包装纸箱x1&lt;/p&gt;&lt;/div&gt;</p>');
INSERT INTO `dzushop_goods` VALUES (2, 4, '京东京造 泰国天然乳胶床垫', '京东京造 泰国天然乳胶床垫 85D密度乳胶床褥 93%乳胶含量 180*200*7.5cm 0添加合成胶', './uploads/20190720/1563586260.jpg', 3299.00000, 12, '<ul id=\"parameter-brand\"><li title=\"京东京造\">品牌：&nbsp;<a href=\"https://list.jd.com/list.html?cat=15248,15249,15274&amp;tid=15274&amp;ev=exbrand_299330\" clstag=\"shangpin|keycount|product|pinpai_2\" target=\"_blank\">京东京造</a></li></ul><ul><li title=\"京东京造泰国天然乳胶床垫\">商品名称：京东京造泰国天然乳胶床垫</li><li title=\"7011788\">商品编号：7011788</li><li title=\"29.84kg\">商品毛重：29.84kg</li><li title=\"中国江苏（内芯原产地：泰国）\">商品产地：中国江苏（内芯原产地：泰国）</li><li title=\"天然乳胶\">材质：天然乳胶</li><li title=\"6-10cm\">厚度：6-10cm</li><li title=\"床垫\">类别：床垫</li><li title=\"居家\">适用场景：居家</li><li title=\"180*200cm\">尺寸：180*200cm</li><li title=\"其它\">面料：其它</li></ul>', '<div><div><h3>主体</h3><dl><dl><dt>面料</dt><dd>其它</dd></dl><dl><dt>分类</dt><dd>床垫</dd></dl><dl><dt>材质</dt><dd>天然乳胶</dd></dl><dl><dt>厚度（cm）</dt><dd>7.5cm</dd></dl><dl><dt>适用尺寸</dt><dd>1.8mx2.0m</dd></dl><dl><dt>适用场景</dt><dd>居家</dd></dl></dl></div></div><div><h3>包装清单</h3><p>床垫*1、吊牌*1</p></div>');
INSERT INTO `dzushop_goods` VALUES (3, 4, 'ROYALLATEX 皇家天然乳胶床垫床褥', 'ROYALLATEX 皇家天然乳胶床垫床褥 泰国进口榻榻米橡胶垫 单双人学生宿舍床褥子 5cm厚度 180cm*200cm', './uploads/20190720/1563586340.jpg', 4588.00000, 12, '<ul><li title=\"ROYALLATEX 皇家天然乳胶床垫床褥 泰国进口榻榻米橡胶垫 单双人学生宿舍床褥子 5cm厚度 180cm*200cm\">商品名称：ROYALLATEX 皇家天然乳胶床垫床褥 泰国进口榻榻米橡胶垫 单双人学生宿舍床褥子 5cm厚度 180cm*200cm</li><li title=\"30415309393\">商品编号：30415309393</li><li title=\"ROYALLATEX海外旗舰店\">店铺：&nbsp;<a href=\"https://royallatex.jd.hk/\" target=\"_blank\">ROYALLATEX海外旗舰店</a></li><li title=\"20.0kg\">商品毛重：20.0kg</li><li title=\"泰国\">商品产地：泰国</li><li title=\"天然乳胶\">材质：天然乳胶</li><li title=\"6-10cm\">厚度：6-10cm</li><li title=\"180*200cm\">尺寸：180*200cm</li><li title=\"居家\">适用场景：居家</li><li title=\"床垫\">类别：床垫</li><li title=\"棉\">面料：棉</li></ul>', '<table cellpadding=\"0\" cellspacing=\"1\" width=\"100%\" border=\"0\"><tbody><tr><th colspan=\"2\">主体</th></tr><tr></tr><tr><td>面料</td><td>纯棉</td></tr><tr><td>分类</td><td>床垫</td></tr><tr><td>材质</td><td>天然乳胶</td></tr><tr><td>厚度（cm）</td><td>7.5cm</td></tr><tr><td>适用尺寸</td><td>1.8mx2.0m</td></tr><tr><td>适用场景</td><td>居家</td></tr></tbody></table>');
INSERT INTO `dzushop_goods` VALUES (4, 6, '小米（MI）小米电视4A', '小米（MI）小米电视4A 50英寸 L50M5-AD/L50M5-5A 2GB+8GB HDR 4K超高清 蓝牙语音遥控 人工智能语音平板电视', './uploads/20190720/1563586515.jpg', 1599.00000, 122, '<ul id=\"parameter-brand\"><li title=\"小米（MI）\">品牌：&nbsp;<a href=\"https://list.jd.com/list.html?cat=737,794,798&amp;tid=798&amp;ev=exbrand_18374\" clstag=\"shangpin|keycount|product|pinpai_1\" target=\"_blank\">小米（MI）</a></li></ul><ul><li title=\"小米L50M5-AD\">商品名称：小米L50M5-AD</li><li title=\"6297347\">商品编号：6297347</li><li title=\"17.5kg\">商品毛重：17.5kg</li><li title=\"中国大陆\">商品产地：中国大陆</li><li title=\"2.5m-3m（46-55英寸）\">观看距离：2.5m-3m（46-55英寸）</li><li title=\"4k超高清（3840×2160）\">分辨率：4k超高清（3840×2160）</li><li title=\"人工智能，4K超清\">电视类型：人工智能，4K超清</li><li title=\"3级\">能效等级：3级</li><li title=\"48-50英寸\">屏幕尺寸：48-50英寸</li><li title=\"10.0-8.0\">选购指数：10.0-8.0</li></ul><p><br></p>', '<div><div><h3>主体参数</h3><dl><dl><dt>产品品牌</dt><dd>小米（MI）</dd></dl><dl><dt>认证型号</dt><dd><a href=\"https://item.jd.com/6297347.html#none\"><i></i></a></dd><dd>L50M5-AD</dd></dl><dl><dt>产品型号</dt><dd>L50M5-AD</dd></dl><dl><dt>产品颜色</dt><dd>黑色</dd></dl><dl><dt>产品类型</dt><dd>4K超清电视；人工智能电视</dd></dl><dl><dt>推荐观看距离(米)</dt><dd>2.5m-3m（46-55英寸）</dd></dl><dl><dt>上市日期</dt><dd>2018年</dd></dl><dl><dt>能效等级</dt><dd>3级</dd></dl></dl></div><div><h3>显示参数</h3><dl><dl><dt>屏幕尺寸</dt><dd>50英寸</dd></dl><dl><dt>屏幕分辨率</dt><dd>超高清4K</dd></dl><dl><dt>HDR显示</dt><dd>支持</dd></dl><dl><dt>背光方式</dt><dd><a href=\"https://item.jd.com/6297347.html#none\"><i></i></a></dd><dd>直下式</dd></dl><dl><dt>刷屏率</dt><dd>60HZ</dd></dl><dl><dt>响应时间</dt><dd>8ms</dd></dl><dl><dt>支持格式（高清）</dt><dd>2160p</dd></dl></dl></div><div><h3>核心参数</h3><dl><dl><dt>智能电视</dt><dd><a href=\"https://item.jd.com/6297347.html#none\"><i></i></a></dd><dd>是</dd></dl><dl><dt>CPU</dt><dd><a href=\"https://item.jd.com/6297347.html#none\"><i></i></a></dd><dd>64位Cortex A53 四核1.5GHz</dd></dl><dl><dt>GPU</dt><dd><a href=\"https://item.jd.com/6297347.html#none\"><i></i></a></dd><dd>Mali-450 750MHz</dd></dl><dl><dt>CPU核数</dt><dd>四核心</dd></dl><dl><dt>运行内存</dt><dd>2GB</dd></dl><dl><dt>存储内存</dt><dd>8GB</dd></dl></dl></div><div><h3>音频参数</h3><dl><dl><dt>扬声器数量</dt><dd>2个</dd></dl></dl></div><div><h3>外观设计</h3><dl><dl><dt>边框材质</dt><dd>塑料</dd></dl><dl><dt>边框宽窄</dt><dd>以官网为准</dd></dl><dl><dt>曲面</dt><dd>否</dd></dl><dl><dt>机身厚薄</dt><dd>以官网为准</dd></dl><dl><dt>底座配置</dt><dd>外置底座</dd></dl><dl><dt>底座旋转</dt><dd>不支持</dd></dl><dl><dt>安装孔距</dt><dd>300*200mm/350*250mm</dd></dl></dl></div><div><h3>端口参数</h3><dl><dl><dt>USB2.0接口</dt><dd>2</dd></dl><dl><dt>USB3.0接口</dt><dd>无</dd></dl><dl><dt>HDMI1.3接口</dt><dd>无</dd></dl><dl><dt>HDMI1.4接口</dt><dd>无</dd></dl><dl><dt>HDMI2.0接口</dt><dd>3</dd></dl><dl><dt>光纤音频输出</dt><dd>不支持</dd></dl></dl></div><div><h3>功耗参数</h3><dl><dl><dt>电源功率（w）</dt><dd>整机功耗：115W</dd></dl><dl><dt>待机功率（w）</dt><dd>待机≤0.50W</dd></dl><dl><dt>工作电压（v）</dt><dd>220v</dd></dl></dl></div><div><h3>规格参数</h3><dl><dl><dt>含底座尺寸（宽*高*厚）mm</dt><dd>1121.7mm*699.7mm*284.8mm</dd></dl><dl><dt>单屏尺寸（宽*高*厚）mm</dt><dd>1121.7mm*646.6mm*78.8mm</dd></dl><dl><dt>外包装尺寸（宽*高*厚）mm</dt><dd>1230mm*730mm*150mm</dd></dl><dl><dt>含底座重量（kg）</dt><dd>10.2kg</dd></dl><dl><dt>单屏重量（kg）</dt><dd>10.05kg</dd></dl><dl><dt>含外包装重量（kg）</dt><dd>13.35kg</dd></dl></dl></div><div><h3>网络参数</h3><dl><dl><dt>网络连接</dt><dd>支持无线</dd></dl><dl><dt>连接方式</dt><dd>无线</dd></dl></dl></div><div><h3>内容服务</h3><dl><dl><dt>应用商店</dt><dd>支持</dd></dl></dl></div><div><h3>交互设备</h3><dl><dl><dt>遥控类型</dt><dd>蓝牙遥控</dd></dl><dl><dt>语音控制</dt><dd>支持</dd></dl></dl></div></div><div><h3>包装清单</h3><p>屏幕*1，支架*2，安装说明*1，蓝牙语音遥控器*1，螺丝包*1,7号电池*2节</p></div>');
INSERT INTO `dzushop_goods` VALUES (5, 6, '小米（MI）小米电视4A', '小米（MI）小米电视4A 32英寸 L32M5-AZ 1GB+4GB 四核处理器 高清人工智能网络液晶平板电视', './uploads/20190720/1563586703.jpg', 699.00000, 1245, '<ul id=\"parameter-brand\"><li title=\"小米（MI）\">品牌：&nbsp;<a href=\"https://list.jd.com/list.html?cat=737,794,798&amp;tid=798&amp;ev=exbrand_18374\" clstag=\"shangpin|keycount|product|pinpai_1\" target=\"_blank\">小米（MI）</a></li></ul><ul><li title=\"小米L32M5-AZ\">商品名称：小米L32M5-AZ</li><li title=\"4620979\">商品编号：4620979</li><li title=\"8.0kg\">商品毛重：8.0kg</li><li title=\"中国大陆\">商品产地：中国大陆</li><li title=\"2m以下（≤32英寸）\">观看距离：2m以下（≤32英寸）</li><li title=\"高清（1366×768）\">分辨率：高清（1366×768）</li><li title=\"人工智能\">电视类型：人工智能</li><li title=\"3级\">能效等级：3级</li><li title=\"32英寸及以下\">屏幕尺寸：32英寸及以下</li><li title=\"6.9-6.0\">选购指数：6.9-6.0</li></ul>', '<div><div><h3>主体参数</h3><dl><dl><dt>产品品牌</dt><dd>小米（MI）</dd></dl><dl><dt>认证型号</dt><dd><a href=\"https://item.jd.com/4620979.html#none\"><i></i></a></dd><dd>L32M5-AZ</dd></dl><dl><dt>产品型号</dt><dd>小米电视4A 32英寸</dd></dl><dl><dt>产品颜色</dt><dd>黑色</dd></dl><dl><dt>产品类型</dt><dd>人工智能电视</dd></dl><dl><dt>推荐观看距离(米)</dt><dd>2m-2.5m（33-45英寸）</dd></dl><dl><dt>上市日期</dt><dd>2017.7</dd></dl><dl><dt>能效等级</dt><dd>3级</dd></dl></dl></div><div><h3>显示参数</h3><dl><dl><dt>屏幕尺寸</dt><dd>32英寸</dd></dl><dl><dt>屏幕分辨率</dt><dd>高清</dd></dl><dl><dt>HDR显示</dt><dd>不支持</dd></dl><dl><dt>背光方式</dt><dd><a href=\"https://item.jd.com/4620979.html#none\"><i></i></a></dd><dd>直下式</dd></dl><dl><dt>刷屏率</dt><dd>60HZ</dd></dl><dl><dt>响应时间</dt><dd>6.5ms</dd></dl><dl><dt>支持格式（高清）</dt><dd>768</dd></dl></dl></div><div><h3>核心参数</h3><dl><dl><dt>智能电视</dt><dd><a href=\"https://item.jd.com/4620979.html#none\"><i></i></a></dd><dd>是</dd></dl><dl><dt>CPU</dt><dd><a href=\"https://item.jd.com/4620979.html#none\"><i></i></a></dd><dd>64位 Cortex A53 四核 1.5GHz</dd></dl><dl><dt>GPU</dt><dd><a href=\"https://item.jd.com/4620979.html#none\"><i></i></a></dd><dd>Mali-450 MP3 up to 750MHz</dd></dl><dl><dt>CPU核数</dt><dd>四核心</dd></dl><dl><dt>运行内存</dt><dd>1GB</dd></dl><dl><dt>存储内存</dt><dd>4GB</dd></dl></dl></div><div><h3>音频参数</h3><dl><dl><dt>多声道功能</dt><dd>立体声</dd></dl><dl><dt>扬声器数量</dt><dd>跑道型高灵敏度立体声扬声器2X5W</dd></dl></dl></div><div><h3>外观设计</h3><dl><dl><dt>边框材质</dt><dd>塑料</dd></dl><dl><dt>边框宽窄</dt><dd>以官网为准</dd></dl><dl><dt>曲面</dt><dd>否</dd></dl><dl><dt>机身厚薄</dt><dd>最薄处：10.2mm</dd></dl><dl><dt>底座配置</dt><dd>外置底座</dd></dl><dl><dt>底座旋转</dt><dd>不支持</dd></dl><dl><dt>安装孔距</dt><dd>100*100</dd></dl></dl></div><div><h3>端口参数</h3><dl><dl><dt>USB2.0接口</dt><dd>1</dd></dl><dl><dt>USB3.0接口</dt><dd>无</dd></dl><dl><dt>HDMI1.3接口</dt><dd>无</dd></dl><dl><dt>HDMI1.4接口</dt><dd>无</dd></dl><dl><dt>HDMI2.0接口</dt><dd>2</dd></dl><dl><dt>光纤音频输出</dt><dd>不支持</dd></dl></dl></div><div><h3>USB支持格式</h3><dl><dl><dt>USB支持视频格式</dt><dd>内置 Mi-Player 全格式播放器 支持 RM、FLV、MOV、AVI、MKV、TS、MP4 等主流格式</dd></dl><dl><dt>USB支持音频格式</dt><dd>支持常见音频格式 详见小米官网及产品说明书</dd></dl><dl><dt>USB支持图片格式</dt><dd>支持常见音频格式 详见小米官网及产品说明书</dd></dl></dl></div><div><h3>功耗参数</h3><dl><dl><dt>电源功率（w）</dt><dd>220V~50/60Hz</dd></dl><dl><dt>待机功率（w）</dt><dd>≤0.50W</dd></dl><dl><dt>工作电压（v）</dt><dd>220v</dd></dl></dl></div><div><h3>规格参数</h3><dl><dl><dt>含底座尺寸（宽*高*厚）mm</dt><dd>733*478*180mm</dd></dl><dl><dt>单屏尺寸（宽*高*厚）mm</dt><dd>733*435*80mm</dd></dl><dl><dt>外包装尺寸（宽*高*厚）mm</dt><dd>以官网为准</dd></dl><dl><dt>含底座重量（kg）</dt><dd>3.94kg</dd></dl><dl><dt>单屏重量（kg）</dt><dd>3.9kg</dd></dl><dl><dt>含外包装重量（kg）</dt><dd>5.2kg</dd></dl></dl></div><div><h3>网络参数</h3><dl><dl><dt>网络连接</dt><dd>支持无线</dd></dl><dl><dt>连接方式</dt><dd>无线</dd></dl></dl></div><div><h3>内容服务</h3><dl><dl><dt>应用商店</dt><dd>支持</dd></dl></dl></div><div><h3>交互设备</h3><dl><dl><dt>遥控类型</dt><dd>红外遥控</dd></dl></dl></div></div><div><h3>包装清单</h3><p>机身x1、 支架x2、安装说明x1、红外遥控器*x 1 个、螺钉 x 4、</p></div>');
COMMIT;

-- ----------------------------
-- Table structure for dzushop_goodsImg
-- ----------------------------
DROP TABLE IF EXISTS `dzushop_goodsImg`;
CREATE TABLE `dzushop_goodsImg` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `gid` int(10) NOT NULL COMMENT '商品管理ID',
  `img` varchar(255) NOT NULL COMMENT '商品小图地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for dzushop_orders
-- ----------------------------
DROP TABLE IF EXISTS `dzushop_orders`;
CREATE TABLE `dzushop_orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `code` varchar(255) NOT NULL COMMENT '订单编号',
  `uid` int(10) NOT NULL COMMENT '用户ID',
  `gid` int(10) NOT NULL COMMENT '商品ID',
  `price` decimal(10,5) NOT NULL COMMENT '商品价格',
  `num` int(10) NOT NULL COMMENT '订单数量',
  `aid` int(10) NOT NULL COMMENT '收货地址ID',
  `time` int(11) NOT NULL COMMENT '订单生成时间',
  `money` varchar(255) NOT NULL COMMENT '支付状态（0未支付，1已支付）',
  `sid` int(10) NOT NULL COMMENT '订单状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of dzushop_orders
-- ----------------------------
BEGIN;
INSERT INTO `dzushop_orders` VALUES (1, '10001', 1, 2, 23.00000, 2, 1, 123456789, '0', 6);
INSERT INTO `dzushop_orders` VALUES (2, '10002', 2, 3, 45.00000, 2, 2, 123456789, '0', 6);
INSERT INTO `dzushop_orders` VALUES (3, '10002', 2, 4, 560.00000, 1, 2, 123456789, '0', 6);
COMMIT;

-- ----------------------------
-- Table structure for dzushop_ordersStatus
-- ----------------------------
DROP TABLE IF EXISTS `dzushop_ordersStatus`;
CREATE TABLE `dzushop_ordersStatus` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) NOT NULL COMMENT '订单状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of dzushop_ordersStatus
-- ----------------------------
BEGIN;
INSERT INTO `dzushop_ordersStatus` VALUES (1, '未付款');
INSERT INTO `dzushop_ordersStatus` VALUES (2, '已发货');
INSERT INTO `dzushop_ordersStatus` VALUES (3, '在途中');
INSERT INTO `dzushop_ordersStatus` VALUES (4, '配送中');
INSERT INTO `dzushop_ordersStatus` VALUES (5, '已签收');
INSERT INTO `dzushop_ordersStatus` VALUES (6, '已完成');
COMMIT;

-- ----------------------------
-- Table structure for dzushop_slider
-- ----------------------------
DROP TABLE IF EXISTS `dzushop_slider`;
CREATE TABLE `dzushop_slider` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `img` varchar(255) NOT NULL COMMENT '轮播图图片地址',
  `sort` tinyint(5) NOT NULL COMMENT '轮播图排序',
  `title` varchar(255) NOT NULL COMMENT '轮播图标题',
  `href` varchar(255) NOT NULL COMMENT '轮播图链接',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of dzushop_slider
-- ----------------------------
BEGIN;
INSERT INTO `dzushop_slider` VALUES (1, './uploads/20190729/1564362774.jpg', 12, '大减价111', 'http://dzushop.debuginn.cn');
INSERT INTO `dzushop_slider` VALUES (3, './uploads/20190729/1564362785.jpg', 2, '活动促销', 'http://dzushop.debuginn.cn/admin/slider/create');
COMMIT;

-- ----------------------------
-- Table structure for dzushop_types
-- ----------------------------
DROP TABLE IF EXISTS `dzushop_types`;
CREATE TABLE `dzushop_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) NOT NULL COMMENT '分类名称',
  `pid` int(11) NOT NULL COMMENT '父分类ID',
  `path` varchar(255) NOT NULL COMMENT '路径',
  `sort` int(255) NOT NULL COMMENT '分类排序',
  `is_lou` tinyint(1) NOT NULL COMMENT '是否是楼层分类',
  `title` varchar(255) NOT NULL COMMENT '分类标题',
  `keywords` varchar(255) NOT NULL COMMENT '分类关键字',
  `description` varchar(255) NOT NULL COMMENT '分类描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of dzushop_types
-- ----------------------------
BEGIN;
INSERT INTO `dzushop_types` VALUES (1, 'lenovo电脑', 0, '0,', 0, 0, 'lenovo电脑', 'lenovo电脑', 'lenovo电脑');
INSERT INTO `dzushop_types` VALUES (2, '主厅', 1, '0,1,', 13, 1, '主客厅', '主客厅', '主客厅');
INSERT INTO `dzushop_types` VALUES (3, '客厅', 1, '0,1,', 0, 1, '客厅', '客厅', '客厅');
INSERT INTO `dzushop_types` VALUES (4, '主卧床', 2, '0,1,2,', 15, 1, '主卧床', '主卧床', '床');
INSERT INTO `dzushop_types` VALUES (5, '落地窗', 2, '0,1,2,', 16, 1, '落地窗', '落地窗', '落地窗');
INSERT INTO `dzushop_types` VALUES (6, '电视', 3, '0,1,3,', 0, 1, '电视', '电视', '电视');
INSERT INTO `dzushop_types` VALUES (7, '电冰箱', 3, '0,1,3,', 0, 1, '电冰箱', '电冰箱', '电冰箱');
INSERT INTO `dzushop_types` VALUES (8, '沙发', 3, '0,1,3,', 0, 1, '沙发', '沙发', '沙发');
INSERT INTO `dzushop_types` VALUES (17, 'thinkpad电脑', 0, '0,', 1, 0, 'thinkpad电脑', 'thinkpad电脑', 'thinkpad电脑');
INSERT INTO `dzushop_types` VALUES (18, '手机 / 通讯', 0, '0,', 1, 0, '手机 / 通讯', '手机 / 通讯', '手机 / 通讯');
INSERT INTO `dzushop_types` VALUES (19, '智能产品', 0, '0,', 2, 0, '智能产品', '智能产品', '智能产品');
COMMIT;

-- ----------------------------
-- Table structure for dzushop_typesAds
-- ----------------------------
DROP TABLE IF EXISTS `dzushop_typesAds`;
CREATE TABLE `dzushop_typesAds` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `tid` int(10) NOT NULL COMMENT '分类名称ID',
  `img` varchar(255) NOT NULL COMMENT '分类广告图片路径',
  `type` tinyint(1) NOT NULL COMMENT '分类广告图片类型（大图0、小图1）',
  `title` varchar(255) NOT NULL COMMENT '分类广告名称',
  `href` varchar(255) NOT NULL COMMENT '分类广告链接地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of dzushop_typesAds
-- ----------------------------
BEGIN;
INSERT INTO `dzushop_typesAds` VALUES (1, 1, './uploads/20190801/1564643884.jpg', 1, '刃9000 新品来袭！ RTX 2060 SUPER 显卡', 'http://dzushop.debuginn.cn');
INSERT INTO `dzushop_typesAds` VALUES (3, 3, './uploads/20190801/1564653222.jpg', 1, '22222', 'http://dzushop.debuginn.cn');
INSERT INTO `dzushop_typesAds` VALUES (4, 1, './uploads/20190801/1564653252.jpg', 1, '3333', '1111');
INSERT INTO `dzushop_typesAds` VALUES (5, 1, './uploads/20190801/1564663377.jpg', 0, '2323', '2323');
INSERT INTO `dzushop_typesAds` VALUES (6, 17, './uploads/20190801/1564663396.jpg', 0, '2356', '11');
INSERT INTO `dzushop_typesAds` VALUES (7, 18, './uploads/20190801/1564663422.jpg', 0, '0', '0');
INSERT INTO `dzushop_typesAds` VALUES (8, 19, './uploads/20190801/1564663445.jpg', 0, '23', '23');
COMMIT;

-- ----------------------------
-- Table structure for dzushop_user
-- ----------------------------
DROP TABLE IF EXISTS `dzushop_user`;
CREATE TABLE `dzushop_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `email` varchar(40) NOT NULL COMMENT '用户邮箱',
  `pass` varchar(255) NOT NULL COMMENT '用户密码',
  `tel` varchar(11) NOT NULL COMMENT '用户电话',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '用户状态',
  `time` int(11) NOT NULL COMMENT '用户注册时间',
  `token` varchar(50) NOT NULL COMMENT '用户安全值',
  `aid` int(11) DEFAULT NULL COMMENT '用户默认地址',
  `name` varchar(255) NOT NULL COMMENT '用户昵称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of dzushop_user
-- ----------------------------
BEGIN;
INSERT INTO `dzushop_user` VALUES (1, '728838939@qq.com', '123456789', '15069765321', 0, 123456789, '123456789', 0, '张三');
INSERT INTO `dzushop_user` VALUES (2, 'xianhui.meng.cn@gmail.com', '123456789', '12345678901', 0, 123456789, '123456789', 0, '李四');
COMMIT;

-- ----------------------------
-- Table structure for dzushop_userInfo
-- ----------------------------
DROP TABLE IF EXISTS `dzushop_userInfo`;
CREATE TABLE `dzushop_userInfo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(11) NOT NULL COMMENT '唯一用户ID',
  `nickname` varchar(88) NOT NULL COMMENT '用户昵称',
  `sex` tinyint(10) NOT NULL COMMENT '用户性别',
  `birthday` int(255) NOT NULL COMMENT '用户生日',
  `addr` varchar(255) NOT NULL COMMENT '用户地址',
  `addrInfo` varchar(255) NOT NULL COMMENT '用户详细地址',
  `img` varchar(255) NOT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

SET FOREIGN_KEY_CHECKS = 1;
