import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	bodyClass = 'authentication-bg';
	submitted = false;
	
	model = {
		username: '',
		password: ''
	};

	error = '';

	constructor(private data: DataService, private router: Router) { }

	ngOnInit() {
		let user = JSON.parse(localStorage.getItem('user'));

		if (user && typeof user['token'] !== 'undefined') {
			location.assign('/dashboard')
		}

		document.body.classList.add('authentication-bg');
	}

	onSubmit() {
		this.submitted = true;

		this.data.userLogin(this.model).subscribe(
			data => {
				if (typeof data['data'] !== 'undefined' && typeof data['status'] !== 'undefined' && data['status'] && data['data'] != '') {
					localStorage.setItem('user', JSON.stringify({
						'token': data['data']
					}));

					//this.router.navigate(['/dashboard']);
					location.assign('/dashboard');
				} else {
					this.error = data['error'];
				}
			}
		);
	}
}
