using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lmsProject.Models
{
    public partial class Nhomsach
    {
        public Nhomsach()
        {
            Sach = new HashSet<Sach>();
        }

        [Key]
        [StringLength(10)]
        public string Manhomsach { get; set; }
        [Required]
        [StringLength(10)]
        public string Matheloai { get; set; }
        [Required]
        [StringLength(10)]
        public string Magiasach { get; set; }
        public int Soluong { get; set; }
        public int Soluongcon { get; set; }
        [Required]
        [StringLength(100)]
        public string Tensach { get; set; }
        public double Giatien { get; set; }
        [Column(TypeName = "image")]
        public byte[] Anhbia { get; set; }

        [ForeignKey("Matheloai")]
        [InverseProperty("Nhomsach")]
        public virtual Theloai MatheloaiNavigation { get; set; }
        [InverseProperty("ManhomsachNavigation")]
        public virtual ICollection<Sach> Sach { get; set; }
    }
}
