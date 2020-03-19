import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { ProgressLoaderService } from '../services/progress-loader.service';
import { Observable, observable } from 'rxjs';

/**
 * Intecept every HTTP call and enable progress loading service
 * to load progress of HTTP call to UI using progress loading component
 */
@Injectable()
export class ProgressLoaderInterceptor implements HttpInterceptor{

    private requests: HttpRequest<any>[] = [];  // Array of HTTP Request calls

    // Inject progress loading service for use to interact with UI
    constructor(private progressLoaderService: ProgressLoaderService) {}

    /** 
     * Function to intercept HTTP calls-required for classes implementing HttpInterceptor
     * Returns Observable of HttpEvent
    */ 
    intercept(request:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
        
        // add the request in parameter to local array of HTTP Request calls
        this.requests.push(request); 
        // set the progressLoading service subscription next value to true-shows that 
        // loading is in progress - emits true/false
        this.progressLoaderService.isInProgress.next(true);

        // create and subscribe an Observable of HttpEvent and return it
        return Observable.create(observable=>{
            const subscription = next.handle(request).subscribe( // create subscription
                event => {
                    if(event instanceof HttpResponse) {  // handle HttpResponse event
                        this.removeHttpRequest(request); // on next-remove from request array and send signal to service
                        observable.next(event);          // for next-return the HttpResponse event
                    }
                },
                err => {
                    // TO-DO: Inform user about error using some alerting funtionality
                    this.removeHttpRequest(request); // on error-remove from request array and send signal to service
                    observable.error(err);           // for error-return the error event
                },
                () => {
                    this.removeHttpRequest(request); // on complete-remove from request array and send signal to service
                    observable.complete();           // for complete-return the complete event
                }
            );

            // on cancel-remove from request array, send signal to service and unsubscribe the observable
            return () => {
                this.removeHttpRequest(request);
                subscription.unsubscribe();
            }
        });
    }J4

    /**
     * Function to remove HttpRequest from local array of Http calls to keep rack of http calls
     * in progress
    */
    removeHttpRequest(request:HttpRequest<any>):void{
        const i = this.requests.indexOf(request);   // get array index for parameter of HTTP request
        if(i >=0){
            this.requests.splice(i,1);              // remove parameter from Array of HTTP request calls
        }
        // determine is requests are still loading by deducing if request array is empty-emits true/false
        this.progressLoaderService.isInProgress.next(this.requests.length > 0); 
    }
}
