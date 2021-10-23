import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'english-training';
  activeTabIndex = 0

  onTabChanged (e: any) {
    this.activeTabIndex = e.index
  }
}
