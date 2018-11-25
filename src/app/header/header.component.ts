import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { DataService } from '../data.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
	logoutURL:string
	user = {
		name: ''
	};

	constructor(private data: DataService) { }

	ngOnInit() {
		this.logoutURL = environment.logoutURL;
		this.user.name = '';

		this.data.getUser().subscribe(
			data => {
				this.user = 'data' in data ? data['data'] : {name: ''};
			}
		);
	}
}
