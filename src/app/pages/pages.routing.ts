import { RouterLinkWithHref, RouterModule, Routes, ROUTES } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { AuthGuard } from "../guards/auth.guard";
import { PerfilComponent } from "./perfil/perfil.component";
import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component";

import { CommonModule } from "@angular/common";
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { MedicoComponent } from "./mantenimientos/medicos/medico/medico.component";


const routes: Routes= [


    {path:'dashboard', 
    component: PagesComponent,
    canActivate:[AuthGuard],
    children:[
        {path:'', component: DashboardComponent, data:{titulo:'Dashboard'}},
      {path:'progress', component: ProgressComponent, data:{titulo:'Progreso'}},
      {path:'grafica1', component: Grafica1Component, data:{titulo:'Grafica'}},
      {path:'account-settings', component: AccountSettingsComponent, data:{titulo:'Ajustes'}},
      {path:'promesas', component: PromesasComponent, data:{titulo:'Promesas'}},
      {path:'rxjs', component: RxjsComponent, data:{titulo:'RxJs'}},
    {path:'perfil', component: PerfilComponent, data:{titulo:'Perfil de Usuarios'}},

    //mantenimientos
    {path:'usuarios', component: UsuariosComponent, data:{titulo:'Mantenimientos de Usuario'}},
    {path:'hospitales', component: HospitalesComponent, data:{titulo:'Mantenimientos de Hospitales'}},
    {path:'medicos', component: MedicosComponent, data:{titulo:'Mantenimientos de Medicos'}},
    {path:'medico/:id', component: MedicoComponent, data:{titulo:'Mantenimientos de Medico'}}
    
    ]},
      

];


@NgModule({
    imports: [RouterModule.forChild(routes),  CommonModule],
    exports: [RouterModule]
})
export class PagesRoutingModule{}