import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.models';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TouchSequence } from 'selenium-webdriver';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

public formPerfil:FormGroup;
public usuarios:Usuario;
public imagenSubida: File;

public imgTemp: any=null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService
    , private imageUploadService: ImageUploadService) {

      this.usuarios= usuarioService.usuario;
     }

  ngOnInit(): void {

    this.formPerfil = this.fb.group({
      nombre:[ this.usuarios.nombre , Validators.required ],
      email:[ this.usuarios.email, [ Validators.required, Validators.email ] ],
    });
    
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfilUsuario( this.formPerfil.value )
        .subscribe( resp  => {
          console.log(resp);
          const { nombre, email } = this.formPerfil.value;
          this.usuarios.nombre = nombre;
          this.usuarios.email = email;
Swal.fire('Guardado', 'Los cambios fueron guardados con exito', 'success');
          
        }, error=>{
          Swal.fire('Error', 'el usuario con ese email ya existe', 'error');
        });
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
 this.imageUploadService.ActualizarFoto(this.imagenSubida, 'usuarios', this.usuarios.uid)
 .then(img=>{
  this.usuarios.img= img
  Swal.fire('Guardado', 'Los cambios fueron guardados con exito', 'success');
 }, error=>{
  Swal.fire('Error', 'no se pudo cargar la imagen de perfil', 'error');
 })
 
  }
  

}
