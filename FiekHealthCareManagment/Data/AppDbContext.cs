using FiekHealthCareManagment.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FiekHealthCareManagment.Data
{
    public class AppDbContext :IdentityDbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<Medicine> Medicines { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Therapy> Therapies { get; set; }
        public DbSet<MedicalReport> Type { get; set; }
        public DbSet<Anamnesis> Anamneses { get; set; }
        public DbSet<ApplicationUser> Users { get; set; }
    }
}