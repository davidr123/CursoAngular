import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargaUsu } from '../interfaces/carga-usuarios.interface';
import { Login } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.models';

const base_url= environment.base_url;

declare const gapi:any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
public  auth2:any;
public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router,
    private ngZone: NgZone) {
    this.GoogleInit();
   }

   get token():string {
    return localStorage.getItem('token') || '';
   }

   get uid():string{
     return this.usuario.uid || '';
   }

   get headers(){
     return   {headers: {
      'x-token':this.token
    }} 
   }
  
  GoogleInit(){

    return new Promise<void>( resolve =>{
      gapi.load('auth2', ()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '50509173529-qdb0d0io3o55ekcdcp2eilc3e7m2k0ul.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
      
        });

        resolve();
        
      });

      
    })
    
  
  }

  Logout(){
    const token= localStorage.removeItem('token');

    
    this.auth2.signOut().then( ()=> {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      });
   
      
    });
  }


  validarToken(): Observable<boolean>{
    

    return this.http.get(`${base_url}/login/renew`,{
      headers: {
        'x-token':this.token
      }
    }).pipe(
      map((res: any)=>{

        const {
           nombre,
           email,
           img='',
           google, 
           role,
           uid
        }= res.usuario;

        this.usuario= new Usuario(nombre, email, img, google, role, uid);

        localStorage.setItem('token', res.token);

        return true;
      }),
    
      catchError(error=> of(false))
    );
  }

crearUsuario(formData: Usuario){

  return this.http.post(`${base_url}/usuarios`, formData)
  .pipe(
    tap((res:any)=>{
      localStorage.setItem('token', res.token)
    })
  )


}

actualizarPerfilUsuario(data:{nombre:string, email:string, role:string}){

  data={
    ...data,
    role: this.usuario.role
  }

  return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);


}

loginUser(formLogin: Login){
  return this.http.post(`${base_url}/login`, formLogin)
  .pipe(
    tap((res:any)=>{
      localStorage.setItem('token', res.token);
    })
  )

}

loginGoogle(token){
  return this.http.post(`${base_url}/login/google`, {token})
  .pipe(
    tap((res:any)=>{
      localStorage.setItem('token', res.token);
    })
  )

}


CargarUsuario(desde:number=0){
  //http://localhost:3005/api/usuarios?desde=5

  const url = `${base_url}/usuarios?desde=${desde}`

  return this.http.get<CargaUsu>(url, this.headers)
  .pipe(
    map(resp=>{
      const usuarios= resp.usuarios.map(
        user=> new Usuario(user.nombre, user.email, user.img, user.google, user.role, user.uid)
      );

      return {
        total: resp.total,
        usuarios
      }
    })
  )


}

eliminarUsuarios(usuario:Usuario){

  //http://localhost:3005/api/usuarios/619be1de8c20c6087b78e813
  const url= `${base_url}/usuarios/${usuario.uid}`;

  console.log(usuario);

 return this.http.delete(url, this.headers);


}

guardarUsuario(usuario:Usuario){

  

  return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);


}

}
