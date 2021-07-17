namespace FiekHealthCareManagment.Models
{
    public class MedicalReport : BaseEntity
    {
        public string ReportName { get; set; }
        public string PatientId { get; set; }
        public Patient Patient { get; set; }
        public Therapy Therapy { get; set; }
        public Anamnesis Anamnesis { get; set; }
    }
}