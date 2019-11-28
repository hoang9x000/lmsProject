using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lmsProject.Models
{
    public partial class Dattruoc
    {
        [StringLength(10)]
        public string Mathe { get; set; }
        [StringLength(10)]
        public string Masach { get; set; }
        [Column(TypeName = "date")]
        public DateTime Ngaydattruoc { get; set; }
        public bool Danhan { get; set; }

        [ForeignKey("Masach")]
        [InverseProperty("Dattruoc")]
        public virtual Sach MasachNavigation { get; set; }
        [ForeignKey("Mathe")]
        [InverseProperty("Dattruoc")]
        public virtual User MatheNavigation { get; set; }
    }
}
