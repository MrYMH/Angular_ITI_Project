import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter, map } from 'rxjs';
import { StoreData } from 'src/app/ViewModels/store-data';
import { PromotionAdsService } from 'src/app/services/promotion-ads.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy {
    StoreInfo : StoreData;
    isImgShown = true;
    private subList : Subscription[] = []

    constructor(private ads: PromotionAdsService ) {
      this.StoreInfo = new StoreData("ITI Store" , "Https://picsum.photos/100/100" , ['Cairo' , 'Alex' , 'Qena'])
      
    }
  ngOnDestroy(): void {
    for(let sub of this.subList){
      sub.unsubscribe();
    }
  }


  ngOnInit(): void {
    let observer= {
      next:(data:string)=>{
        console.log(data);
      },
      error:(err:string)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("ads finished!");
      }
    };
    let filterobservable = this.ads.getScheduleAds(3).pipe(
      map(ad => "Ad: " + ad),
      filter(ad => ad.includes('chool'))
      
    )

    let subscription = filterobservable.subscribe(observer);
    this.subList.push(subscription);

    // let subscription = this.ads.getScheduleAds(3).subscribe(observer);
    // this.subList.push(subscription);
  }
    ToggleImage(){
      this.isImgShown = !this.isImgShown;
    }
}
