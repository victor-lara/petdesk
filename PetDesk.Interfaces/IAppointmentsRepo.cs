using System.Collections.Generic;
using System.Threading.Tasks;
using PetDesk.Models;

namespace PetDesk.Interfaces
{
    public interface IAppointmentsRepo
    {
        public Task<IEnumerable<Appointment>> GetAll();
    }
}
