import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { TimeFormatPipe } from '../../../shared/pipes/time-format.pipe';

@NgModule({
  declarations: [
    DetailsComponent,
    TimeFormatPipe
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule
  ]
})
export class DetailsModule { }
