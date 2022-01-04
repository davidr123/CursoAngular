import { Injectable,EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ImagenModalService {


  public nuevaImagen: EventEmitter<string>= new EventEmitter<string>();

  public tipo:  'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string;

  public _ocultarModal: boolean= true;

  constructor() { }

  get ocultarModal(){
  return this._ocultarModal;
  }


  abrirModal(tipo: 'usuarios'|'medicos'|'hospitales', id:string, img:string='no-img'){

   this._ocultarModal=false;
this.tipo= tipo;
this.id= id;



if(img.includes('https')){
  this.img= img;
 
}else
{
  this.img= `${base_url}/upload/${tipo}/${img}`;
}

  }


  cerrarModal(){
    return this._ocultarModal= true;
  }

}
