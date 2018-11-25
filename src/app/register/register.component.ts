import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	submitted = false;
	error = '';
	model = {
		name: '',
		email: '',
		username: '',
		password: ''
	};

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

		this.data.userRegister(this.model).subscribe(
			data => {
				if (typeof data['status'] !== 'undefined' && data['status']) {
					this.router.navigate(['/']);
				} else {
					this.error = data['error'];
				}
			}
		);
	}
}
