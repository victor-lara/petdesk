import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel, MonthAgendaService, YearService, TimelineYearService, TimelineMonthService, TimelineViewsService, PopupOpenEventArgs, SelectEventArgs, RenderCellEventArgs, EventRenderedArgs, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { AppointmentsState, AppointmentsStore } from 'src/app/stores/appointments-store';
import { BeforeOpenEventArgs, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ProgressButtonComponent } from '@syncfusion/ej2-angular-splitbuttons';

const cleanAppointment: Appointment = {
  appointmentId: 0,
  appointmentType: '',
  createDateTime: new Date(),
  requestedDateTimeOffset: new Date(),
  user: {
    userId: 0,
    firstName: '',
    lastName: ''
  },
  animal: {
    animalId: 0,
    firstName: '',
    breed: '',
    species: ''
  },
  isConfirmed: false,
  endTime: new Date()
};

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
    isLoaded: false,
    selectedDate: new Date()
  };
  editItem: Appointment = cleanAppointment;

  stateSubscription: Subscription;
  eventSettings: EventSettingsModel = {
    fields: {
      id: 'id',
      subject: { name: 'subject' },
      endTime: { name: 'endTime' },
      startTime: { name: 'startTime' }
    }
  }

  @ViewChild('schedule') schedule: ScheduleComponent;
  @ViewChild('editDialog') editDialog: DialogComponent;
  @ViewChild('saveConfirmButton') saveConfirmButton: ProgressButtonComponent;
  @ViewChild('saveEditButton') saveEditButton: ProgressButtonComponent;

  constructor(
    private readonly store: AppointmentsStore
  ) { }

  ngOnInit(): void {
    //Subscribes to the store state
    //It will execute the same method each time we change a value in the store
    this.stateSubscription = this.store.state.subscribe(data => {
      if (data && data.isLoaded && data.appointments) {
        let events = data.appointments.map(item => {
          return {
            id: item.appointmentId,
            startTime: new Date(item.requestedDateTimeOffset),
            endTime: new Date(item.endTime),
            subject: item.appointmentType,
            appointment: item
          };
        });

        if (this.data.isLoaded) {
          //If the data was already loaded, we're just updating the dataSource
          this.schedule.saveEvent(events);
          //this.schedule.refreshEvents();
        } else {
          //if is the first load, we're passing the array to the eventSettingsModel
          this.eventSettings.dataSource = events;
        }
      }

      //Keep the store state locally in case we need to perform other actions
      this.data = data;
    });
  }

  //Removes the subscription to prevent duplicated calls
  ngOnDestroy() {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }

  //Sets the editItem to initial state
  cleanEditItem() {
    this.editItem = cleanAppointment;
  }

  //Prevents using the built-in dialogs, and use the custom view
  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor' || args.type === 'QuickInfo') {
      args.cancel = true;
    }
  }

  //Customize the appointment background color
  //Sets green for confirmed appointments
  onEventRendered(args: EventRenderedArgs) {
    if (args.data && args.data.appointment && (args.data.appointment as Appointment).isConfirmed) {
      args.element.style.backgroundColor = 'darkgreen';
    }
  }

  //There's an issue with the dialog, it opens on page load
  //To prevent it, we check the editItem is not initial state
  beforeOpenEditDialog(args: BeforeOpenEventArgs) {
    this.editDialog.height = '400px';
    this.editDialog.minHeight = '400px';
    if (this.editItem.appointmentId == 0) {
      args.cancel = true;
    }
  }

  //Get the appointment value
  //
  selectAppointment(event: SelectEventArgs) {
    if (event && event.data) {
      this.editItem = (event.data as any).appointment;
      this.editDialog.show();
    }
  }

  //Change the start and end time values
  //Update the store
  saveAppointment() {
    this.store.reschedule(this.editItem);
    this.cancelEdit();
  }

  //Change the isConfirmed value
  //Update the store
  confirmAppointment() {
    this.editItem.isConfirmed = !this.editItem.isConfirmed;
    this.store.confirm(this.editItem);
    this.cancelEdit();
  }

  //Complete the progress buttons
  //Clean and hide the modal
  cancelEdit() {
    this.saveEditButton.progressComplete();
    this.saveEditButton.refresh();
    this.saveConfirmButton.progressComplete();
    this.saveConfirmButton.refresh();
    this.editDialog.hide();
    this.cleanEditItem();
  }
}
