import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Usuario } from 'src/app/models/usuario.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ImagenModalService } from 'src/app/services/imagen-modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  
public totalUsuarios:number=0;
public usuarios:Usuario[]=[];

public usuariosTemp:Usuario[]=[];
public imgSubs:Subscription;

public cargando: boolean= true;
public desde:number=0;
  constructor(private usuarioService:UsuarioService, private busquedaService: BusquedasService,
    private imagenModalService:ImagenModalService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
this.CargarUsuarios();

this.imgSubs=this.imagenModalService.nuevaImagen
.pipe(
  delay(100)
)
.subscribe(img=>{
  this.CargarUsuarios();
})
 
  }

  CargarUsuarios(){
    this.cargando= true;
    this.usuarioService.CargarUsuario(this.desde)
    .subscribe(({total, usuarios})=>{

      console.log(usuarios);
      this.totalUsuarios= total;
      this.usuarios= usuarios;
      this.usuariosTemp= usuarios;
      this.cargando=false;
    
                 
    })
  }

  Paginacion( valor:number){
    this.desde +=valor;

    if(this.desde <0){
      this.desde=0;
    }else if(this.desde >= this.totalUsuarios){
      this.desde -= valor;
    }

    this.CargarUsuarios();

  }

  

  buscar(termino:string){
 
   
if(termino.length===0){
  return this.usuarios= this.usuariosTemp;
}
    this.busquedaService.buscar('usuarios', termino)
    .subscribe(resp=>{
      this.usuarios= resp
    });
  }

 eliminarUsuario(usuario:Usuario){

  if(usuario.uid=== this.usuarioService.uid){
    return Swal.fire('Error', 'No puede eliminarse a si mismo', 'error');
  }
 

  Swal.fire({
    title: 'Borrar Usuario?',
    text: `Esta a punto de borrar a ${usuario.nombre}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si borrarlo'
  }).then((result) => {
    if (result.value) {
 console.log(result);
      this.usuarioService.eliminarUsuarios(usuario)
      .subscribe(resp=>{

        console.log(resp);
        this.CargarUsuarios();
        Swal.fire('Usuario Borrado',
        `${usuario.nombre} fue eliminado con éxito`, 
        'success');
  
      });
  
    }
  });
 
    
  }

  cambiarRole(usuario: Usuario){
    this.usuarioService.guardarUsuario(usuario)
    .subscribe(resp=>{
      console.log(resp);
    })
  }


  abrirModal(usuario:Usuario){
    console.log(usuario);
this.imagenModalService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
