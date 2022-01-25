import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ImagenModalService } from 'src/app/services/imagen-modal.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos:Medico[]=[];
  public cargando:boolean=true;
  private subs:Subscription;

  constructor(private medicoService:MedicoService, private imagenModalService:ImagenModalService,
    private busquedaService:BusquedasService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedico();

this.subs= this.imagenModalService.nuevaImagen.pipe(
  delay(
    100
  )
).subscribe(img=>{
  this.cargarMedico();
})
  }


  buscar(termino:string){
console.log(termino)
    if(termino.length===0){
      return this.cargarMedico();
    }
this.busquedaService.buscar('medicos', termino)
.subscribe(resp=>{
this.medicos=resp;
})

  }

  cargarMedico(){
    this.cargando=true
    this.medicoService.CargarMedicos()
    .subscribe(medicosDB=>{
      console.log('dd',medicosDB);
     this.medicos= medicosDB;
     this.cargando=false;
      
    })
    

  }

  actualizarMedico(medico:Medico){

    

    this.medicoService.ActualizarMedicos(medico)
    .subscribe(resp=>{
      console.log(resp);
      this.cargarMedico();
    })
  }

  borrarMedico(medico:Medico){


    Swal.fire({
      title: 'Borrar Medico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si borrarlo'
    }).then((result) => {
      if (result.value) {
   console.log(result);
        this.medicoService.BorrarMedico(medico._id, medico.nombre)
        .subscribe(resp=>{
  
          console.log(resp);
          this.cargarMedico();
          Swal.fire('Medico Borrado',
          `${medico.nombre} fue eliminado con éxito`, 
          'success');
    
        });
    
      }
    });
   
  }

  abrirModal(medico:Medico){
   
    this.imagenModalService.abrirModal('medicos', medico._id, medico.img);
      }
    

}
