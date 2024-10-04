import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-toolbar-header',
  templateUrl: './toolbar-header.component.html',
  styleUrls: ['./toolbar-header.component.css']
})
export class ToolbarHeaderComponent {

  constructor( private location: Location) {

  }

  goBack() {
    this.location.back();
  }

}
