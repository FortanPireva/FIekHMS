using System;

namespace FiekHealthCareManagment.Models
{
    public class Patient : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public DateTime BirthDay { get; set; }
        public int YearOfBirth { get; set; }
    }
}