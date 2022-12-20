import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: "[fullscreenmode]",
})
export class FullscreenDirective {
  constructor() { }

  @Input() FullScreenView: any;

  @HostListener('click', ['$event']) onClick($event:any) {
    console.info('clicked: ', $event, this.FullScreenView);
    let _this= this;
    Array.from(this.FullScreenView.classList).includes("fullscreen-view") ?
      (function(){
        _this.FullScreenView.classList.remove("fullscreen-view")
      _this.FullScreenView.getElementsByClassName('fa-expand')[0].style.display = "block"
      _this.FullScreenView.getElementsByClassName('fa-compress')[0].style.display = "none"
      _this.FullScreenView.getElementsByClassName('chart-item')[0].style.height = "51vh"
      } )():
      (function(){
      _this.FullScreenView.classList.add("fullscreen-view")
      _this.FullScreenView.getElementsByClassName('fa-expand')[0].style.display = "none"
      _this.FullScreenView.getElementsByClassName('fa-compress')[0].style.display = "block"
      _this.FullScreenView.getElementsByClassName('chart-item')[0].style.height = "90vh"
    } )()
      this.nodatablock()
      
  }

  nodatablock(){  
  //   Array.from(this.FullScreenView.classList).includes("fullscreen-view") ?
  //   this.FullScreenView.getElementsByClassName("no_data_block")[0].style.left = '44%' :
  //   this.FullScreenView.getElementsByClassName("no_data_block")[0].style.left = '31%'
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key == "Escape") {
       Array.from(this.FullScreenView.classList).includes("fullscreen-view") ?
       this.FullScreenView.classList.remove("fullscreen-view") : ""
      //   this.FullScreenChart.getElementsByClassName('fa-expand')[0].style.display = "block"
      // this.FullScreenChart.getElementsByClassName('fa-remove')[0].style.display = "none"

     if(!Array.from(this.FullScreenView.classList).includes("fullscreen-view")){
      this.FullScreenView.getElementsByClassName('fa-expand')[0].style.display = "block"
      this.FullScreenView.getElementsByClassName('fa-compress')[0].style.display = "none"
      this.FullScreenView.getElementsByClassName('chart-item')[0].style.height = "51vh"
     }

      this.nodatablock()
    }
  }
}
