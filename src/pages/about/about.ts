import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { AboutPopover } from '../about-popover/about-popover';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  conferenceDate = '2047-05-17';

  constructor(public popoverCtrl: PopoverController) { }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(AboutPopover);
    popover.present({ ev: event });
  }
}
