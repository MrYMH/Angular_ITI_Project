import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[LightBox]'
})
export class LightBoxDirective implements OnChanges , OnInit{

  @Input('LightBox') heighlightColor :string = "yellow";
  @Input() defaultColor :string = "darkblue";

  constructor(private elem : ElementRef) {
    //two cases : [ variable initialization - dependency injection   ]
   }
  ngOnInit(): void {
    // called after onChanges + to initialize all inputs after changed to be desplayed 
    //[input changed once at beginnig of app]
    this.elem.nativeElement.style.border = `3px solid ${this.defaultColor}`

  }
  ngOnChanges(): void {
    //when inputs changed , setted , resetted + called after ctor [input continously changed]
    // this.elem.nativeElement.style.border = `3px solid ${this.defaultColor}`
  }

   @HostListener('mouseover') onMouseOver(){
      this.elem.nativeElement.style.border = `3px solid ${this.heighlightColor}`
   }
   @HostListener('mouseout') onMouseOut(){
    this.elem.nativeElement.style.border = `3px solid ${this.defaultColor}`
   }

}
