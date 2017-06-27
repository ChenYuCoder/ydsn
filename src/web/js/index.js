var map = new BMap.Map("map");// 百度地图API功能
var geolocation = new BMap.Geolocation();
var geolocationControl = new BMap.GeolocationControl({
	anchor: BMAP_ANCHOR_TOP_RIGHT
});

	
//var navigationControl = new BMap.NavigationControl({
//  // 靠左上角位置
//  anchor: BMAP_ANCHOR_TOP_LEFT,
//  // LARGE类型
//  type: BMAP_NAVIGATION_CONTROL_LARGE,
//  // 启用显示定位
//  enableGeolocation: true
//});

var markers = [];
var markerArr = [{ title: "天津BKS篮球运动中心", content: "营业时间：<br/>早6:00-晚22:00", point: "117.219415,39.165158", isOpen: 0, icon: { w: 21, h: 21, l: 0, t: 0, x: 6, lb: 5 } }
    , { title: "天大外场", content: "上课时间不可进<br/>门票10元", point: "117.183939,39.118684", isOpen: 0, icon: { w: 21, h: 21, l: 0, t: 0, x: 6, lb: 5 } }
    , { title: "天大内场", content: "只提供包场<br/>上课时间不可进", point: "117.181676,39.117858", isOpen: 0, icon: { w: 21, h: 21, l: 0, t: 0, x: 6, lb: 5 } }
    , { title: "天津医科大学室外场", content: "上课时间不可进", point: "117.191359,39.114359", isOpen: 0, icon: { w: 21, h: 21, l: 0, t: 0, x: 6, lb: 5 } }
    , { title: "中医药大学室外长", content: "水泥地", point: "117.171866,39.123723", isOpen: 0, icon: { w: 21, h: 21, l: 0, t: 0, x: 6, lb: 5 } }
    , { title: "未来广场", content: "一个小半场", point: "117.226694,39.14485", isOpen: 0, icon: { w: 21, h: 21, l: 0, t: 0, x: 6, lb: 5 } }
];

var courtData = [
    new court("天津BKS篮球运动中心","营业时间：<br/>早6:00-晚22:00","117.219415|39.165158","in"),
    new court("天大外场","营业时间：<br/>早6:00-晚22:00","117.183939|39.118684","in"),
    new court("天大内场","营业时间：<br/>早6:00-晚22:00","117.181676|39.117858","in"),
    new court("天津医科大学室外场","营业时间：<br/>早6:00-晚22:00","117.191359|39.114359","in"),
    new court("中医药大学室外场","营业时间：<br/>早6:00-晚22:00","117.171866|39.123723","in"),
    new court("未来广场","营业时间：<br/>早6:00-晚22:00","117.226694|39.14485","in"),
]


var points = [                          //创建7个点
    new BMap.Point(117.219415,39.165158),
    new BMap.Point(117.183939,39.118684),
    new BMap.Point(117.181676,39.117858),
    new BMap.Point(117.191359,39.114359),
    new BMap.Point(117.171866,39.123723),
    new BMap.Point(117.226694,39.14485)

];

map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
map.addControl(geolocationControl);
//map.addControl(navigationControl);// 添加定位控件


geolocationControl.addEventListener("locationError", function (e) {
    // 定位失败事件
    alert(e.message);
});
geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			
		}
		else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})
// 添加带有定位的导航控件








//创建InfoWindow
function createInfoWindow(i) {
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
    return iw;
}
//创建一个Icon
function createIcon(json) {
    var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w, json.h), { imageOffset: new BMap.Size(-json.l, -json.t), infoWindowOffset: new BMap.Size(json.lb + 5, 1), offset: new BMap.Size(json.x, json.h) })
    return icon;
}
function court(name,remarks,position,type){
    this.name = name;
    this.remarks = remarks;
    this.position = position;
    this.type = type;
}




function show() {
    for (var i = 0; i < markerArr.length; i++) {
        var json = markerArr[i];
        var p0 = json.point.split(",")[0];
        var p1 = json.point.split(",")[1];
        var point = new BMap.Point(p0, p1);
        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point);
        var iw = createInfoWindow(i);
        var label = new BMap.Label(json.title, { "offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20) });
        

        
        marker.setLabel(label);
        markers.push(marker);
        map.addOverlay(marker);// 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        label.setStyle({
            borderColor: "#808080",
            color: "#333",
            cursor: "pointer"
        });
        
        
//      map.setViewport(markerArr.point);

        
		//下面这个功能为什么括号里面
        (function () {
            var index = i;
            var _iw = createInfoWindow(i);
            var _marker = marker;
            _marker.addEventListener("click", function () {
                this.openInfoWindow(_iw);
            });
            _iw.addEventListener("open", function () {
                _marker.getLabel().hide();
            })
            _iw.addEventListener("close", function () {
                _marker.getLabel().show();
            })
            label.addEventListener("click", function () {
                _marker.openInfoWindow(_iw);
            })
            if (!!json.isOpen) {
                label.hide();
                _marker.openInfoWindow(_iw);
            }
        })()
    }
            var view = map.getViewport(eval(points));  
		map.setZoom(view.zoom);
}

function show2() {
	
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			
		}
		else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})
	
       for (var i = 0; i < markerArr.length; i++) {
        var json = markerArr[i];
        var p0 = json.point.split(",")[0];
        var p1 = json.point.split(",")[1];
        var point = new BMap.Point(p0, p1);
        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point);
        var iw = createInfoWindow(i);
        var label = new BMap.Label(json.title, { "offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20) });
        

        
        marker.setLabel(label);
        markers.push(marker);
        map.addOverlay(marker);// 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        label.setStyle({
            borderColor: "#808080",
            color: "#333",
            cursor: "pointer"
        });
        
        
//      map.setViewport(markerArr.point);

        
		//下面这个功能为什么括号里面
        (function () {
            var index = i;
            var _iw = createInfoWindow(i);
            var _marker = marker;
            _marker.addEventListener("click", function () {
                this.openInfoWindow(_iw);
            });
            _iw.addEventListener("open", function () {
                _marker.getLabel().hide();
            })
            _iw.addEventListener("close", function () {
                _marker.getLabel().show();
            })
            label.addEventListener("click", function () {
                _marker.openInfoWindow(_iw);
            })
            if (!!json.isOpen) {
                label.hide();
                _marker.openInfoWindow(_iw);
            }
        })()
    }
            var view = map.getViewport();  
		map.setZoom(view.zoom);
}


function hide() {
    for (var i = 0; i < markers.length; i++) {
        map.removeOverlay(markers[i]);
    }
    markers =[];
}

