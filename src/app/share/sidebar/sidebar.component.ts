import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

 menuItem:any[];


public usuario: Usuario;

  constructor(private sidebarService: SidebarService, private usuarioService: UsuarioService) { 
    this.menuItem= sidebarService.menu;
    console.log('aaa',this.menuItem)

  this.usuario= usuarioService.usuario;
    

  
  }

  ngOnInit(): void {
  
  }

}
