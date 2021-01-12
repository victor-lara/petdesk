import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel, MonthAgendaService, YearService, TimelineYearService, TimelineMonthService, TimelineViewsService, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { AppointmentsState, AppointmentsStore } from 'src/app/stores/appointments-store';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  providers: [ComponentStore,
    DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, YearService, TimelineYearService, TimelineViewsService, TimelineMonthService]
})
export class AppointmentsComponent implements OnInit, OnDestroy {

  data: AppointmentsState = {
    appointments: [],
    showDialog: false,
    editDialog: null,
    isLoaded: false,
    selectedDate: new Date()
  };

  stateSubscription: Subscription;
  eventSettings: EventSettingsModel = {
    fields: {
      id: 'id',
      subject: { name: 'subject' },
      endTime: { name: 'endTime' },
      startTime: { name: 'startTime' }
    }
  }

  constructor(
    private readonly store: AppointmentsStore
  ) { }

  ngOnInit(): void {
    this.stateSubscription = this.store.state.subscribe(data => {
      this.data = data;

      if (this.data && this.data.isLoaded && this.data.appointments) {
        this.eventSettings.dataSource = data.appointments.map(item => {
          return {
            id: item.appointmentId,
            startTime: new Date(item.requestedDateTimeOffset),
            endTime: new Date(item.endTime),
            subject: item.appointmentType,
            animal: item.animal.firstName,
            species: item.animal.species,
            breed: item.animal.breed,
            user: `${item.user.firstName} ${item.user.lastName}`,
            isConfirmed: false
          };
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor' || args.type === 'QuickInfo') {
      args.cancel = true;
    }

    console.log(args.data);
  }
}
