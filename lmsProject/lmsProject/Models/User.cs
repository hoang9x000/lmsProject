using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace lmsProject.Models
{
    public class User
    {
        [Key]
        public string Mathe { get; set; }
        public string Matkhau { get; set; }
        public string Hoten { get; set; }
        public Boolean Gioitinh { get; set; }
        public DateTime Ngaysinh { get; set; }
        public string Diachi { get; set; }
        public DateTime Ngaydangki { get; set; }
        public DateTime Ngayhethan { get; set; }
        public Boolean isAdmin { get; set; }
    }
}
