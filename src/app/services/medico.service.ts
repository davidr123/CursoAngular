import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.models';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http:HttpClient) { }


  get token():string {
    return localStorage.getItem('token') || '';
   }

  
   get headers(){
     return   {headers: {
      'x-token':this.token
    }} 
   }
  

   CargarMedicos(){
    
  
    const url = `${base_url}/medicos`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok:boolean, medicosDB:Medico[]})=> resp.medicosDB)
    )
  
  }

  ObtenerMedicoId(id: string){
    
  
    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok:boolean, medicosDB:Medico})=> resp.medicosDB)
    )
  
  }


  ActualizarMedicos(medico:Medico){
    //http://localhost:3005/api/medicos/619d27811d213ba5754c071e

    const url = `${base_url}/medicos/${medico._id}`;

    return this.http.put(url, medico ,this.headers)


  }

  BorrarMedico(id:string, nombre:string){
    //http://localhost:3005/api/medicos/61d2387247962db3f18f5408

    const url = `${base_url}/medicos/${id}`;
    return this.http.delete(url ,this.headers);

  }


  CrearMedico(medico: {nombre:string, hospital:string}){
    const url = `${base_url}/medicos`;

    return  this.http.post(url, medico, this.headers);

  }

}
