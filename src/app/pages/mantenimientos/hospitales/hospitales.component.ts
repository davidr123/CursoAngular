import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.models';
import { BusquedasService } from 'src/app/services/busquedas.service';

import { HospitalService } from 'src/app/services/hospital.service';
import { ImagenModalService } from 'src/app/services/imagen-modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public totalHospitales:Hospital;

  public hospitales:Hospital[]=[];
  public cargando:boolean=true;
  public subs:Subscription;

  constructor(private hospitalServices: HospitalService, private imagenModalService:ImagenModalService
    , private busquedaService:BusquedasService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarHospitales();

    this.subs=this.imagenModalService.nuevaImagen
.pipe(
  delay(100)
)
.subscribe(img=>{
  this.cargarHospitales();
})

   
  }


  buscar(termino:string){
 
   
    if(termino.length===0){
      return this.cargarHospitales();
    }
        this.busquedaService.buscar('hospitales', termino)
        .subscribe(resp=>{
          this.hospitales= resp
        });
      }
    


  cargarHospitales(){
    this.cargando=true;
    this.hospitalServices.CargarHospitales()
    .subscribe(hospitalDB=>{
      console.log(hospitalDB);
     this.hospitales= hospitalDB;
      this.cargando=false;
    })

  }

  actualizarHospital(hospital:Hospital){

    this.hospitalServices.actualizarHospitales(hospital._id, hospital.nombre)
    .subscribe(resp=>{
      console.log(resp);
    });

  }

  borrarHospital(hospital:Hospital){
    this.hospitalServices.borrarHospitales(hospital._id)
    .subscribe(resp=>{
      console.log(resp);
       this.cargarHospitales();

    });
  }

 async crearHospital(){

    const { value='' } = await Swal.fire<string>({
      title:'CREAR HOSPITAL',
      text:'Ingrese el nombre del hospital',
      input: 'text',
     showCancelButton:true,
      inputPlaceholder: 'nombre del Hospital'
    })

    if(value.trim().length>0){
      this.hospitalServices.crearHospitales(value)
      .subscribe((resp:any)=> {
        this.hospitales.push(resp.hospital);
        console.log(this.hospitales);
      });
    }
    
  
  }

  abrirModal(hospital:Hospital){
   
this.imagenModalService.abrirModal('hospitales', hospital._id, hospital.img);
  }

}
