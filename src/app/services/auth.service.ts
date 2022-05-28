import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.baseUrl + '/login';

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private alertCtrl: AlertController
  ) { }

  login(credentials: any) {
    return this.http.post<{ token: string }>(this.apiUrl, credentials).pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/posts';
        this.router.navigate([returnUrl]);
        return true;
      }),
      catchError(async () => {
        const alert = await this.alertCtrl.create({ header: 'Error', message: 'Login Failed try again.' });
        await alert.present();
        return throwError(() => false);
      })
    );
  }

  register(data: any) {
    return this.http.post<any>(`${environment.baseUrl}/register_user`, data);
  }

  logout(returnUrl?: string): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login'], { queryParams: { returnUrl } });
  }

  loggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  get user() {
    const decoded = this.jwtHelper.decodeToken();
    return { id: decoded.user_id, name: decoded.name };
  }
}
