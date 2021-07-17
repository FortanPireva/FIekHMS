using System.Collections.Generic;

namespace FiekHealthCareManagment.Models
{
    public class Therapy : BaseEntity
    {
        public string PatientId { get; set; }
        public Patient Patient { get; set; }
        public List<Medicine> Medicine { get; set; }
    }
}