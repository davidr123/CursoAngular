import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'
  ]
})
export class RegisterComponent  {

  public formSubmited= false;
  public registerForm= this.fb.group({

    nombre: ['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    password:['', Validators.required],
    password2:['', Validators.required],
    terminos:[false, Validators.required], 

  },{

   validators: this.ContrasenasIguales('password', 'password2')
  
  });


  constructor(private fb:FormBuilder, private usuarioService: UsuarioService) { }


  crearUsuario(){
    this.formSubmited=true;

    console.log(this.registerForm.value);
  if(this.registerForm.invalid){
    return;

  }

  this.usuarioService.crearUsuario(this.registerForm.value).subscribe(res=>{
    console.log(res);
  }, (err)=>{
    //si sucede un error
    Swal.fire('Error', err.error.msg, 'error');
  });


  }

  campoNoValido(campo:string): boolean{

    if(this.registerForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;
    }
    

  }

  ContrasenasNoIguales(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if((pass1 !== pass2) && this.formSubmited){
      return true;
    }else{
      return false;
    }


  }

  campoTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmited;
 }

 ContrasenasIguales(pass1: string, pass2:string){



  return (formgroup: FormGroup)=>{
    const passControl= formgroup.get(pass1);
    const passControl2= formgroup.get(pass2);

    if(passControl.value === passControl2.value ){
      passControl2.setErrors(null);
    }else{
      passControl2.setErrors({noEsIgual: true});
    }

  }


 }

}
