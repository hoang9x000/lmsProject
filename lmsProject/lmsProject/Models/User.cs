﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lmsProject.Models
{
    public partial class User
    {
        public User()
        {
            Dattruoc = new HashSet<Dattruoc>();
            Luotmuon = new HashSet<Luotmuon>();
            Phieumuon = new HashSet<Phieumuon>();
        }

        [Key]
        [StringLength(10)]
        public string Mathe { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        [Required]
        [StringLength(100)]
        public string Hoten { get; set; }
        public bool? Gioitinh { get; set; }
        [Column(TypeName = "date")]
        public DateTime? Ngaysinh { get; set; }
        [StringLength(100)]
        public string Diachi { get; set; }
        [Column(TypeName = "date")]
        public DateTime Ngaydangki { get; set; }
        [Column(TypeName = "date")]
        public DateTime Ngayhethan { get; set; }
        [Required]
        public string Role { get; set; }
        //so sach toi da duoc muon la 7
        public int Sosachdamuon { get; set; }

        [InverseProperty("MatheNavigation")]
        public virtual ICollection<Dattruoc> Dattruoc { get; set; }
        [InverseProperty("MatheNavigation")]
        public virtual ICollection<Luotmuon> Luotmuon { get; set; }
        [InverseProperty("MatheNavigation")]
        public virtual ICollection<Phieumuon> Phieumuon { get; set; }
    }
}
