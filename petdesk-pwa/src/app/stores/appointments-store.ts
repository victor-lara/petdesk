import { state } from "@angular/animations";
import { Identifiers } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { finalize } from "rxjs/operators";
import { Appointment } from "../models/appointment";
import { AppointmentsService } from "../services/appointments.service";

const DEFAULT_STATE: AppointmentsState = {
  appointments: [],
  isLoaded: false,
  selectedDate: new Date()
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentsStore extends ComponentStore<AppointmentsState> {
  constructor(private appointmentsService: AppointmentsService) {
    super(DEFAULT_STATE);

    //Grabs the data from API on store creation
    //the subscription is destroyed after is completed
    this.appointmentsService.getAll()
      .pipe(finalize(() => {
        this.setState(state => {
          return { ...state, isLoaded: true }
        });
      }))
      .subscribe(data => {
        this.setState(state => {
          return {
            ...state,
            selectedDate: data[0].createDateTime || new Date(),
            appointments: data
          }
        });
      })
  }

  readonly appointments = this.select(state => state.appointments);

  readonly state = this.select(state => state);

  readonly reschedule = this.updater((state, appointment: Appointment) => {
    let items = state.appointments;
    items.forEach(x => {
      if (x.appointmentId == appointment.appointmentId) {
        x.requestedDateTimeOffset = appointment.requestedDateTimeOffset;
        x.endTime = appointment.endTime;
        return;
      }
    });

    return {
      ...state,
      appointments: items
    };
  });

  readonly confirm = this.updater((state, appointment: Appointment) => {
    let items = state.appointments;
    items.forEach(x => {
      if (x.appointmentId == appointment.appointmentId) {
        x.isConfirmed = appointment.isConfirmed;
        return;
      }
    });

    return {
      ...state,
      appointments: items
    };
  });
}

export interface AppointmentsState {
  appointments: Array<Appointment>;
  isLoaded: boolean;
  selectedDate: Date;
}
