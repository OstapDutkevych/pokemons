import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy{
    showSpinner:boolean = false;
    subscription!:Subscription;
    constructor(private spinnerService: SpinnerService){}
        ngOnInit(){
            this.init()
        }

        init(){
            this.subscription = this.spinnerService.getSpinnerObserver().subscribe((status)=>{
                this.showSpinner = status === 'start'
            })
        }
        ngOnDestroy(){
            this.subscription.unsubscribe()
        }
}
