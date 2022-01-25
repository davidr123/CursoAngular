import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.models';
import { Medico } from '../models/medico.models';
import { Usuario } from '../models/usuario.models';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {



  constructor(private http: HttpClient) { }

  get token():string {
    return localStorage.getItem('token') || '';
   }


   get headers(){
    return   {headers: {
     'x-token':this.token
   }} 
  }


  private transformarUsuario(resultados:any[]): Usuario[]{

    return resultados.map(
    user=> new Usuario(user.nombre, user.email, user.img, user.google, user.role, user.uid)
    ) 

  }

  private transformarHospital(resultados:any[]): Hospital[]{

    return resultados;

  }


  private transformarMedico(resultados:any[]): Medico[]{

    return resultados;

  }




  buscar(tipo:'usuarios'| 'medicos' | 'hospitales',
  termino: string){
    //http://localhost:3005/api/todo/coleccion/hospitals/b
    const url= `${base_url}/todo/coleccion/${tipo}/${termino}`;
    
    return this.http.get<any[]>(url, this.headers)
    .pipe(
      map((resp:any)=> {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuario(resp.resultados)

            case 'hospitales':
              return this.transformarHospital(resp.resultados);

              case 'medicos':
                return this.transformarMedico(resp.resultados);
           
          default:
            return[];
        }
      })
    );
  }
}
