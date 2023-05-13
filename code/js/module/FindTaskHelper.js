define(["esri/tasks/FindTask", "esri/tasks/FindParameters"],
    function (FindTask, FindParameters) {
        /*参数说明
        实现查询分页
        url：服务地址，
		returnGeometry：是否返回几何信息
		layerIds：查询的图层id数组
		searchFields：查询的字段
		searchText：查询的属性值
        */
        function FindTaskHelper(options) {//构造函数
            this.init(options);
        }

        FindTaskHelper.prototype = {
            init: function (options) {
                this.findTask = new FindTask(options.url);
                this.findParams = new FindParameters();
                this.findParams.returnGeometry = options.returnGeometry || true;
				this.findParams.layerIds = options.layerIds || ["*"];
                this.findParams.searchFields = options.searchFields;
				this.findParams.searchText = options.searchText;
				this.columns = options.columns;
                $('.panel-ps-body').empty().append("<table class='table text-nowrap'></table>");
            },
            action: function () {
                var that = this;
				$('.panel-ps-body').find("table").bootstrapTable({
					ajax: function (pms) {
						that.findTask.execute(that.findParams, function (res) {
							if (!res) {
								$('.panel-ps-body').empty().append("<h4>您指定的条件未筛选到数据！请重新选择条件</h4>");
								return false;
							}
							var table_data = [];
                            SHGIS.Markers.tmpMarkers = {};
							$.each(res, function (i, e) {
								SHGIS.Markers.tmpMarkers[i] = e.feature.geometry;
								//var tmpdata = { tmpid: i };
								var tmpdata = e.feature.attributes;
								tmpdata.tmpid = i;
								table_data.push(tmpdata);
							});
							pms.success({
								total: res.length,
								rows: table_data
							}); 
						}, function (err) { alert("查询失败"); });
					},
					striped: true,
					sidePagination: 'server',
					columns: that.columns,
					onClickRow: function (rowdata, element) {
						var gid = rowdata["tmpid"];
						if ($("#search-type").val() == "point") {
                            SHGIS.COMMON.PointAndMove(SHGIS.Markers.tmpMarkers[gid],rowdata["NAME"]);
						} else if($("#search-type").val() == "line") {
                            SHGIS.COMMON.LineAndMove(SHGIS.Markers.tmpMarkers[gid],rowdata["CODE"]);
						}
					},
					height: 300,
				});
				that.findParams.searchFields = null;
				that.findParams.searchText = null;
            } //action END
        };
        return FindTaskHelper;
    });