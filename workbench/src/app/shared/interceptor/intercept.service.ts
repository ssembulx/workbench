// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
	// intercept request and add token
	constructor(private spinner: NgxSpinnerService) { }
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const endPoint = request.url.split('/')[request.url.split('/').length-1]
		this.getUrl().includes(endPoint)  ? '' : this.spinner.show();
		// request = request.clone({
		// 	withCredentials: true
		// });
		return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
			if (event instanceof HttpResponse) {
				this.spinner.hide();
			}
		},
			(err: any) => {
				this.spinner.hide();
				console.log(err);
			}));
	};
	getUrl(){
		 return ['']
	}
}

