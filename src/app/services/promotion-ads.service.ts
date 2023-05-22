import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionAdsService {
  private adsList :string[]
  constructor() {

    this.adsList =['school bugs' , 'Kw course' , 'Sport School' , 'Weddings Parties'];


   }

   getScheduleAds(intervalInSec:number):Observable<string>
   {
    return new Observable<string>((observer) => {
      let counter = 0;
      let adsTimer = setInterval(()=>{
        if(counter == this.adsList.length){
          observer.complete();
        }
        if(this.adsList[counter] == ""){
          observer.error('Error:Empty Ads')
        }

        observer.next(this.adsList[counter]);
        counter++ ;

      }, intervalInSec * 1000);

      return {
        unsubscribe(){
          //will be called:
            //1 - error
            //2- complete
            //3- unsubscribe
          
          clearInterval(adsTimer);
          console.log("In Obs Unsubscribe");
        }
      }
    })
   }
}
