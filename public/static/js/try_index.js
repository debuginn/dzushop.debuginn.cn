// JavaScript Document
$(function(){
	$.ajax({
		"url":mainUrl + "/roamingapi/getServerTime",
		"success":function(db){
			//console.log(db);
			var serverTime = db || (new Date()).Format("yyyy-M-d h:m:s");
			var tryIndex = new Mytryout();
			tryIndex.makeBanner(serverTime);
			tryIndex.makeList(serverTime);
		}
	})
})
