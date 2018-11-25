import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Menu } from './menu'
import { DataService } from '../data.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
	i = 0;

	menus: Menu[];

	constructor(public route: Router, private data: DataService) {}

	ngOnInit() {
		this.route.events.subscribe(params => {
			if (params['shouldActivate']) {
				let explodes = params['url'].split('/');

				if (explodes[1] == 'category') {
					localStorage.setItem('category', explodes[2]);
				}

				this.menus = [];

				let categories: Menu = {
					id: ++this.i,
					name: 'Incidents',
					href: '',
					menu: [
						{
							id: ++this.i,
							name: 'Amenities',
							href: 'category/amenities',
							menu: []
						},
						{
							id: ++this.i,
							name: 'Airports',
							href: 'category/airports',
							menu: []
						},
						{
							id: ++this.i,
							name: 'Crime',
							href: 'category/crime',
							menu: []
						},
						{
							id: ++this.i,
							name: 'Fake Products',
							href: 'category/fake-products',
							menu: []
						},
						{
							id: ++this.i,
							name: 'Graft(BRIBE)',
							href: 'category/graft',
							menu: []
						},
						{
							id: ++this.i,
							name: 'Hospitals',
							href: 'category/hospitals',
							menu: []
						},
						{
							id: ++this.i,
							name: 'Roads',
							href: 'category/roads',
							menu: []
						},
						{
							id: ++this.i,
							name: 'School',
							href: 'category/school',
							menu: []
						},
					]
				};

				this.menus.push(categories);

				let subcategories: Menu = {
					id: ++this.i,
					name: 'Incident Types',
					href: '',
					menu: []
				};

				let category = localStorage.getItem('category');

				switch(category) {
					case 'airports':
						subcategories.menu = [
							{
								id: ++this.i,
								name: 'Flight cancellations',
								href: 'subcategory/flight-cancellations',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Unruly queues',
								href: 'subcategory/unruly-queues',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Rude personnel',
								href: 'subcategory/rude-personnel',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Bribery',
								href: 'subcategory/bribery',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Flight delays',
								href: 'subcategory/flight-delays',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Unruliness',
								href: 'subcategory/unruliness',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Baggage',
								href: 'subcategory/baggage',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Other',
								href: 'subcategory/other',
								menu: []
							},
						];
						break;
					case 'crime':
						subcategories.menu = [
							{
								id: ++this.i,
								name: 'Armed robbery',
								href: 'subcategory/armed-robbery',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Political thuggery',
								href: 'subcategory/political-thuggery',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Kidnap',
								href: 'subcategory/kidnap',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Police brutality',
								href: 'subcategory/police-brutality',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Rape',
								href: 'subcategory/rape',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Pipeline vandalism',
								href: 'subcategory/pipeline-vandalism',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Oil theft',
								href: 'subcategory/oil-theft',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Car theft',
								href: 'subcategory/car-theft',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Other',
								href: 'subcategory/other',
								menu: []
							},
						];
						break;
					case 'fake products':
						subcategories.menu = [
							{
								id: ++this.i,
								name: 'Medicine',
								href: 'subcategory/medicine',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Cosmetic',
								href: 'subcategory/cosmetic',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Food',
								href: 'subcategory/food',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Bottled Water',
								href: 'subcategory/bottled-water',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Toileteries',
								href: 'subcategory/toileteries',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Other',
								href: 'subcategory/other',
								menu: []
							},
						];
						break;
					case 'graft':
						subcategories.menu = [
							{
								id: ++this.i,
								name: 'Public officer',
								href: 'subcategory/public-officer',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Police',
								href: 'subcategory/police',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Customs',
								href: 'subcategory/customs',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Immigration',
								href: 'subcategory/immigration',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Other',
								href: 'subcategory/other',
								menu: []
							},
						];
						break;
					case 'hospitals':
						subcategories.menu = [
							{
								id: ++this.i,
								name: 'Filth',
								href: 'subcategory/filth',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Slow response',
								href: 'subcategory/slow-response',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Expired medicine',
								href: 'subcategory/expired-medicine',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Lack of facilities',
								href: 'subcategory/lack-of-facilities',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Unfriendly staff',
								href: 'subcategory/unfriendly-staff',
								menu: []
							},
							{
								id: ++this.i,
								name: 'No Doctor/Nurse',
								href: 'subcategory/no-doctor-nurse',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Unprofessional',
								href: 'subcategory/unprofessional',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Other',
								href: 'subcategory/other',
								menu: []
							},
						];
						break;
					case 'roads':
						subcategories.menu = [
							{
								id: ++this.i,
								name: 'Drainage',
								href: 'subcategory/drainage',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Pot holes',
								href: 'subcategory/pot-holes',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Flooded',
								href: 'subcategory/flooded',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Muddy',
								href: 'subcategory/muddy',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Hazardous gutter',
								href: 'subcategory/hazardous-gutter',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Illegal refuse',
								href: 'subcategory/illegal-refuse',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Other',
								href: 'subcategory/other',
								menu: []
							},
						];
						break;
					case 'school':
						subcategories.menu = [
							{
								id: ++this.i,
								name: 'Books',
								href: 'subcategory/books',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Lectures',
								href: 'subcategory/lectures',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Library',
								href: 'subcategory/library',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Infrastructure',
								href: 'subcategory/infrastructure',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Security',
								href: 'subcategory/security',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Classrooms',
								href: 'subcategory/classrooms',
								menu: []
							},
							{
								id: ++this.i,
								name: 'ICT',
								href: 'subcategory/ict',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Accommodation',
								href: 'subcategory/accommodation',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Laboratory',
								href: 'subcategory/laboratory',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Other',
								href: 'subcategory/other',
								menu: []
							},
						];
						break;
					default:
						subcategories.menu = [
							{
								id: ++this.i,
								name: 'Medicine',
								href: 'subcategory/medicine',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Cosmetic',
								href: 'subcategory/cosmetic',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Food',
								href: 'subcategory/food',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Bottled Water',
								href: 'subcategory/bottled-water',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Toileteries',
								href: 'subcategory/toileteries',
								menu: []
							},
							{
								id: ++this.i,
								name: 'Other',
								href: 'subcategory/other',
								menu: []
							},
						];
						break;
				}

				this.menus.push(subcategories);

				let states: Menu = {
					id: ++this.i,
					name: 'States',
					href: '',
					menu: []
				};

				this.data.getStates().subscribe(
					data => {
						if (data !== null) {
							for (let state of data['data']) {
								states.menu.push({
									id: ++this.i,
									name: state.name,
									href: 'state/' + state.name.toLowerCase(),
									menu: []
								})
							}

							this.menus.push(states);
						}
					}
				);

				window['initmenu'] = true;
			}
		});
	}
}
