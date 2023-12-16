import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VesselsComponent } from './vessels.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VesselsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: VesselsComponent }]),
  ],
})
export class VesselsModule {}
