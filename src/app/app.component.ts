import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'CitizenX';
	login = false;

	constructor() {
		let user = localStorage.getItem('user');

		if (user) {
			user = JSON.parse(user);

			this.login = typeof user !== 'object' || user['token'] === '' ? false : true;
		}
	}
}
