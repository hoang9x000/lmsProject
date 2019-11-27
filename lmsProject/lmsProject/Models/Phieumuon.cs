using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lmsProject.Models
{
    public partial class Phieumuon
    {
        [StringLength(10)]
        public string Mathe { get; set; }
        [StringLength(10)]
        public string Masach { get; set; }
        [Column(TypeName = "date")]
        public DateTime Ngaymuon { get; set; }
        [Column(TypeName = "date")]
        public DateTime Ngayhethan { get; set; }
        public bool Giahan { get; set; }
        public bool Datra { get; set; }

        [ForeignKey("Masach")]
        [InverseProperty("Phieumuon")]
        public Sach MasachNavigation { get; set; }
        [ForeignKey("Mathe")]
        [InverseProperty("Phieumuon")]
        public User MatheNavigation { get; set; }
    }
}
