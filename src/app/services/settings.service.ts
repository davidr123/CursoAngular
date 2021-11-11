import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public linkTheme= document.querySelector('#theme');
  constructor() {
    const url= localStorage.getItem('theme') ||'./assets/css/colors/default-dark.css'; 

    this.linkTheme.setAttribute('href', url);

  
   }


   ChangeColor(theme:string){

    const url= `./assets/css/colors/${theme}.css`;
   
   this.linkTheme.setAttribute('href', url);
   localStorage.setItem('theme', url);
   this.CheckCurrentTheme();
   
     }

   CheckCurrentTheme(){
 
    const check=document.querySelectorAll('.selector');

    check.forEach(elem=>{
    elem.classList.remove('working');
    const btnElemnt= elem.getAttribute('data-theme');
    const btnUrlElement= `./assets/css/colors/${btnElemnt}.css`;
    const currentTheme= this.linkTheme.getAttribute('href');
  
    if(btnUrlElement === currentTheme){
      elem.classList.add('working');
    }
  
    })
  
  }
  
}
