import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

public usuario:Usuario;
  public emailProfile: string='';

  constructor(private usuarioService: UsuarioService, private router: Router) { 
this.usuario= usuarioService.usuario;
    this.emailProfile= usuarioService.usuario.email;
  }

  Logout(){

    this.usuarioService.Logout();
  }


  buscar(termino:string){

    if(termino.length===0){
      return;
    }
   this.router.navigateByUrl(`/dashboard/buscar/${termino}`)
  }

}
