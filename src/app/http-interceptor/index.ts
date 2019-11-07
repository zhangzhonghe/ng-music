import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonParamsInterceptor } from './common-params-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CommonParamsInterceptor, multi: true }
]