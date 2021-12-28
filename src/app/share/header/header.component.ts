import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

public usuario:Usuario;
  public emailProfile: string='';

  constructor(private usuarioService: UsuarioService) { 
this.usuario= usuarioService.usuario;
    this.emailProfile= usuarioService.usuario.email;
  }

  Logout(){

    this.usuarioService.Logout();
  }

}
