using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace lmsProject.DTO
{
    public class UserDto
    {
        public string Mathe { get; set; }
        public string Password { get; set; }
        public string Hoten { get; set; }
        public bool? Gioitinh { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public string Diachi { get; set; }
        public DateTime Ngaydangki { get; set; }
        public DateTime Ngayhethan { get; set; }
        public string Role { get; set; }
        public int Sosachdamuon { get; set; }
    }
}
