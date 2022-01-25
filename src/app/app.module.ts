import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//MODULOS DE RUTA
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';


import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';








@NgModule({
  declarations: [
    AppComponent,
NotpagefoundComponent,



   
 
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    PagesRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
