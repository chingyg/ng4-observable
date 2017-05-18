import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
numbersObservableSubscription: Subscription;
customObservableSubscription: Subscription;


// Operators can be used on any observable. You just need to import rxjs/Rx
  constructor() { }

  ngOnInit() {
    // Interval is a simple way of creating an observable
    // Emit a new peice of data every second
    // map() maps the data you get back into a new observable with any transformation of your choice
    const myNumbers = Observable.interval(1000)
    .map(
      (data:number) => {
        return data * 2;
      });

    // you can pass 3 arguments to subscribe; normal data, errors, completion
    this.numbersObservableSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    // create() takes a function as argument, which should hold your asynchronous code
    const myObservable  = Observable.create((observer: Observer<string>) => {
      setTimeout(() =>{

        // next() emmits a normal data package
        observer.next('first package');
      },2000);
      setTimeout(() =>{

        // next() emmits a normal data package
        observer.next('second package');
      },4000);
      setTimeout(() =>{

        // next() emmits a normal data package
        observer.error('this does not work');
      },5000);
      setTimeout(() =>{

        // next() emmits a normal data package
        observer.complete();
      },6000);
      
    });

    this.customObservableSubscription = myObservable.subscribe(
      (data: string)=>{
        console.log(data); },
      (error: string)=>{
        console.log(error); },
      ()=>{
        console.log('completed'); }
    
    );
    
  }

  ngOnDestroy()
  {
    this.numbersObservableSubscription.unsubscribe();
    this.customObservableSubscription.unsubscribe();
  }

}
