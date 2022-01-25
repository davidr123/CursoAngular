import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public formMedioc:FormGroup;
  public hospitales:Hospital[]=[];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb:FormBuilder, private hospitalService: HospitalService,
    private medicoService: MedicoService , private router: Router,
    private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {

this.activateRoute.params.
subscribe(({id})=>this.obtenerMedicoId(id))


    this.formMedioc= this.fb.group({
      nombre:['', Validators.required],
      hospitales:['', Validators.required]
    })
    this.cargarHospitales();


    this.formMedioc.get('hospitales').valueChanges
    .subscribe(hospitalId=> {

      this.hospitalSeleccionado= this.hospitales.find(h=> h._id === hospitalId);

      console.log("hospitselec",this.hospitalSeleccionado)

    })

  }

  obtenerMedicoId(id: string){

    if(id==='nuevo'){
      return;
    }

    this.medicoService.ObtenerMedicoId(id)
    .pipe(
      delay(100)
    )
    
    .subscribe(medico=>{
     
      if(!medico){
        return this.router.navigateByUrl(`/dashboard/medicos`)
      }
      const {nombre, hospitales:{_id}}= medico;
      console.log(nombre, _id);
      this.medicoSeleccionado=medico;
      this.formMedioc.setValue({nombre, hospitales:_id});

    })

  }


  cargarHospitales(){
    this.hospitalService.CargarHospitales()
    .subscribe((hospitales:Hospital[])=>{

      console.log(hospitales);
this.hospitales=hospitales;
    })

  }

 guardarMedico(){

  const {nombre}= this.formMedioc.value;
if(this.medicoSeleccionado){
  const data={
    ...this.formMedioc.value,
  _id: this.medicoSeleccionado._id}
this.medicoService.ActualizarMedicos(data)
.subscribe(resp=>{
  console.log(resp);
  Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success' );
})
  //actualizar


}else{
  //crear
  const {nombre}= this.formMedioc.value;
  this.medicoService.CrearMedico(this.formMedioc.value)
  .subscribe((resp:any)=>{
    console.log(resp);
  
    Swal.fire('Creado', `${nombre} creado correctamente`, 'success' );
  
    this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
  
  })
}


    
  }

}
