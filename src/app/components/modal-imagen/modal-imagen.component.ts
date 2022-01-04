import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { ImagenModalService } from 'src/app/services/imagen-modal.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubida: File;

  public imgTemp: any=null;

  constructor(public imagenModalService:ImagenModalService, private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {
  }

 abrirModal(usuario:Usuario){
   this.imagenModalService.abrirModal('usuarios', usuario.uid, usuario.img );

 }

 cerrarModal(){
   this.imagenModalService.cerrarModal();
 }

 cambiarImagen(file: File){
  this.imagenSubida= file;

  if(!file){
   return this.imgTemp= null;
    
   
   }
  const reader= new FileReader();
  const url64= reader.readAsDataURL(file);

  reader.onloadend=()=>{
    this.imgTemp= reader.result;
  }


 }

 subirImagen(){

  const id= this.imagenModalService.id;
  const tipo= this.imagenModalService.tipo


  this.imageUploadService.ActualizarFoto(this.imagenSubida, tipo, id)
  .then(img=>{
  
   Swal.fire('Guardado', 'Los cambios fueron guardados con exito', 'success');
   this.imagenModalService.nuevaImagen.emit(img);
   this.cerrarModal();
  }, error=>{
   Swal.fire('Error', 'no se pudo cargar la imagen de perfil', 'error');
  })
  
   }
   


}
