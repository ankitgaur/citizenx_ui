import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	constructor(private http: HttpClient) { }

	userLogin(data) {
		return this.http.post(`${environment.apiEndPoint}user/login/`, data);
	}

	userRegister(data) {
		return this.http.put(`${environment.apiEndPoint}user/register/`, data);
	}

	getUser() {
		return this.http.get(`${environment.apiEndPoint}user/user-info/`);
	}

	getStates() {
		return this.http.get(`${environment.apiEndPoint}states/`);
	}

	getIncidents(filter = {}) {
		return this.http.post(`${environment.apiEndPoint}getincidents/`, filter);
	}
}
