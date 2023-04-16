import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable} from "rxjs";
import { catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import {UserAuthService} from "../Services/interceptor/user-auth.service";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {ShareServiceService} from "../Services/share-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private share: ShareServiceService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
/**
    if (req.headers.get("No_Auth") === 'True') {
      return next.handle(req.clone());
    }
 **/

    const token: string | null = this.userAuthService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);

  }

}

