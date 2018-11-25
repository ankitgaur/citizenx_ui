/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoopInterceptor } from './noop-interceptor';
import { JwtInterceptor } from './jwt-interceptor';
import { ErrorInterceptor } from './error-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
	//{ provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
