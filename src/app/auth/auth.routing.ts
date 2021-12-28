import { RouterLinkWithHref, RouterModule, Routes, ROUTES } from "@angular/router";
import { NgModule } from "@angular/core";
import { Route } from "@angular/compiler/src/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";


const routes: Routes=[
    
    {path:'login', component: LoginComponent},
    {path:'register', component:RegisterComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule{}