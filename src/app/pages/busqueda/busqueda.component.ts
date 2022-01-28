import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios:Usuario[]=[]
  public medicos:Medico[]=[]
  public hospitales:Hospital[]=[]

  constructor(private activatedRoute: ActivatedRoute, private busquedaService:BusquedasService) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe(({termino})=> this.BusquedaGlobal(termino))

  }


  BusquedaGlobal(termino:string){
this.busquedaService.busquedaGlobal(termino)
.subscribe((resp:any)=>{
  this.usuarios= resp.usuarios;
  this.medicos= resp.medicos;
  this.hospitales= resp.hospitales;
})
  }

  abrirMedico(medico:Medico){

    
  }

}
