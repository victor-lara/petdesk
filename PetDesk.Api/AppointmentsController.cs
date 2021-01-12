using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetDesk.Interfaces;
using PetDesk.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace PetDesk.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointmentsRepo repo;

        public AppointmentsController(IAppointmentsRepo appointmentsRepo)
        {
            repo = appointmentsRepo;
        }

        [HttpGet]
        [Route("")]
        public async Task<IEnumerable<Appointment>> GetAll()
        {
            var records = await repo.GetAll();
            return records.OrderBy(x => x.RequestedDateTimeOffset);
        }
    }
}
