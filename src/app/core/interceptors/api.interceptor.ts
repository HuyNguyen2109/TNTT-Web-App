import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Attaches session cookie to every outgoing request so the BFF
 * can validate the Passport.js session on all /api/* and /auth/* calls.
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ withCredentials: true }));
};
