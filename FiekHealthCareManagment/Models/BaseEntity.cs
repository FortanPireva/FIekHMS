using System;
using System.ComponentModel.DataAnnotations;

namespace FiekHealthCareManagment.Models
{
    public class BaseEntity
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public string InsertedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}