import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppointmentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppointmentsRoutingModule,
    ScheduleModule,
    ButtonModule,
    DialogModule,
    ProgressButtonModule,
    DateTimePickerModule
  ]
})
export class AppointmentsModule { }
