import { NumberValueAccessor } from "@angular/forms";
import { Animal } from "./animal";
import { User } from "./user";

export interface Appointment {
  appointmentId: number;
  appointmentType: string;
  createDateTime: Date;
  requestedDateTimeOffset: Date;
  user: User;
  animal: Animal;
  isConfirmed: boolean;
  endTime: Date;
}
