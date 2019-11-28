using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lmsProject.Models
{
    public partial class Theloai
    {
        public Theloai()
        {
            Nhomsach = new HashSet<Nhomsach>();
        }

        [Key]
        [StringLength(10)]
        public string Matheloai { get; set; }
        [Required]
        [StringLength(100)]
        public string Tentheloai { get; set; }
        public int Songaymuontoida { get; set; }

        [InverseProperty("MatheloaiNavigation")]
        public virtual ICollection<Nhomsach> Nhomsach { get; set; }
    }
}
