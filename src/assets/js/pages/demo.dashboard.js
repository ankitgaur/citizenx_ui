!function(c) {
	"use strict";
	var a = function() {
		this.$body=c("body"),
		this.charts=[]
	};

	a.prototype.respChart = function(e, r, t, o) {
		var n=Chart.controllers.line.prototype.draw;
		Chart.controllers.line.prototype.draw=function() {
			n.apply(this, arguments);
			var a=this.chart.chart.ctx,
			e=a.stroke;
			a.stroke = function() {
				a.save(),
				a.shadowColor="rgba(0,0,0,0.01)",
				a.shadowBlur=20,
				a.shadowOffsetX=0,
				a.shadowOffsetY=5,
				e.apply(this, arguments),
				a.restore()
			}
		};
		var s = Chart.controllers.doughnut.prototype.draw;
		Chart.controllers.doughnut=Chart.controllers.doughnut.extend({
			draw:function() {
				s.apply(this, arguments);
				var a=this.chart.chart.ctx, e=a.fill;
				a.fill=function() {
					a.save(), a.shadowColor="rgba(0,0,0,0.03)", a.shadowBlur=4, a.shadowOffsetX=0, a.shadowOffsetY=3, e.apply(this, arguments), a.restore()
				}
			}
		});
		var i=Chart.controllers.bar.prototype.draw;
		Chart.controllers.bar=Chart.controllers.bar.extend({
			draw:function() {
				i.apply(this, arguments);
				var a=this.chart.chart.ctx, e=a.fill;
				a.fill=function() {
					a.save(), a.shadowColor="rgba(0,0,0,0.01)", a.shadowBlur=20, a.shadowOffsetX=4, a.shadowOffsetY=5, e.apply(this, arguments), a.restore()
				}
			}
		});
		var l=e.get(0).getContext("2d"),
		d=c(e).parent();
		return function() {
			var a;
			switch(e.attr("width", c(d).width()), r) {
				case"Line":a=new Chart(l, {
					type: "line", data: t, options: o
				}
				);
				break;
				case"Doughnut":a=new Chart(l, {
					type: "doughnut", data: t, options: o
				}
				);
				break;
				case"Pie":a=new Chart(l, {
					type: "pie", data: t, options: o
				}
				);
				break;
				case"Bar":a=new Chart(l, {
					type: "bar", data: t, options: o
				}
				);
				break;
				case"Radar":a=new Chart(l, {
					type: "radar", data: t, options: o
				}
				);
				break;
				case"PolarArea":a=new Chart(l, {
					data: t, type: "polarArea", options: o
				}
				)
			}
			return a
		}
		()
	},
	a.prototype.initWeekCharts = function() {
		if(0<c("#revenue-chart").length) {
			if (typeof weekChartData !== 'undefined') {
				return this.respChart(c("#revenue-chart"), "Line", {
					labels:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], datasets:[{
						label: "Previous Week",
						backgroundColor: "transparent",
						borderColor: "#727cf5",
						data: weekChartData['previous'],
					}, {
						label: "Current Week",
						fill: !0,
						backgroundColor: "transparent",
						borderColor: "#0acf97",
						data: weekChartData['current'],
					}]
				}
				, {
					maintainAspectRatio:!1, legend: {
						display: !1
					}
					, tooltips: {
						intersect: !1
					}
					, hover: {
						intersect: !0
					}
					, plugins: {
						filler: {
							propagate: !1
						}
					}
					, scales: {
						xAxes:[ {
							reverse:!0, gridLines: {
								color: "rgba(0,0,0,0.05)"
							}
						}
						], yAxes:[ {
							ticks: {
								stepSize: 20
							}
							, display:!0, borderDash:[5, 5], gridLines: {
								color: "rgba(0,0,0,0)", fontColor: "#fff"
							}
						}
						]
					}
				});
			}
		}
	},
	a.prototype.initYearCharts = function() {
		if(0<c("#high-performing-product").length) {
			if (typeof yearChartData !== 'undefined') {
				var e = document.getElementById("high-performing-product").getContext("2d").createLinearGradient(0, 500, 0, 150);

				e.addColorStop(0, "#fa5c7c"),
				e.addColorStop(1, "#727cf5");

				var r = {
					labels:[
						"Jan",
						"Feb",
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul",
						"Aug",
						"Sep",
						"Oct",
						"Nov",
						"Dec"
					],
					datasets:[{
						label: `${new Date().getFullYear()} Incidents`,
						backgroundColor: e,
						borderColor: e,
						hoverBackgroundColor: e,
						hoverBorderColor: e,
						data: yearChartData['current'],
					}, {
						label: `${new Date().getFullYear() - 1} Incidents`,
						backgroundColor: "#e3eaef",
						borderColor: "#e3eaef",
						hoverBackgroundColor: "#e3eaef",
						hoverBorderColor: "#e3eaef",
						data: yearChartData['previous'],
					}]
				};

				return this.respChart(c("#high-performing-product"), "Bar", r, {
					maintainAspectRatio:!1, legend: {
						display: !1
					}
					, scales: {
						yAxes:[ {
							gridLines: {
								display: !1
							}
							, stacked:!1, ticks: {
								stepSize: 20
							}
						}
						], xAxes:[ {
							barPercentage:.7, categoryPercentage:.5, stacked:!1, gridLines: {
								color: "rgba(0,0,0,0.01)"
							}
						}
						]
					}
				});
			}
		}
	},
	a.prototype.initSubCategoryCharts = function() {
		if(0<c("#average-sales").length) {
			var labels = [];
			var data = [];

			if (typeof subcategoriesData !== 'undefined') {
				for (let val of subcategoriesData.slice(0, 4)) {
					labels.push(val['subcategory']);
					data.push(val['total']);
				}
			}

			return this.respChart(c("#average-sales"), "Doughnut", {
				labels: labels,
				datasets:[ {
					data: data, backgroundColor: ["#727cf5", "#fa5c7c", "#0acf97", "#ebeff2"], borderColor: "transparent", borderWidth: "3"
				}]
			}
			, {
				maintainAspectRatio:!1, cutoutPercentage:60, legend: {
					display: !1
				}
			});
		}
	},
	a.prototype.initCharts = function() {
		var a = [];

		if(0<c("#revenue-chart").length) {
			if (typeof weekChartData !== 'undefined') {
				a.push(this.respChart(c("#revenue-chart"), "Line", {
					labels:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], datasets:[{
						label: "Previous Week",
						backgroundColor: "transparent",
						borderColor: "#727cf5",
						data: weekChartData['previous'],
					}, {
						label: "Current Week",
						fill: !0,
						backgroundColor: "transparent",
						borderColor: "#0acf97",
						data: weekChartData['current'],
					}]
				}
				, {
					maintainAspectRatio:!1, legend: {
						display: !1
					}
					, tooltips: {
						intersect: !1
					}
					, hover: {
						intersect: !0
					}
					, plugins: {
						filler: {
							propagate: !1
						}
					}
					, scales: {
						xAxes:[ {
							reverse:!0, gridLines: {
								color: "rgba(0,0,0,0.05)"
							}
						}
						], yAxes:[ {
							ticks: {
								stepSize: 20
							}
							, display:!0, borderDash:[5, 5], gridLines: {
								color: "rgba(0,0,0,0)", fontColor: "#fff"
							}
						}
						]
					}
				}
				))
			}
		}

		if(0<c("#high-performing-product").length) {
			if (typeof yearChartData !== 'undefined') {
				var e = document.getElementById("high-performing-product").getContext("2d").createLinearGradient(0, 500, 0, 150);

				e.addColorStop(0, "#fa5c7c"),
				e.addColorStop(1, "#727cf5");

				var r = {
					labels:[
						"Jan",
						"Feb",
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul",
						"Aug",
						"Sep",
						"Oct",
						"Nov",
						"Dec"
					],
					datasets:[{
						label: `${new Date().getFullYear()} Incidents`,
						backgroundColor: e,
						borderColor: e,
						hoverBackgroundColor: e,
						hoverBorderColor: e,
						data: yearChartData['current'], //[65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81]
					}, {
						label: `${new Date().getFullYear() - 1} Incidents`,
						backgroundColor: "#e3eaef",
						borderColor: "#e3eaef",
						hoverBackgroundColor: "#e3eaef",
						hoverBorderColor: "#e3eaef",
						data: yearChartData['previous'], //[89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59]
					}]
				};

				a.push(this.respChart(c("#high-performing-product"), "Bar", r, {
					maintainAspectRatio:!1, legend: {
						display: !1
					}
					, scales: {
						yAxes:[ {
							gridLines: {
								display: !1
							}
							, stacked:!1, ticks: {
								stepSize: 20
							}
						}
						], xAxes:[ {
							barPercentage:.7, categoryPercentage:.5, stacked:!1, gridLines: {
								color: "rgba(0,0,0,0.01)"
							}
						}
						]
					}
				}));
			}
		}
		if(0<c("#average-sales").length) {
			var labels = [];
			var data = [];

			if (typeof subcategoriesData !== 'undefined') {
				for (let val of subcategoriesData.slice(0, 4)) {
					labels.push(val['subcategory']);
					data.push(val['total']);
				}
			}

			a.push(this.respChart(c("#average-sales"), "Doughnut", {
				labels: labels,
				datasets:[ {
					data: data, backgroundColor: ["#727cf5", "#fa5c7c", "#0acf97", "#ebeff2"], borderColor: "transparent", borderWidth: "3"
				}]
			}
			, {
				maintainAspectRatio:!1, cutoutPercentage:60, legend: {
					display: !1
				}
			}
			))
		}

		return a
	},
	a.prototype.initGoogleChart=function() {
		google.charts.load("current", {
			packages: ["geochart"]
		}),
		google.charts.setOnLoadCallback(function() {
			if (typeof maplocations_data == 'undefined') {
				return;
			}

			let maplocationsArray = [];

			maplocationsArray.push(['State', 'Incidents']);

			for (let i in maplocations_data) {
				maplocationsArray.push([i, maplocations_data[i]]);
			}

			var a = google.visualization.arrayToDataTable(maplocationsArray);

			new google.visualization.GeoChart(document.getElementById("country-map")).draw(a, {
				region: "NG",
				resolution: "provinces",
				datalessRegionColor: "transparent",
				colorAxis: {colors: ['#d5d7ec', '#101a96']}
			})
		});

		/*this.initMaps();*/
	},
	a.prototype.destroyChart = function() {
		c.each(this.charts, function(a, e) {
			try {
				e.destroy()
			} catch(a) {}
		});
	},
	a.prototype.init=function() {
		var e = this;
		this.initGoogleChart();

		Chart.defaults.global.defaultFontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
		c("#dash-daterange").daterangepicker({
			singleDatePicker: !0
		}),
		e.charts = this.initCharts(),
		c(window).on("resize", function(a) {
			e.destroyChart(),
			e.charts = e.initCharts();
		})
	},
	c.Dashboard=new a,
	c.Dashboard.Constructor=a
}

