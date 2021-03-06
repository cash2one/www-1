function cityListOne(city){
	//定义省份数组;
 	cityArray = new Array(); 
	cityArray[0] = new Array("鞍山","安顺","阿坝","阿拉善","阿里","安康","阿克苏","安庆","阿勒泰","安阳","澳门"); 
 	cityArray[1] = new Array(
 	"北京","包头","保定","巴中","蚌埠","白银","白城","白山","北海","巴彦淖尔","宝鸡","百色","本溪","保山","毕节","博尔塔拉","滨州","亳州","巴州"); 
 	cityArray[2] = new Array("成都","重庆","常州","长沙","长春","赤峰","楚雄","长治","巢湖","崇左","潮州","昌吉","沧州","郴州","常德","滁州","朝阳","昌都","池州","承德"); 
	cityArray[3] = new Array("东莞","大连","东营","大庆","大同","大理","德阳","迪庆","达州","德州","丹东","大兴安岭","德宏","定西");
  	cityArray[4] = new Array("恩施","鄂州","鄂尔多斯");
  	cityArray[5] = new Array("福州","佛山","抚顺","阜阳","抚州","防城港","阜新");
  	cityArray[6] = new Array("广州","贵阳","桂林","赣州","广元","果洛","固原","甘南","甘孜","广安","贵港"); 
   	cityArray[7] = new Array("杭州","哈尔滨","合肥","邯郸","惠州","海口","呼和浩特","衡阳","湖州","淮北","鹤岗","海北","海东","黄南","菏泽","海南州","黑河","和田","哈密","淮安","淮南","黄山","海西","贺州","怀化","河池","呼伦贝尔","衡水","河源","红河","汉中","黄冈","黄石","鹤壁","葫芦岛"); 
   	cityArray[8] = new Array("济南","济宁","嘉兴","金华","焦作","荆州","吉林","锦州","江门","景德镇","吉安","佳木斯","酒泉","金昌","鸡西","济源","晋城","揭阳","晋中","荆门","九江");
   	cityArray[9] = new Array("昆明","昆山","喀什","克拉玛依","开封","克州");
    cityArray[10] = new Array("兰州","临沂","连云港","聊城","临汾","柳州","洛阳","廊坊","龙岩","六盘水","凉山","六安","丽江","临沧","陇南","拉萨","辽源","辽阳","莱芜","漯河","吕梁","丽水","临夏","林芝","娄底","来宾","泸州","乐山");
    cityArray[11] = new Array("马鞍山","绵阳","茂名","牡丹江","梅州","眉山"); 
    cityArray[12] = new Array("南京","宁波","南通","南宁","南昌","南充","宁德","内江","怒江","南平","南阳","那曲"); 
    cityArray[13] = new Array("萍乡","平顶山","莆田","濮阳","攀枝花","平凉","普洱","盘锦"); 
    cityArray[14] = new Array("青岛","泉州","秦皇岛","齐齐哈尔","庆阳","衢州","黔西南","钦州","黔南","曲靖","黔东南","七台河","清远");
    cityArray[15] = new Array("日照","日喀则");
    cityArray[16] = new Array("上海","深圳","沈阳","苏州","石家庄","绍兴","顺德","三亚","韶关","绥化","松原","上饶","十堰","三门峡","山南","邵阳","遂宁","商丘","朔州","随州","汕尾","四平","三峡","宿迁","三明","石嘴山","双鸭山","汕头","宿州","商洛");
    cityArray[17] = new Array("天津","太原","泰安","台州","唐山","泰州","塔城","铜陵","铜川","台北","铜仁","吐鲁番","天水","通辽","铁岭","通化"); 
    cityArray[18] = new Array("武汉","无锡","温州","芜湖","威海","潍坊","乌鲁木齐","梧州","吴忠","武威","渭南","乌兰察布","文山","乌海"); 
    cityArray[19] = new Array("西安","厦门","徐州","襄阳","西宁","孝感","西双版纳","新余","湘潭","锡林","郭勒","兴安","邢台","新乡","湘西","忻州","咸阳","宣城","香港","信阳","咸宁","许昌");
    cityArray[20] = new Array("扬州","烟台","盐城","运城","义乌","岳阳","宜昌","玉林","银川","鹰潭","雅安","伊犁","玉树","宜春","营口","永州","宜宾","益阳","玉溪","阳泉","延安","榆林","云浮","延边","阳江","伊春"); 
    cityArray[21] = new Array("郑州","镇江","中山","淄博","珠海","遵义","株洲","自贡","舟山","湛江","肇庆","漳州","张掖","昭通","张家界","周口","驻马店","张家口","资阳","中卫","枣庄"); 
     return cityArray[city];
  }