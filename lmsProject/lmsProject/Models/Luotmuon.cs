using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lmsProject.Models
{
    public partial class Luotmuon
    {
        [StringLength(10)]
        public string Mathe { get; set; }
        [StringLength(10)]
        public string Masach { get; set; }
        [Column(TypeName = "date")]
        public DateTime Ngaytra { get; set; }
        [Column(TypeName = "date")]
        public DateTime Ngaymuon { get; set; }
        [Column(TypeName = "date")]
        public DateTime Ngayhethan { get; set; }
        public bool Tinhtrangsachluctra { get; set; }
        public double Tienphat { get; set; }

        [ForeignKey("Masach")]
        [InverseProperty("Luotmuon")]
        public Sach MasachNavigation { get; set; }
        [ForeignKey("Mathe")]
        [InverseProperty("Luotmuon")]
        public User MatheNavigation { get; set; }
    }
}
