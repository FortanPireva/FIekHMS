namespace FiekHealthCareManagment.Models
{
    public class Anamnesis : BaseEntity
    {
        public int MaxTension { get; set; }
        public int MinTension { get; set; }
        public double Pulse { get; set; }
        public double Spo2 { get; set; }
    }
}