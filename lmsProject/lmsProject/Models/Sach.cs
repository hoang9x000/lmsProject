using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lmsProject.Models
{
    public partial class Sach
    {
        public Sach()
        {
            Dattruoc = new HashSet<Dattruoc>();
            Luotmuon = new HashSet<Luotmuon>();
            Phieumuon = new HashSet<Phieumuon>();
        }

        [Key]
        [StringLength(10)]
        public string Masach { get; set; }
        [Required]
        [StringLength(10)]
        public string Manhomsach { get; set; }
        [Required]
        [StringLength(10)]
        public string Magiasach { get; set; }
        public bool Damuon { get; set; }
        public bool Tinhtrangsach { get; set; }

        [ForeignKey("Manhomsach")]
        [InverseProperty("Sach")]
        public Nhomsach ManhomsachNavigation { get; set; }
        [InverseProperty("MasachNavigation")]
        public ICollection<Dattruoc> Dattruoc { get; set; }
        [InverseProperty("MasachNavigation")]
        public ICollection<Luotmuon> Luotmuon { get; set; }
        [InverseProperty("MasachNavigation")]
        public ICollection<Phieumuon> Phieumuon { get; set; }
    }
}
