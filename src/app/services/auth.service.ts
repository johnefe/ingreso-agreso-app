import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient, private router:Router) { }

  initAuthUserListener(){

    if(!localStorage.getItem('token')){
      this.router.navigate(['login']);
    }

  }

  crearUsuario(data:any):Observable<any>{
    const obj = new FormData();
    obj.append('name',data.name);
    obj.append('email',data.email);
    obj.append('password',data.password);
    obj.append('password_confirmation',data.confirm_password);

    return this._http.post(environment.apiUrl+'/api/auth/register',obj);
  }

  loginUsuario(data:any): Observable<any>{
    const obj = new FormData();
    obj.append('email',data.email);
    obj.append('password',data.password);
    return this._http.post(environment.apiUrl+'/api/auth/login',obj);
  }

  llogout(){
    return this._http.post(environment.apiUrl+'/api/auth/logout','');
  }
  logout(): Observable<any[]> {
      let token = localStorage.getItem('token');
      let parameters = new HttpHeaders();
      parameters = parameters.set('Authorization', "Bearer " + token );
      return this._http.post<any[]>(environment.apiUrl+'/api/auth/logout', '', { headers: parameters } );
  }
}
