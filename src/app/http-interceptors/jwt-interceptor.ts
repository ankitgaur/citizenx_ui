import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let user = JSON.parse(localStorage.getItem('user'));

		if (user && user.token) {
			request = request.clone({ headers: request.headers.set('token', user.token) });

			if (!request.headers.has('Content-Type')) {
				request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
			}
		}

		return next.handle(request);
	}
}
