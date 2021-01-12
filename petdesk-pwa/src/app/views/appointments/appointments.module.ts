import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';


@NgModule({
  declarations: [AppointmentsComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    ScheduleModule,
    ButtonModule
  ]
})
export class AppointmentsModule { }
