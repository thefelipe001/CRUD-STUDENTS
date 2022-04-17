using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WebStudentCore.Models
{
    public class Student
    {
        [Key]
        public int StudentID { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public string Semester { get; set; }
        public Nullable<int> Age { get; set; }
        public Nullable<int> Fees { get; set; }
    }
}
