import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-voyages',
  templateUrl: './voyages.component.html',
  styleUrls: ['./voyages.component.scss'],
})
export class VoyagesComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
  }
}
