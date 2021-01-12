import { state } from "@angular/animations";
import { Identifiers } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { finalize } from "rxjs/operators";
import { Appointment } from "../models/appointment";
import { AppointmentsService } from "../services/appointments.service";

const DEFAULT_STATE: AppointmentsState = {
  appointments: [],
  showDialog: false,
  editDialog: null,
  isLoaded: false,
  selectedDate: new Date()
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentsStore extends ComponentStore<AppointmentsState> {
  constructor(private appointmentsService: AppointmentsService) {
    super(DEFAULT_STATE);

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

  readonly confirm = this.updater((state, id: number) => {
    const items = state.appointments;
    items.forEach(x => {
      if (x.appointmentId == id) {
        x.isConfirmed = true;
        return;
      }
    });

    return {
      ...state,
      appointments: items
    };
  });

  readonly reschedule = this.updater((state, appointment: Appointment) => {
    const items = state.appointments;
    items.forEach(x => {
      if (x.appointmentId == appointment.appointmentId) {
        x = appointment;
        return;
      }
    })

    return {
      ...state,
      appointments: items
    };
  });
}

export interface AppointmentsState {
  appointments: Array<Appointment>;
  showDialog: boolean;
  editDialog?: number;
  isLoaded: boolean;
  selectedDate: Date;
}
