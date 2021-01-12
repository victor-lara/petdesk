using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using PetDesk.Interfaces;
using PetDesk.Models;
using Newtonsoft.Json;

namespace PetDesk.Data
{
    public class AppointmentsRepo: IAppointmentsRepo
    {
        /// <summary>
        /// Calls PetDesk API and get all the appointments
        /// </summary>
        /// <returns>A collection of appointments</returns>
        public async Task<IEnumerable<Appointment>> GetAll()
        {
            IEnumerable<Appointment> result = null;

            using(var http = new HttpClient())
            {
                //Will use an environment variable, easier to change the values between all dev stages
                //For local debugging, the environment variables are located in \Properties\launchSettings.json
                var response = await http.GetAsync($"{Environment.GetEnvironmentVariable("petdeskApiUrl")}/appointments");
                var responseString = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<IEnumerable<Appointment>>(responseString);
            }

            return result;
        }
    }
}
