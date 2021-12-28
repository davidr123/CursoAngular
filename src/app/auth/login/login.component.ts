import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
public auth2:any;
public formLogin=this.fb.group({
  email:[localStorage.getItem('email')|| '',Validators.required],
  password:['', Validators.required],
  remember:[false]
})

  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService
    , private ngZone: NgZone) { }
  ngOnInit(): void {
  this.renderButton();
  }


  Logout(){

  }

  
  login(){

   this.usuarioService.loginUser(this.formLogin.value)
   .subscribe(res=>{
    if(this.formLogin.get('email').value){
      localStorage.setItem('email', this.formLogin.get('email').value);
    }

          //Navegar al dashboard
          this.router.navigateByUrl('/');
   }, err=>{
    Swal.fire('Error', err.error.msg, 'error');
   })

  }


   renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
  
    });

    this.startApp();
  }


   async startApp() {
   
   await this.usuarioService.GoogleInit();
this.auth2= this.usuarioService.auth2;
   this.attachSignin(document.getElementById('my-signin2'));
    
  };


   attachSignin(element) {
   
    this.auth2.attachClickHandler(element, {},
        (googleUser)=> {
          const id_token = googleUser.getAuthResponse().id_token;
         this.usuarioService.loginGoogle(id_token).subscribe(
           res =>{
             this.ngZone.run( ()=>{ 
              this.router.navigateByUrl('/');
             })
           
           
          });
          //Navegar al dashboard
         
        }, (error)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
