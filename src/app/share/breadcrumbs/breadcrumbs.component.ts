import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public subs$: Subscription
  public titulo: string;
  constructor(private route: Router) { 
    this.subs$= this.getArgumentosRuta().subscribe(({titulo})=>{
   
      this.titulo= titulo;
      console.log(this.titulo)
     // this.titulo= titulo;
      document.title= `Admin-Pro - ${titulo}`;
    })
    
 
}
  ngOnDestroy(): void {
this.subs$.unsubscribe();
  }




getArgumentosRuta(){
 return this.route.events.pipe(
    filter( event=> event instanceof ActivationEnd),
    filter((event: ActivationEnd)=> event.snapshot.firstChild === null),
    map( (event:ActivationEnd)=> event.snapshot.data),
  )
}

}
