!function(){function e(){this.terminal=1,this.shareCode="",this.nowNumber=31536e8,this.env=0,this.baseInfo={isApp:!1,isHSApp:!1,isLenovoApp:!1,name:"",showPrice:0,price:0,basePrice:0,marketable:0,mallType:window.shopId||n.mallTypeMapping.lenovoShop.code,materialNumber:"",isService:0,salesType:0,stock:0,isIndependentSale:0,isPhysical:0,LCode:"",SNCode:"",gmsl:5,isPersonalPositions:[],personalPositions:"",categoryCode:0},this.activity=null,this.promotion={gifts:null,giftsSelectable:null,saleReduction:null,fullReduction:null,goodsStatus:null,option:null,packs:null},this.components={scrollPicture:null,title:null,guige:null,service:null,buygroup:null,srdz:null,bxzp:null,tjxj:null,hotlist:null,taocan:null},this.baseInfo.isHSApp=this.getIsHSApp(),this.baseInfo.isLenovoApp=this.getIsLenovoAPP()}function t(){return Boolean("object"==typeof global&&global&&global.Object===Object&&global)}function o(e,t,o){for(var s=[],a=0;a<e.length;a++)t(e[a])==o&&s.push(e[a]);return s}function s(e,t){return RegExp(e).test(t)}function a(e){for(var t=new Array,o=0;o<e.length;o++)s(e[o],t)||t.push(e[o]);return t}function i(e){var t=new Date(e),o=t.getFullYear(),s=t.getMonth()+1,a=t.getDate(),i=t.getHours(),n=t.getMinutes(),r=t.getSeconds();return s<=9&&(s="0"+s),a<=9&&(a="0"+a),i<=9&&(i="0"+i),n<=9&&(n="0"+n),r<=9&&(r="0"+r),o+"-"+s+"-"+a+" "+i+":"+n+":"+r}var n={isDebug:!1,isRunInNode:t,mallTypeMapping:{lenovoShop:{code:"1",name:"联想商城"},thinkShop:{code:"2",name:"think商城"},SMBShop:{code:"8",name:"SMB商城"},SMBScoreShop:{code:"9",name:"SMB积分商城"},HuishangShop:{code:"14",name:"惠商商城"},HuishangScoreShop:{code:"15",name:"惠商积分商城"}},errorMessage:{busy:"商城系统繁忙，请稍后再试！",error:"商城系统异常，请稍后再试！",maintenance:"商城系统正在维护，请稍后再试！",_defaults:"商城系统繁忙，请稍后再试！"},getItemDomain:function(){var e="";return location.host.indexOf("lenovouat")>=0&&(e="https://papi.lenovouat.com"),location.host.indexOf("cn")>=0&&(e="https://papi.lenovo.com.cn"),e},queryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),o=window.location.search.substr(1).match(t);return null!=o?decodeURIComponent(o[2]):null},addCookie:function(e,t,o){if(o=$.extend({path:"/"},o||{}),"number"==typeof o.expires){var s=o.expires,a=o.expires=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*s)}return document.cookie=[encodeURIComponent(e),"=",window.PDUtil.stringifyCookieValue(t,o),o.expires?"; expires="+o.expires.toUTCString():"",o.path?"; path="+o.path:"",o.domain?"; domain="+o.domain:"",o.secure?"; secure":""].join("")},stringifyCookieValue:function(e,t){return encodeURIComponent(t.json?JSON.stringify(e):String(e))},getCookie:function(e){for(var t=document.cookie,o=t.split("; "),s=0;s<o.length;s++){var a=o[s].split("=");if(a[0]==e)return decodeURIComponent(a[1])}return null},extend:function(e){var t=function(){e.call(this)};return Object.setPrototypeOf?Object.setPrototypeOf(t.prototype,e.prototype):t.prototype.__proto__?t.prototype.__proto__=e.prototype:(t.prototype=new e,t.prototype.constructor=t),t},dropSome:function(e,t){return o(e,t,!1)},getSome:function(e,t){return o(e,t,!0)},findFirst:function(e,t){for(var o=null,s=0;s<e.length;s++)if(1==t(e[s])){o=e[s];break}return o},cutPicturePath:function(e,t){if(e&&e.length>0&&t&&t>0){var o=e.lastIndexOf("."),s=e.substring(o,e.length),a=e.substring(0,o);return a+".w"+t+s}return""},debug:function(e){this.isDebug&&window.console&&console.info&&console.info(e)},log:function(e){this.isDebug&&window.console&&console.log&&console.log(e)},warn:function(e){this.isDebug&&window.console&&console.warn&&console.warn(e)},timer:function(e,t,o){e/=1e3;var s=setInterval(function(){var a=0,i=0,n=0,r=0;if(!(e>0))return clearInterval(s),o(),!1;a=Math.floor(e/86400),i=Math.floor(e/3600)-24*a,n=Math.floor(e/60)-24*a*60-60*i,r=Math.floor(e)-24*a*60*60-60*i*60-60*n,i<=9&&(i="0"+i),n<=9&&(n="0"+n),r<=9&&(r="0"+r);var c="";0!=a&&(c+=a+"天 "),c+=i+":"+n+":"+r,t(c,i,n,r),e--},1e3)},checkTelNo:function(e){if(!e)return!1;var t=/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/g;return t.test(e)},formatShortDate:function(e){var t=e.split(/[- : \/]/),o=new Date(t[0],t[1]-1,t[2],t[3],t[4],t[5]),s=(o.getFullYear(),o.getMonth()+1),a=o.getDate(),i=o.getHours(),n=o.getMinutes(),r=o.getSeconds();return s<=9&&(s="0"+s),a<=9&&(a="0"+a),i<=9&&(i="0"+i),n<=9&&(n="0"+n),r<=9&&(r="0"+r),s+"月"+a+"日 "+i+":"+n},mySwiper:function(e){function t(){var e={opacity:.5},t={opacity:1};l>=a.length-c?r.css(e):r.css(t),l<=0?i.css(e):i.css(t)}var o=$(e.fid),s=o.find(e.ul),a=o.find(e.lis),i=o.find(e.leftBtn),r=o.find(e.rightBtn),c=e.count,l=0,u=parseInt(a.css("width")),d=parseInt(a.css("marginRight")),p=parseInt(a.css("marginLeft")),f=0===d?p:d,h=u+f,b=a.length*h;s.css("width",b),t(),r.on("click",function(){if(!(l>=a.length-c)){l++,t();var e=l*-h;n.animate(s[0],e)}}),i.on("click",function(){if(!(l<=0)){l--,t();var e=l*-h;n.animate(s[0],e)}})},animate:function(e,t){clearInterval(e.timer),e.timer=setInterval(function(){var o=8,s=e.offsetLeft;o=s<t?o:-o,s+=o,Math.abs(t-s)>Math.abs(o)?e.style.left=s+"px":(e.style.left=t+"px",clearInterval(e.timer))},20)},pd_getByteLen:function(e){for(var t=0,o=0;o<e.length;o++){var s=e.charAt(o);t+=null!=s.match(/[^\x00-\xff]/gi)?2:1}return t}};e.prototype={constructor:e,getIsHSApp:function(){return/lenovotradeapp/i.test(navigator.userAgent)},getIsLenovoAPP:function(){return/lenovomallapp/i.test(navigator.userAgent)},getShareTitle:function(e){var t=e||window.code,o="";return o="59363"==t||"59364"==t||"59355"==t||"59362"==t||"91865"==t?"只需语音指令，畅享智能生活。联想智能音箱，全心为你！":"我的小伙伴下单立得专属优惠券，快来看看吧！"},private_process_activity:function(){var e=this;if(void 0!==e.activity&&("undefined"==typeof iskcode||0==iskcode)){var t=e.activity,o=this.nowNumber;switch(e.baseInfo.activityType){case 1:var s=e.activity.PurchasedJson={};s.fromtime=t.buyStartTime,s.totime=t.buyEndTime,s.fromtimeStr=i(t.buyStartTime),s.totimeStr=i(t.buyEndTime),s.productPrice=e.baseInfo.price,s.discount=t.discount,s.purchaseCeiling=t.purchaseCeiling,e.baseInfo.gmsl=t.purchaseCeiling;break;case 2:var a=e.activity.ShanGou={};a.startNumber=t.buyStartTime,a.startTimeStr=i(t.buyStartTime),a.endNumber=t.buyEndTime,a.endTimeStr=i(t.buyEndTime),a.yystartNumber=t.reservationStartTime,a.yystartTimeStr=i(t.reservationStartTime),a.yyendNumber=t.reservationEndTime,a.yyendTimeStr=i(t.reservationEndTime),a.fyyStartNumber=t.noReservationBuyTime,a.fyyStartTimeStr=i(t.noReservationBuyTime),a.purchaseCeiling=t.purchaseCeiling,a.discount=t.discount,o<a.endNumber&&(e.baseInfo.gmsl=t.purchaseCeiling,e.baseInfo.showPrice=parseFloat(e.baseInfo.price)),0==e.activity.isReservation?a.type=0:1==e.activity.isReservation&&void 0==e.activity.noReservationBuyTime?a.type=1:1==e.activity.isReservation&&e.activity.noReservationBuyTime&&(a.type=2);break;case 3:var n=e.activity.flushSaleJson={};n.fromtime=t.buyStartTime,n.totime=t.buyEndTime,n.fromtimeStr=i(t.buyStartTime),n.totimeStr=i(t.buyEndTime),n.productPrice=e.baseInfo.price,n.discountAmount=t.discount,n.purchaseCeiling=t.purchaseCeiling,e.baseInfo.showPrice=parseFloat(e.baseInfo.price),o>n.fromtime&&o<n.totime?(n.status="IN",e.baseInfo.gmsl=t.purchaseCeiling):o<t.flushSaleJson.fromtime?(n.status="BEFORE",e.baseInfo.gmsl=t.purchaseCeiling):(n.status="AFTER",e.baseInfo.showPrice=e.baseInfo.price)}}},processBuyButton:function(){var e={isShow:!0,showText:"立即购买",isDisabled:!0};if(1!=this.baseInfo.marketable)e.showText="商品已下架",$("#ljgm, #button_dhtz").css({border:"none"});else if(0==this.baseInfo.isShowPrice&&this.baseInfo.mallType==n.mallTypeMapping.lenovoShop.code||""===this.baseInfo.price&&!$p.baseInfo.isIntegral)e.showText="立即咨询";else if(""!==this.baseInfo.price||$p.baseInfo.isIntegral)if(0==this.baseInfo.isIndependentSale)e.showText="非独立销售商品",$("#ljgm, #button_dhtz").css({border:"none"});else if(0==this.isCurrentTerminal())e.showText="不在当前平台销售",$("#ljgm, #button_dhtz").css({border:"none"});else if(this.isLcodeProduct())e.showText="L 码购买",e.isDisabled=!1;else if(5==this.baseInfo.salesType)e.showText="立即定制",e.isDisabled=!1;else if(2==this.baseInfo.salesType)e.showText="敬请期待",e.isDisabled=!0,$("#ljgm, #button_dhtz").css({border:"none"});else if(3==this.baseInfo.activityType){var t=this.activity;"BEFORE"==t.flushSaleJson.status?(e.showText="敬请期待",e.isDisabled=!0,$("#ljgm, #button_dhtz").css({border:"none"})):"IN"==t.flushSaleJson.status?this.baseInfo.stock>0?(e.showText="立即抢购",e.isDisabled=!1):(e.showText="已售罄",e.isDisabled=!0,$("#ljgm, #button_dhtz").css({border:"none"})):this.baseInfo.stock>0?(e.showText="立即购买",e.isDisabled=!1):(e.showText="已售罄",e.isDisabled=!0,$("#ljgm, #button_dhtz").css({border:"none"}))}else this.baseInfo.stock<=0?(e.showText="已售罄",$("#ljgm, #button_dhtz").css({border:"none"})):(e.showText="立即购买",e.isDisabled=!1);else e.showText=" ",e.isDisabled=!0,e.isShow=!1;return e},processAddCartButton:function(){var e={isShow:!0,showText:"加入购物车",isDisabled:!1},t=this.nowNumber;if(window.ischangenew&&1==window.ischangenew&&(e.isShow=!0),/^(2|4|5|6|98)$/gi.test(this.baseInfo.salesType+""))e.isShow=!1;else if(0==this.baseInfo.stock)e.isShow=!1;else if(1!=this.baseInfo.marketable)e.isShow=!1;else if(this.baseInfo.isIntegral)e.isShow=!1;else if(0==this.baseInfo.isPhysical&&30==this.baseInfo.buOwner)e.isShow=!1;else if(0==this.baseInfo.isIndependentSale)e.isShow=!1;else if(0==this.isCurrentTerminal())e.isShow=!1;else if(this.shareCode&&this.shareCode.length>0)e.isShow=!1;else if(this.isLcodeProduct())e.isShow=!1;else if(this.baseInfo.isService>0&&0==this.baseInfo.isPhysical)e.isShow=!1;else if(3==this.baseInfo.activityType){var o=this.activity.flushSaleJson.totime;t>o?e.isShow=!0:e.isShow=!1}else if(2==this.baseInfo.activityType){var s=this.activity.ShanGou;s.endNumber&&this.nowNumber<s.endNumber&&(e.isShow=!1)}else 1==this.baseInfo.activityType&&t<this.activity.PurchasedJson.totime?e.isShow=!1:""==this.baseInfo.price?e.isShow=!1:this.baseInfo.isPersonalPositions&&this.baseInfo.isPersonalPositions.length>0?e.isShow=!0:0==this.baseInfo.isShowPrice&&this.baseInfo.mallType==n.mallTypeMapping.lenovoShop.code?e.isShow=!1:e.isShow=!0;return e},processNoticeButton:function(){var e={isShow:!1,showText:"到货通知",isDisabled:!1};return this.baseInfo.stock<=0&&0!=this.baseInfo.isPhysical&&!this.isShowYuyue()?e.isShow=!0:""!==$p.baseInfo.price||$p.baseInfo.isIntegral||(e.isShow=!1),e},processShowPrice:function(){var e={isShow:!0,showText:"",isDisabled:!1};return this.isShowYuyue()?e.showText="按需定制":0==this.baseInfo.isShowPrice&&this.baseInfo.mallType==n.mallTypeMapping.lenovoShop.code?(e.showText="暂无报价",$("#container_purchase_count").addClass("hidden")):this.baseInfo.showPrice>0||$p.baseInfo.isIntegral?e.showText=this.baseInfo.showPrice.toFixed(2):""!==this.baseInfo.price||$p.baseInfo.isIntegral?e.showText="":(e.showText="暂无报价",$("#container_purchase_count").addClass("hidden")),e},processShowBuyCount:function(){var e=!0;return(0==this.baseInfo.isShowPrice&&this.baseInfo.mallType==n.mallTypeMapping.lenovoShop.code||""===this.baseInfo.price&&!$p.baseInfo.isIntegral)&&(e=!1),e},processBXZPNeedShowList:function(){var e=[],t=this.promotion.gifts;if(t&&0!=t.length)for(var o=this.nowNumber,s=0;s<t.length;s++){var a=t[s],i=this.promotion&&this.promotion.goodsStatus&&this.promotion.goodsStatus[a.code],n=o>a.fromtime&&o<a.totime;i&&n&&e.push(a)}else e=[];return e},processKXZPNeedShowList:function(){var e=[],t=this.promotion.giftsSelectable;if(t&&0!=t.length)for(var o=this.nowNumber,s=0;s<t.length;s++){var a=t[s],i=this.promotion&&this.promotion.goodsStatus&&this.promotion.goodsStatus[a.code],n=o>a.fromtime&&o<a.totime;i&&n&&e.push(a)}else e=[];return e},processXJNeedShowList:function(){var e=[];if(this.promotion&&this.promotion.option&&0!=this.promotion.option.length)for(var t=this.nowNumber,o=0;o<this.promotion.option.length;o++){var s=this.promotion.option[o],a=this.promotion&&this.promotion.goodsStatus&&this.promotion.goodsStatus[s.code],i=t>s.fromtime&&t<s.totime,n=parseFloat(s.discountAmount);a&&i&&e.push($.extend({showPrice:s.productPrice-n},s))}else e=[];return e},processTaocanNeedShowList:function(){var e=[];try{var t=this.promotion;if(t&&t.packs&&0!=t.packs.length)for(var o=(this.nowNumber,0);o<t.packs.length;o++){var s={data:[],packStatus:1};s.data=t.packs[o],$.each(t.packs[o],function(e,t){0==t.stockStatus&&(s.packStatus=0)}),s.canSell=!!(1==s.packStatus&&this.isCurrentTerminal()&&this.baseInfo.marketable&&this.baseInfo.stock),s.discount=parseFloat(s.data[0].totalDiscountAmount),s.showPrice=parseFloat(s.data[0].totalPrice)-s.discount,e.push(s)}else e=[]}catch(t){n.warn("PDBase.processTaocanNeedShowList错误 --------------->"),n.warn(t),e=[]}return e},fn_Specifications:{SpecificationsRelList:{},SpecificationsRels:"",valeDisabled:function(e,t){var o=this;if(o.SpecificationsRelList){if(0==o.SpecificationsRelList.length)return[];for(var i="string"==typeof e||"number"==typeof e?this.getDefaultSF(e):e,n=[],r=[],c=0;c<i.length;c++){for(var l=[],u=0,d=0;d<specInfo.length;d++)if(specInfo[d].typeid==i[c].typeid){u=d;break}for(var p=0;p<specInfo[c].gsdlist.length;p++)i[c].gsdId==specInfo[u].gsdlist[p].gsdId&&l.push(specInfo[c].gsdlist[p].gcode);l.length>0&&r.push(l)}var f=[];if(r.length>0&&$.each(r[0],function(e,t){for(var o=1,s=1;s<r.length;s++)$.inArray(t,r[s])!=-1&&o++;o==s&&f.push(t)}),f.length>0)var h=f;else var h=[code];return $.each(i,function(e,t){$.each(o.SpecificationsRels,function(e,o){if(t.typeid!=o.typeid){var i=[],r=[];$.each(o.gsdlist,function(e,t){h instanceof Array&&h.length>0&&(h.join("").indexOf(t.gcode)==-1?i.push(t.gsdId):r.push(t.gsdId))}),$.each(a(i),function(e,t){s(t,r)||n.push(t)})}})}),$.each(n,function(e,o){if("function"==typeof t)return t(o)}),n}},valeDefault:function(e,t){if(this.SpecificationsRelList){var o=[];return $.each(this.getDefaultSF(e),function(e,s){o.push(s.gsdId),"function"==typeof t&&t(s.gsdId)}),o}},getgcode:function(e){var t=this;if(e){var o=[];if($.each(e,function(e,s){o=0==o.length?t.getcodesbygg(s.typeid,s.gsdId):t.intersect(o,t.getcodesbygg(s.typeid,s.gsdId))}),1==o.length)return o[0]}if(0==t.SpecificationsRelList.length)return[];var s=[];return $.each(t.SpecificationsRels,function(e,t){$.each(t.gsdlist,function(e,t){s.push(t.gcode)})}),0==s.length?[]:a(s)},getDefaultSF:function(e){var t=[];return $.each(this.SpecificationsRels,function(o,s){$.each(s.gsdlist,function(o,a){a.gcode==e&&t.push({typeid:s.typeid,gsdId:a.gsdId})})}),t},getcodesbygg:function(e,t){var o=this,s=[];return $.each(o.SpecificationsRels,function(o,a){a.typeid==e&&$.each(a.gsdlist,function(e,o){o.gsdId==t&&s.push(o.gcode)})}),s},intersect:function(e,t){var o=[];return $.each(a(e),function(e,a){return s(a,t)?o.push(a):null}),o}},getShareInfo:function(){var e=!1,t=window.location.href,o=n.queryString("sharecode");if(o&&o.length>0){e=!0,this.shareCode=o,n.addCookie("sharecode",this.shareCode,{expires:15});var s=n.queryString("promotionChannels")||"",a=this.shareCode,i=location.hostname,r=i.substring(i.length-14);n.addCookie("c2clenovo",'{"promotionName":"'+$p.baseInfo.name+'","promotionType":"0","promotionChannels":"'+s+'","memberId":"'+a+'", "type": "1"}',{domain:r,expires:15}),n.addCookie("wi","",{domain:r}),n.addCookie("cid","",{domain:r}),n.addCookie("target","",{domain:r}),n.addCookie("channel","",{domain:r}),n.addCookie("source","",{domain:r}),$.ajax({url:n.getItemDomain()+"/api/c2c/sharedby.do",type:"GET",data:{sharecode:this.shareCode,sourceurl:t,promotionChannels:s,promotionName:this.baseInfo.name,promotionType:"0"},dataType:"jsonp",jsonp:"callback",jsonpCallback:"jQueryJSONP_c2c_sharedby",timeout:5e3})}return e},isShowYuyue:function(){return this.mallType==n.mallTypeMapping.SMBShop.code&&"0"==this.baseInfo.isShowPrice},isShowActivity:function(){var e=this.baseInfo;return 1==e.marketable&&0!=e.isIndependentSale&&this.isCurrentTerminal()&&2!=e.salesType},isShowShangou:function(){var e=this.baseInfo;return 2==e.activityType&&this.isShowActivity()},isCurrentTerminal:function(){return!0},isLcodeProduct:function(){return!(!window.iskcode||1!==iskcode)},loadData:function(e){var t=this;t.loadProductInfo(function(){t.loadPromotionInfo(null,null,function(){t.loadStock(null,null,function(){e&&e.call(t)})})},function(){alert("商品信息加载失败，请刷新页面重试！")})},loadAllProductionInfo:function(e,t,o){var s=this,a=(new Date).getMilliseconds(),i='[{"uri":"/batch/openapi/goods/detail/mget/B00001","param":{"code":'+window.code+',"ss":'+a+'}},{"uri":"/batch/promoapi/api/front/getPromoMsg.jhtm","param":{"gcode":'+window.code+',"terminal":'+window.$p.terminal+',"shopId":'+window.shopId+', "ss":'+a+"}}]";$.ajax({type:"GET",url:n.getItemDomain()+"/batch/get?params="+i,dataType:"jsonp",jsonp:"callback",jsonpCallback:"jQueryJSONP_batch_get",timeout:1e4,error:function(e,o){n.debug("load detail error, status is:"+o),n.debug("error is :"),n.debug(e),s.baseInfo.price=s.baseInfo.showPrice=0,t&&"function"==typeof t&&t()},complete:function(){n.debug("load detail completed"),o&&"function"==typeof o&&o()},success:function(t){n.debug("load detail success, data is:"),n.debug(t);var o=t.data&&t.data[0]||{},a=o.result&&o.result[code]||{},i=t.data&&t.data[1]||{},r=a.price||{},c=a.detail||{};"200"==t.status&&"0"==o.status&&(c&&(c.mallType&&(s.baseInfo.mallType=c.mallType,s.baseInfo.shopid=c.mallType,s.baseInfo.isService=c.isService,s.baseInfo.shopid==n.mallTypeMapping.SMBShop.code&&(s.baseInfo.gmsl=999)),s.baseInfo.basePrice=c.basePrice||0,s.baseInfo.isNeedSN=c.isNeedSN||0,s.baseInfo.isPersonalPositions=c.personalPositions,s.baseInfo.isPhysical=c.isPhysical||0,s.baseInfo.buOwner=c.buOwner||0,s.baseInfo.isPcSales=c.isPcSales||0,s.baseInfo.isWapSales=c.isWapSales||0,s.baseInfo.isAppSales=c.isAppSales||0,s.baseInfo.isWeiXinSales=c.isWeiXinSales||0,s.baseInfo.isIndependentSale=c.isIndependentSale||0,s.baseInfo.name=c.name||"",s.baseInfo.isShowPrice=c.isShowPrice||0,s.baseInfo.salesType=c.salesType||0,s.baseInfo.pcPromotion=c.pcPromotion||null,s.baseInfo.materialNumber=c.materialNumber||"",s.baseInfo.productId=c.productId||"",s.baseInfo.faId=c.faId||"",s.baseInfo.faCode=c.faCode||"",s.baseInfo.faName=c.faName||"",s.baseInfo.thumbnailsURL=c.thumbnail||"",s.baseInfo.brief=c.brief||"",s.baseInfo.productGroupNo=c.productGroupCode||"",s.baseInfo.gmsl=c.maxPurchase||5,s.baseInfo.purchase=a.purchase||0,s.baseInfo.isHasService=c.isHasService||0,s.baseInfo.categoryCode=c.categoryCode,s.baseInfo.isHasSpec=c.isHasSpec||0,s.baseInfo.isHasPersonal=c.isHasPersonal||0,s.baseInfo.logistics=c.logistics||"",c.thumbnailsURL&&(s.baseInfo.thumbnailsURL=location.protocol+c.thumbnailsURL),s.baseInfo.extensionTerminal=c.extensionTerminal||"",s.baseInfo.extensionContent=c.extensionContent||""),1==i.success&&(s.baseInfo.pcPromotion=i.t||null),s.nowNumber=t.timestamp,a.activity&&a.activity.activityType?(s.activity=a.activity,s.baseInfo.activityType=a.activity.activityType):(s.activity=null,s.baseInfo.activityType=0),1==s.terminal&&r.P_C&&r.P_C.C_1?(s.baseInfo.price=s.baseInfo.showPrice=r.P_C.C_1.P_0&&r.P_C.C_1.P_0.DV&&r.P_C.C_1.P_0.DV.V||"",s.baseInfo.appPrice=r.P_C.C_3.P_0&&r.P_C.C_3.P_0.DV&&r.P_C.C_3.P_0.DV.V||""):s.baseInfo.price="",s.baseInfo.marketable=c.marketable||0,"3"==s.baseInfo.isService&&(s.baseInfo.gmsl=1),"1"!=shopId&&"3"!=shopId||"1"!=s.baseInfo.isService&&"2"!=s.baseInfo.isService||"0"!=s.baseInfo.isPhysical||(s.baseInfo.gmsl=1),"90"==s.baseInfo.buOwner&&(s.baseInfo.gmsl=1),s.private_process_activity()),e&&"function"==typeof e&&e(t)}})},loadProductInfo:function(e,t,o){var s=this;$.ajax({type:"GET",url:"/cache/detail?code="+code+"&ss="+(new Date).getMilliseconds(),dataType:"json",error:function(e,o){n.debug("load detail error, status is:"+o),n.debug("error is :"),n.debug(e),s.baseInfo.price=s.baseInfo.showPrice=0,t&&"function"==typeof t&&t()},complete:function(){n.debug("load detail completed"),o&&"function"==typeof o&&o()},success:function(t){n.debug("load detail success, data is:"),n.debug(t);var o=t.data&&t.data[0]&&t.data[0].detail;"200"==t.status&&(o&&(o.mallType&&(s.baseInfo.mallType=o.mallType,s.baseInfo.shopid=o.mallType,s.baseInfo.isService=o.isService,s.baseInfo.shopid==n.mallTypeMapping.SMBShop.code&&(s.baseInfo.gmsl=999)),s.baseInfo.isNeedSN=o.isNeedSN||0,s.baseInfo.isPersonalPositions=o.personalPositions,s.baseInfo.isPhysical=o.isPhysical||0,s.baseInfo.buOwner=o.buOwner||0,s.baseInfo.isPcSales=o.isPcSales||0,s.baseInfo.isWapSales=o.isWapSales||0,s.baseInfo.isAppSales=o.isAppSales||0,s.baseInfo.isWeiXinSales=o.isWeiXinSales||0,s.baseInfo.isIndependentSale=o.isIndependentSale||0,s.baseInfo.name=o.name||"",s.baseInfo.isShowPrice=o.isShowPrice||0,s.baseInfo.salesType=o.salesType||0,s.baseInfo.pcPromotion=o.pcPromotion||null,s.baseInfo.materialNumber=o.materialNumber||"",s.baseInfo.productId=o.productId||"",s.baseInfo.faId=o.faId||"",s.baseInfo.faCode=o.faCode||"",s.baseInfo.faName=o.faName||"",s.baseInfo.thumbnailsURL="",s.baseInfo.productGroupNo=o.productGroupNo||"",s.baseInfo.gmsl=o.maxPurchase||5,o.thumbnailsURL&&(s.baseInfo.thumbnailsURL=location.protocol+o.thumbnailsURL),s.baseInfo.extensionTerminal=o.extensionTerminal||"",s.baseInfo.extensionContent=o.extensionContent||""),s.curDatetime=t.curDatetime,s.nowNumber=new Date(s.curDatetime.replace(/-/g,"/"))-0,t.data[0].activity&&t.data[0].activity.activityType?(s.activity=t.data[0].activity,s.baseInfo.activityType=t.data[0].activity.activityType):(s.activity=null,s.baseInfo.activityType=0),1==s.terminal&&t.data[0].pc?s.baseInfo.price=s.baseInfo.showPrice=t.data[0].pc:2==s.terminal&&t.data[0].wap?s.baseInfo.price=s.baseInfo.showPrice=t.data[0].wap:3==s.terminal&&t.data[0].app?s.baseInfo.price=s.baseInfo.showPrice=t.data[0].app:4==s.terminal&&t.data[0].weixin?s.baseInfo.price=s.baseInfo.showPrice=t.data[0].weixin:s.baseInfo.price=0,s.baseInfo.marketable=t.data[0].marketable||0,"3"==s.baseInfo.isService&&(s.baseInfo.gmsl=1),"1"!=shopId&&"3"!=shopId||"1"!=s.baseInfo.isService&&"2"!=s.baseInfo.isService||"0"!=s.baseInfo.isPhysical||(s.baseInfo.gmsl=1),"90"==s.baseInfo.buOwner&&(s.baseInfo.gmsl=1),s.private_process_activity()),e&&"function"==typeof e&&e(t)}})},loadStock:function(e,t,o){var s=this,a=s.nowNumber,i="";i=s.baseInfo.activityType>0&&a<s.activity.buyEndTime?"[{activityType:"+s.baseInfo.activityType+", productCode:"+code+"}]":"[{activityType:0, productCode:"+code+"}]","98"==s.baseInfo.salesType?s.loadO2OCityListAndStock(e,t,o):$.ajax({type:"POST",url:n.getItemDomain()+"/stock/getStockInfo.jhtm?ss="+(new Date).getMilliseconds(),data:{proInfos:i},dataType:"jsonp",jsonp:"callback",jsonpCallback:"jQueryJSONP_stock_getStockInfo",timeout:5e3,complete:function(){n.debug("load stock completed"),o&&"function"==typeof o&&o()},error:function(e,o){n.debug("load stock error, status is:"+o),n.debug("error is :"),n.debug(e),t&&t(e)},success:function(t){n.debug("load stock success, stock data is:"),n.debug(t);var o=t&&t[0];o&&(s.baseInfo.stock=parseInt(o.salesNumber||0),s.baseInfo.waterLevelDesc=o.waterLevelDesc),e&&(t.detailStockType=0,e(t))}})},loadO2OCityListAndStock:function(e,t,o){var s=this,a=function(e){var t=e.coverageInventories,o=[],a=!1,i=!1,n=!1,r="normal";try{for(var c=0;c<t.length;c++){a=!1;var l=t[c];r=l.inventory>0?"normal":"gray",l.className=r;for(var u=0;u<o.length;u++)if(l.provinceCode==o[u].provinceCode){a=!0;for(var d=o[u].cities,p=0;p<d.length;p++)if(i=!1,l.cityCode==d[p].cityCode){i=!0;for(var f=d[p].areas,h=0;h<f.length;h++)if(n=!1,l.areaCode==f[h].areaCode){n=!0,f[h].countries.push({countryCode:l.countryCode,countryName:l.countryName});break}if(!n){var b={countryCode:l.countryCode,countryName:l.countryName};f.push({area:l.area,areaCode:l.areaCode,city:l.city,cityCode:l.cityCode,className:l.className,countries:[b]})}break}if(!i){var m={countryCode:l.countryCode,countryName:l.countryName},g={city:l.city,cityCode:l.cityCode,areas:[{area:l.area,areaCode:l.areaCode,city:l.city,cityCode:l.cityCode,className:l.className,countries:[m]}]};o[u].cities.push(g)}}if(!a){var y={countryCode:l.countryCode,countryName:l.countryName},I={city:l.city,cityCode:l.cityCode,areas:[{area:l.area,areaCode:l.areaCode,city:l.city,cityCode:l.cityCode,className:l.className,countries:[y]}]};o.push({provinceCode:l.provinceCode,province:l.province,cities:[I]})}}s.baseInfo.stock=e.totalNum}catch(e){}return o},i=function(e){var t='[{"productCode":'+code+',"activityType":'+$p.baseInfo.activityType+"}]";return $.ajax({type:"POST",url:n.getItemDomain()+"/stock/getInventory.jhtm",data:{proInfos:t},dataType:"jsonp",jsonp:"callback",jsonpCallback:"jQueryJSONP_stock_getInventory",timeout:5e3})};i().done(function(t){n.debug("load thinko2o stock success, data is :"),n.debug(t),t&&t[0]&&"success"==t[0].message&&t[0].coverageInventories&&t[0].coverageInventories.length>0&&(s.baseInfo.thinko2oCities=a(t[0])),e&&(t.detailStockType=1,e(t))}).fail(function(e,o){n.debug("load thinko2o stock error, status is :"+o),n.debug("error info is :"),n.debug(e),t&&t(e,o)}).always(function(){n.debug("load thinko2o stock completed"),o()})},loadPromotionInfo:function(e,t,o){var s=this;$.ajax({type:"GET",data:{code:code,salesPlat:s.terminal},url:n.getItemDomain()+"/api/promotions?"+(new Date).getMilliseconds(),dataType:"jsonp",jsonp:"callback",jsonpCallback:"jQueryJSONP_promotions",timeout:5e3,complete:function(){n.debug("load promotioninfo completed"),o&&"function"==typeof o&&o()},error:function(e,o){n.debug("load promotioninfo error, status is :"+o),n.debug("error info is :"),n.debug(e),s.promotion={},t&&"function"==typeof t&&t()},success:function(t){if(n.debug("load promotioninfo success, data is :"),n.debug(t),t&&"200"==t.status&&t.data){var o=t.data;$.extend(s.promotion,o)}e&&"function"==typeof e&&e(t)}})},jsonpIsTuangouUser:function(e,t){$.ajax({type:"GET",url:__detailConfig.getApiPath("gwc")+"tuanstatus.jhtml?ss="+(new Date).getMilliseconds(),data:{gcode:code,activityId:this.baseInfo.activityType},dataType:"jsonp",jsonp:"callbackparam",success:e,error:t||function(e){n.debug("the ajax -> jsonpIsTuangouUser is fail"+e.responseText+"--"+e.statusText)}})},jsonpIsBookUser:function(e,t){$.ajax({type:"GET",url:__detailConfig.getApiPath("gwc")+"bookStatus.jhtml",data:{plat:this.terminal,activityId:this.activity.activityId,gcode:code},dataType:"jsonp",jsonp:"callbackparam",success:e,error:function(){n.debug("获取预约资格失败！"),t&&"function"==typeof t&&t()}})},jsonpShangouYuyue:function(e,t){$.ajax({type:"GET",url:__detailConfig.getApiPath("gwc")+"addReservation.jhtml",data:{plat:$p.terminal,gcode:code},dataType:"jsonp",jsonp:"callbackparam",success:e,error:function(){n.debug("发送预约信息失败！"),t&&"function"==typeof t&&t()}})},jsonpShangouQueue:function(e,t,o){$.ajax({type:"GET",url:__detailConfig.getApiPath("sg")+"getToken.jhtm?ss="+(new Date).getMilliseconds(),data:e,dataType:"jsonp",jsonp:"callback",success:t,error:function(){n.debug("申请Token失败！"),o&&"function"==typeof o&&o()}})},jsonpShangouGwc:function(e,t,o){$.ajax({type:"GET",url:__detailConfig.getApiPath("sggwc")+"api/sec/seckill_qiang.jhtm",data:e,dataType:"jsonp",jsonp:"callback",success:t,error:function(){n.debug("闪购排队加入购物车失败！"),o&&"function"==typeof o&&o()}})},jsonpAddItemToCart:function(e,t,o){$.ajax({type:"GET",url:__detailConfig.getApiPath("gwc")+"additemtocart.jhtml?ss="+(new Date).getMilliseconds(),data:e,dataType:"jsonp",jsonp:"callbackparam",success:t,error:o||function(){n.debug("additemtocart the ajax is fail")},timeout:4e3})},jsonpNoticeSendSms:function(e,t,o){$.ajax({type:"GET",url:n.getItemDomain()+"/stock/sendsms.jhtm",data:e,dataType:"jsonp",jsonp:"jsonpcallback",jsonpCallback:"jQueryJSONP_stock_sendsms",timeout:5e3,success:t,error:o||function(){n.debug("到货通知-> 发送短信失败"),layer.msg("系统繁忙，请稍后再试")}})},jsonpNoticeSave:function(e,t,o){$.ajax({type:"POST",url:e.url||n.getItemDomain()+"/stock/subscribe.jhtm",data:e,dataType:"jsonp",jsonp:"jsonpcallback",jsonpCallback:"jQueryJSONP_stock_subscribe",timeout:5e3,success:t,error:o})},loadServiceInfo:function(e,t,o){$.ajax({url:e.url||n.getItemDomain()+"/cache/servicelist",data:{code:code,terminal:this.terminal},dataType:"jsonp",jsonp:"jsonpCallback",jsonpCallback:"jQueryJSONP_cache_servicelist",timeout:5e3,success:t,error:o||function(){n.debug("请求服务信息失败！")}})},loadHostList:function(e,t,o){$.ajax({type:"GET",url:e.url||n.getItemDomain()+"/api/products/gethotlist.jhtm?ss="+(new Date).getMilliseconds(),data:{w:205,h:205,salesPlat:this.terminal},dataType:"json",success:t,error:o||function(){window.PDUtil.warn("hotlist ajax error")}})},loadMyFavorite:function(e,t,o){$.ajax({type:"GET",url:n.getItemDomain()+"/api/myfavorites/"+e.url+(new Date).getMilliseconds(),data:{gcode:code,plat:this.terminal},dataType:"jsonp",jsonp:"callback",timeout:5e3,success:t,error:o})},loadPresellInfo:function(e,t,o){var s={shopId:$p.baseInfo.mallType,gcode:code,terminal:$p.terminal};e=$.extend(s,e||{}),$.ajax({type:"GET",url:__detailConfig.getApiPath("presell"),data:e,dataType:"jsonp",jsonp:"callbackparam",success:t,error:o||function(){alert("获取预售信息失败, 请稍后再试")}})},jsonpSaveBookShangouTel:function(e,t,o){$.ajax({type:"GET",url:__detailConfig.getApiPath("gwc")+"updateBookPhone.jhtml?ss="+(new Date).getMilliseconds()+"&plat="+this.terminal,data:e,dataType:"jsonp",jsonp:"callbackparam",success:t,error:function(){n.debug("保存预约闪购手机号时出现错误！"),o&&"function"==typeof o&&o()}})},jsonpEvaluateList:function(e,t,o,s,a,i,n,r){var o=o||window.code||"",c=t||1,l=s||0,u=a||"",d=e||window.code||"",i=i||2;$.ajax({url:__detailConfig.getApiPath("comment")+"/comment/frontV2/commentDetail",dataType:"jsonp",jsonp:"jsonpcallback",timeout:5e3,data:{gcodes:d,currPage:c,productId:o,level:l,lables:u,only:i},success:n,error:r})},jsonpEvaluateRate:function(e,t,o){$.ajax({url:__detailConfig.getApiPath("comment")+"/comment/frontV2/favorableRate",dataType:"jsonp",jsonp:"jsonpcallback",jsonpCallback:"evaluateNumber",timeout:5e3,data:{gcode:e||window.code||""},success:t,error:o})},jsonpAddJF:function(e,t){$.ajax({url:__detailConfig.getApiPath("addjf"),dataType:"jsonp",jsonp:"jsonpcallback",timeout:2e3,data:{},success:e,error:t})},ajaxCheckSNCode:function(e,t,o){var s=this;$.ajax({type:"GET",url:n.getItemDomain()+"/api/products/checksn",data:{sn:e,num:s.baseInfo.materialNumber},dataType:"jsonp",jsonp:"callback",timeout:15e3,success:function(e){t(e)},error:function(){o&&o()}})},jsonpGetVirtual:function(e,t,o){var s=this,a=window.code,i=$p.baseInfo.virtualAreaCode;s.baseInfo.virtualPrice=0,$.ajax({url:__detailConfig.getApiPath("openUrl")+"/goods/price/get",dataType:"jsonp",jsonp:"jsonpCallback",jsonpCallback:"jsonpCallback",data:{code:a,aid:i},success:function(e){if(0==e.status){var t=e.result&&e.result.V_C;if("{}"===JSON.stringify(t))s.baseInfo.isIntegral=0;else{var o=t.C_1||[];"[]"===JSON.stringify(o)?s.baseInfo.isIntegral=0:("V_0"==s.baseInfo.virtualAreaCode?s.baseInfo.virtualPrice=parseFloat(o.V_0&&o.V_0.DV&&o.V_0.DV.V)||0:"V_1"==s.baseInfo.virtualAreaCode?s.baseInfo.virtualPrice=parseFloat(o.V_1&&o.V_1.DV&&o.V_1.DV.V)||0:s.baseInfo.virtualPrice=0,s.baseInfo.showPrice=s.baseInfo.price=parseFloat(o.P_0&&o.P_0.DV&&o.P_0.DV.V)||0)}}},complete:function(){n.debug("load vitualprice completed"),o&&"function"==typeof o&&o()},error:function(){n.log("load vtprice error"),t&&t()}})},jsonpgetIntegral:function(e,t,o){var s=window.passport.ticket,a=e&&e.type||"";$.ajax({url:__detailConfig.getApiPath("jfUrl")+"/dubboScore/searchTotal.jhtml",dataType:"jsonp",jsonp:"callback",jsonpCallback:"flightHandlers",timeout:4e3,data:{sts:s,type:a},success:t,error:function(){n.log("get jf error"),alert("系统繁忙，请稍后重试！"),o&&"function"==typeof o&&o()}})},jsonpGuige:function(e,t){$.ajax({url:__detailConfig.getApiPath("openUrl")+"/goods/category/get",type:"get",dataType:"jsonp",jsonp:"jsonpCallback",jsonpCallback:"jsonpCallback",data:{code:window.code,version:"1.0"},success:e,error:t})},jsonpCoupon:function(e,t){},createSwitcher:function(){$("#detail_left").append('<span id="show3DBtn" class="animated bounceIn" style="display: none;"></span><div id="videoTo3D" style="display: none;"><i class="video_3D_switch">3D</i><i class="video_3D_switch">视频</i></div><div id="single_3D" class="single_switch" style="display: none;">3D</div><div id="single_video" class="single_switch on" style="display: none;"><img src="../series/product/xiaoxin/images/video-icon.png"></div>');
},debug:!0};try{var r=n.queryString("__debug__");r&&(n.isDebug=!0)}catch(e){console.log("trigger error when debug")}1==n.isRunInNode()&&module&&module.exports?module.exports={PDUtil:n,PDBase:e}:(window.PDUtil=n,window.PDBase=e)}();
//# sourceMappingURL=../debugmaps/pdbase.js.map
