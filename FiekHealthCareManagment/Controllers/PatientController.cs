using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FiekHealthCareManagment.Data;
using FiekHealthCareManagment.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace FiekHealthCareManagment.Controllers
{
    public class PatientController : BaseController
    {
        private readonly AppDbContext _appDbContext;

        public PatientController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost("patients")]
        public async Task<IActionResult> AddPatient([FromBody] Patient patient)
        {
            if (ModelState.IsValid)
            {
                 await _appDbContext.Patients.AddAsync(patient);
                 await _appDbContext.SaveChangesAsync();
                 return Ok();
            }
            return BadRequest();
        }

        [HttpGet("patients/{id}")]
        public async Task<IActionResult> GetPatient(string id)
        {
            var patient = await _appDbContext.Patients.FirstOrDefaultAsync(p => p.Id ==id);

            if (patient is not null)
                return Ok(patient);
            return NotFound();
        }
        
        [HttpPut("patients/{id}")]
        public async Task<IActionResult> UpdatePatient([FromBody] Patient patientUpdated,string id)
        {
            var patient = await _appDbContext.Patients.FirstOrDefaultAsync(p => p.Id ==id);

            if (patient is not null)
            {
                patient.FirstName = patientUpdated.FirstName;
                patient.LastName = patientUpdated.LastName;
                patient.Address = patientUpdated.Address;
                patient.YearOfBirth = patient.YearOfBirth;
                await _appDbContext.SaveChangesAsync();
                return Ok(patient);
            }
            return NotFound();
        }
        [HttpDelete("patients/{id}")]
        public async Task<IActionResult> DeletePatient(string id)
        {
            var patient = await _appDbContext.Patients.FirstOrDefaultAsync(p => p.Id ==id);

            if (patient is not null)
            {
                 _appDbContext.Patients.Remove(patient);
                 await _appDbContext.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }

        [HttpGet("patients")]
        public async Task<IActionResult> GetPatients(int size=10, string search= null)
        {
            List<Patient> patients = new List<Patient>();
            if (search != null)
            {
                patients =  await _appDbContext.Patients.Take(size)
                    .Where(p => (p.FirstName + p.LastName).ToLower().Contains(search.ToLower())).ToListAsync();
            }

            patients = await _appDbContext.Patients.Take(size).ToListAsync();

            return Ok(patients);
        }
    }
}