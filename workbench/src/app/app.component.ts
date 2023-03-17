import { Component } from '@angular/core';
import { SummaryService } from './shared/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'workbench';
  authenticaiton: boolean;
  constructor(private service: SummaryService) {}

  ngOnInit() {
    this.service.getauthenticationDone().subscribe((data: boolean) => {
      this.authenticaiton = data;
      // console.log(this.authenticaiton,'authenticaiton  data')
    });
  }
}

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}
