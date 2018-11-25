import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataService } from '../data.service';

@Component({
	selector: 'app-master',
	templateUrl: './master.component.html',
	styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
	component:string;

	incidents = {
		incident_count: 0,
		incident_count_change: 0,
		user_count: 0,
		user_count_change: 0,
		latest: [],
		location: [],
		subcategories: []
	};

	maplocations = [];
	subcategories = [];

	weekChart = {
		'current': [],
		'previous': [],
		'current_total': 0,
		'previous_total': 0,
	};

	yearChart = {
		'current': [],
		'previous': [],
		'current_total': 0,
		'previous_total': 0,
	};

	constructor(public route: ActivatedRoute, private data: DataService) {}

	ngOnInit() {
		this.route.url.subscribe(params => {
			// Incident
			this.incidents = {
				incident_count: 0,
				incident_count_change: 0,
				user_count: 0,
				user_count_change: 0,
				latest: [],
				location: [],
				subcategories: []
			};

			this.weekChart.current_total = 0;
			this.weekChart.previous_total = 0;
			this.weekChart.current.fill(0, 0, 7);
			this.weekChart.previous.fill(0, 0, 7);

			this.yearChart.current_total = 0;
			this.yearChart.previous_total = 0;
			this.yearChart.current.fill(0, 0, 12);
			this.yearChart.previous.fill(0, 0, 12);

			this.maplocations = [];
			this.subcategories = [];

			let incidenType = 'category';

			let type = params[0].path.replace('-', ' ').trim();
			this.component = params[1].path.replace('-', ' ').trim();

			let filters = {};

			switch (type) {
				case 'subcategory':
					incidenType = 'subcategory';
					filters['category'] = localStorage.getItem('category');
					break;
				case 'state':
					incidenType = 'state';
					break;
			}

			// Total incidents
			this.data.getIncidents({
				[incidenType]: this.component,
				...filters
			}).subscribe(
				data => {
					this.incidents.incident_count = 'total' in data ? data['total'] : 0;
				}
			);

			// Latest Incident
			this.data.getIncidents({
				[incidenType]: this.component,
				...filters,
				'sort': 'date_added',
				'order': 'desc',
				'page': 1,
				'limit': 5
			}).subscribe(
				data => {
					this.incidents.latest = data !== null ? data['data'].slice(0, 5) : {};
				}
			);

			// Total users
			this.data.getIncidents({
				[incidenType]: this.component,
				...filters,
				'distinct': 'user'
			}).subscribe(
				data => {
					this.incidents.user_count = 'total' in data ? data['total'] : 0;
				}
			);

			// Total incidents by state
			this.data.getStates().subscribe(
				data => {
					if (data !== null) {
						for (let state of data['data']) {
							this.maplocations[state.name] = 0;
						}

						this.data.getIncidents({
							[incidenType]: this.component,
							...filters,
							'groupby': 'state',
						}).subscribe(
							data => {
								this.incidents.location = 'data' in data ? data['data'] : [];

								for (let location of this.incidents.location) {
									this.maplocations[location['state']] = location['total']
								}

								window['maplocations'] = this.maplocations;
							}
						);
					}
				}
			);

			// Total incidents by subcategory
			this.data.getIncidents({
				[incidenType]: this.component,
				...filters,
				'groupby': incidenType == 'subcategory' ? 'category' : 'subcategory',
			}).subscribe(
				data => {
					this.incidents.subcategories = 'data' in data ? data['data'] : [];

					for (let val of this.incidents.subcategories) {
						this.subcategories.push({subcategory: val[(incidenType == 'subcategory' ? 'category' : 'subcategory')], total: val['total']});
					}

					window['subcategories'] = this.subcategories;
				}
			);

			// chart data
			// Week Chart
			let d = new Date();

			this.data.getIncidents({
				[incidenType]: this.component,
				...filters,
				'date_range': `${d.getTime()}-${new Date(d.getFullYear(), d.getMonth(), (d.getDate() - d.getDay() - 7)).getTime()}`,
				'groupby': 'day',
			}).subscribe(
				data => {
					if (data !== null) {
						for (let v of data['data']) {
							let explode = v.day.createdOn.split('-');

							if (new Date(v.day.createdOn).getTime() >= new Date(d.getFullYear(), d.getMonth(), (d.getDate() - d.getDay())).getTime()) {
								this.weekChart.current[new Date(v.day.createdOn).getDay()] = v.total;
								this.weekChart.current_total += v.total;
							} else {
								this.weekChart.previous[new Date(v.day.createdOn).getDay()] = v.total;
								this.weekChart.previous_total += v.total;
							}
						}

						window['weekChart'] = this.weekChart;
					}
				}
			);

			// Year Chart
			this.data.getIncidents({
				[incidenType]: this.component,
				...filters,
				'date_range': `${d.getTime()}-${new Date(d.getFullYear() - 1, 0, 1).getTime()}`,
				'groupby': 'month',
			}).subscribe(
				data => {
					let totalCurrentMonthIncidents = 0;
					let totalPreviousMonthIncidents = 0;

					if (data !== null) {
						for (let v of data['data']) {
							let explode = v.month.createdMonthYear.split('-');

							if (explode[0] == d.getFullYear() && explode[1] == (d.getMonth() + 1)) {
								totalCurrentMonthIncidents = v.total;
							}

							if (explode[0] == d.getFullYear() && explode[1] == d.getMonth()) {
								totalPreviousMonthIncidents = v.total;
							}

							if (explode[0] == d.getFullYear()) {
								this.yearChart.current[explode[1] - 1] = v.total;
								this.yearChart.current_total += v.total;
							} else if (explode[0] == (d.getFullYear() - 1)) {
								this.yearChart.previous[explode[1] - 1] = v.total;
								this.yearChart.previous_total += v.total;
							}
						}

						this.incidents.incident_count_change = parseInt(((totalCurrentMonthIncidents - totalPreviousMonthIncidents) / (totalPreviousMonthIncidents == 0 ? 1 : totalPreviousMonthIncidents) * 100).toFixed(2));

						window['yearChart'] = this.yearChart;
					}
				}
			);
		});
	}
}
