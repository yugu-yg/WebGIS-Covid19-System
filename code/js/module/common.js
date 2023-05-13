//======================公共方法===========================
WP.COMMON = {};

//绘制点
WP.COMMON.PointAndMove = function (point,makername) {
    require(["esri/graphic", "esri/geometry/Point"], function (Graphic, Point) {
        var graphic = new Graphic(point, WP.PublicSymbol.picMarker.picPoint);
        if (WP.Markers.tmp) {
			if (toString.call(WP.Markers.tmp) == '[object Array]') {
				$.each(WP.Markers.tmp, function (i, e) {
					WP.map.graphics.remove(e);
				});
			} else {
				WP.map.graphics.remove(WP.Markers.tmp);
			}
		}
        WP.map.graphics.add(graphic);
        WP.Markers.tmp = graphic;
		var pt = new Point(point.x, point.y, 4490);
		WP.map.setLevel(19);
		WP.map.centerAt(pt);
		WP.map.infoWindow.hide();
		WP.map.infoWindow.setContent("<tr><td>" + makername + "</td><td>");
		WP.map.infoWindow.setTitle("信息");
		WP.map.infoWindow.resize(300, 400);
		WP.map.infoWindow.show(pt, WP.map.getInfoWindowAnchor(pt));
    });
};

//绘制线
WP.COMMON.LineAndMove = function (line,makername) {
	require(["esri/graphic", "esri/geometry/Point"], function (Graphic, Point) {
		var graphic = new Graphic(line, WP.PublicSymbol.Line);
		if (WP.Markers.tmp) {
			if (toString.call(WP.Markers.tmp) == '[object Array]') {
				$.each(WP.Markers.tmp, function (i, e) {
					WP.map.graphics.remove(e);
				});
			} else {
				WP.map.graphics.remove(WP.Markers.tmp);
			}
		}
		WP.map.graphics.add(graphic);
		var pt = new Point(line.paths[0][1], 4490);
		WP.map.setLevel(19);
		WP.map.centerAt(pt);
		WP.map.infoWindow.hide();
		WP.map.infoWindow.setContent("<tr><td>" + makername + "</td><td>");
		WP.map.infoWindow.setTitle("信息");
		WP.map.infoWindow.resize(300, 400);
		WP.map.infoWindow.show(pt, WP.map.getInfoWindowAnchor(pt));
	})
};