(window.jQuery),
function(a) {
	"use strict";
	window.jQuery(window).on('load', function() {
		window.jQuery.Dashboard.init();
	});
}();

Object.defineProperty(window, 'maplocations', {
	set: function(v) {
		maplocations_data = v;

		window.jQuery.Dashboard.initGoogleChart()
	}
});

Object.defineProperty(window, 'subcategories', {
	set: function(v) {
		subcategoriesData = v;

		if (typeof window['subCategoryChartApi'] !== 'undefined') {
			window['subCategoryChartApi'].destroy();
		}

		window['subCategoryChartApi'] = window.jQuery.Dashboard.initSubCategoryCharts()
	}
});

Object.defineProperty(window, 'weekChart', {
	set: function(v) {
		weekChartData = v;

		if (typeof window['weekChartApi'] !== 'undefined') {
			window['weekChartApi'].destroy();
		}

		window['weekChartApi'] = window.jQuery.Dashboard.initWeekCharts()
	}
});

Object.defineProperty(window, 'yearChart', {
	set: function(v) {
		yearChartData = v;

		if (typeof window['yearChartApi'] !== 'undefined') {
			window['yearChartApi'].destroy();
		}

		window['yearChartApi'] = window.jQuery.Dashboard.initYearCharts()
	}
});
