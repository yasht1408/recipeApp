import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkY0AjRMx1NAmepUfI_gW9G1t1koJM3kk',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
        catchError(errorRes => 
          this.handleError(errorRes)
        ),tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +
          resData.expiresIn))
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkY0AjRMx1NAmepUfI_gW9G1t1koJM3kk',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
        catchError(errorRes => 
          this.handleError(errorRes)
        ),tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +
          resData.expiresIn))
    );
  }

  public autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return
    }
    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = 
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    {
      let errorMessage = 'An unknown error occured';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS': 
          errorMessage = 'This email already exists';
        break;
        case 'EMAIL_NOT_FOUND' : 
          errorMessage = 'This email does not exist';
        break;
        case 'INVALID_PASSWORD' :
          errorMessage = 'The password is invalid';
        break;    
      }
      return throwError(errorMessage);
    }
  }

  private handleAuthentication(email:string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email,userId,token,expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    },expirationDuration)
  }
}
