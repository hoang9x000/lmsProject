using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace lmsProject.Models
{
    public partial class lmsContext : DbContext
    {
        public lmsContext()
        {
        }

        public lmsContext(DbContextOptions<lmsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Dattruoc> Dattruoc { get; set; }
        public virtual DbSet<Luotmuon> Luotmuon { get; set; }
        public virtual DbSet<Nhomsach> Nhomsach { get; set; }
        public virtual DbSet<Phieumuon> Phieumuon { get; set; }
        public virtual DbSet<Sach> Sach { get; set; }
        public virtual DbSet<Theloai> Theloai { get; set; }
        public virtual DbSet<User> User { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=.\\;Database=lmsDB;Trusted_Connection=True;");
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Dattruoc>(entity =>
            {
                entity.HasKey(e => new { e.Mathe, e.Masach });

                entity.Property(e => e.Mathe).IsUnicode(false);

                entity.Property(e => e.Masach).IsUnicode(false);

                entity.HasOne(d => d.MasachNavigation)
                    .WithMany(p => p.Dattruoc)
                    .HasForeignKey(d => d.Masach)
                    .HasConstraintName("FK_Dattruoc_Sach");

                entity.HasOne(d => d.MatheNavigation)
                    .WithMany(p => p.Dattruoc)
                    .HasForeignKey(d => d.Mathe)
                    .HasConstraintName("FK_Dattruoc_User");
            });

            modelBuilder.Entity<Luotmuon>(entity =>
            {
                entity.HasKey(e => new { e.Mathe, e.Masach });

                entity.Property(e => e.Mathe).IsUnicode(false);

                entity.Property(e => e.Masach).IsUnicode(false);

                entity.HasOne(d => d.MasachNavigation)
                    .WithMany(p => p.Luotmuon)
                    .HasForeignKey(d => d.Masach)
                    .HasConstraintName("FK_Luotmuon_Sach");

                entity.HasOne(d => d.MatheNavigation)
                    .WithMany(p => p.Luotmuon)
                    .HasForeignKey(d => d.Mathe)
                    .HasConstraintName("FK_Luotmuon_User");
            });

            modelBuilder.Entity<Nhomsach>(entity =>
            {
                entity.Property(e => e.Manhomsach)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Matheloai).IsUnicode(false);

                entity.HasOne(d => d.MatheloaiNavigation)
                    .WithMany(p => p.Nhomsach)
                    .HasForeignKey(d => d.Matheloai)
                    .HasConstraintName("FK_Nhomsach_Theloai");
            });

            modelBuilder.Entity<Phieumuon>(entity =>
            {
                entity.HasKey(e => new { e.Mathe, e.Masach });

                entity.Property(e => e.Mathe).IsUnicode(false);

                entity.Property(e => e.Masach).IsUnicode(false);

                entity.HasOne(d => d.MasachNavigation)
                    .WithMany(p => p.Phieumuon)
                    .HasForeignKey(d => d.Masach)
                    .HasConstraintName("FK_Phieumuon_Sach");

                entity.HasOne(d => d.MatheNavigation)
                    .WithMany(p => p.Phieumuon)
                    .HasForeignKey(d => d.Mathe)
                    .HasConstraintName("FK_Phieumuon_User");
            });

            modelBuilder.Entity<Sach>(entity =>
            {
                entity.Property(e => e.Masach)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Magiasach).IsUnicode(false);

                entity.Property(e => e.Manhomsach).IsUnicode(false);

                entity.HasOne(d => d.ManhomsachNavigation)
                    .WithMany(p => p.Sach)
                    .HasForeignKey(d => d.Manhomsach)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Sach_Nhomsach");
            });

            modelBuilder.Entity<Theloai>(entity =>
            {
                entity.Property(e => e.Matheloai)
                    .IsUnicode(false)
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Mathe)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Matkhau).IsUnicode(false);
            });
        }
    }
}
