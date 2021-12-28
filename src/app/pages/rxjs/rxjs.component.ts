import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscriber, Subscription } from 'rxjs';
import {filter, map, retry, take} from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy  {

public unsubs: Subscription;

  constructor() {

   
/*
    this.RetornaObservable().pipe(retry(2)).subscribe(valor=>
      console.log('Subs', valor),
      error=> console.warn('Error', error),
      ()=> console.log('TERMINADO')
    )
*/
this.unsubs=this.RetornaInterval().subscribe(valor=>{
  console.log(valor);
})
   }
  ngOnDestroy(): void {
  this.unsubs.unsubscribe();
  }


   RetornaInterval(): Observable<number>{
    
    return interval(100).pipe(
     
      map(valor=> valor),
      filter(valor=> (valor % 2===0)? true: false ),
  
       );

   }


   RetornaObservable(): Observable<number>{
    let i=-1;
    const obs= new Observable<number>(observer=>{
  
     const time=   setInterval(()=>{
         i++;
         observer.next(i);
         if(i===3){
  clearInterval(time);
  observer.complete();
         }
  
         if(i===2){
          
           observer.error('llego al error 2');       }
        }, 1000)
      });

      return obs;
   }

  

}
