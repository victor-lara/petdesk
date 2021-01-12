using System;

namespace PetDesk.Models
{
    public class Appointment
    {
        public int AppointmentId { get; set; }
        public string AppointmentType { get; set; }
        public DateTime CreateDateTime { get; set; }
        public DateTime RequestedDateTimeOffset { get; set; }
        public User User { get; set; }
        public Animal Animal { get; set; }
        public bool IsConfirmed { get; set; } = false;
        public DateTime EndTime => RequestedDateTimeOffset.AddHours(1);
    }
}
