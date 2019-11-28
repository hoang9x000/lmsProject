using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace lmsProject.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Theloai",
                columns: table => new
                {
                    Matheloai = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
                    Tentheloai = table.Column<string>(maxLength: 100, nullable: false),
                    Songaymuontoida = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Theloai", x => x.Matheloai);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Mathe = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
                    Matkhau = table.Column<string>(unicode: false, maxLength: 16, nullable: false),
                    Hoten = table.Column<string>(maxLength: 100, nullable: false),
                    Gioitinh = table.Column<bool>(nullable: true),
                    Ngaysinh = table.Column<DateTime>(type: "date", nullable: true),
                    Diachi = table.Column<string>(maxLength: 100, nullable: true),
                    Ngaydangki = table.Column<DateTime>(type: "date", nullable: false),
                    Ngayhethan = table.Column<DateTime>(type: "date", nullable: false),
                    isAdmin = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Mathe);
                });

            migrationBuilder.CreateTable(
                name: "Nhomsach",
                columns: table => new
                {
                    Manhomsach = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
                    Matheloai = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
                    Soluong = table.Column<int>(nullable: false),
                    Soluongcon = table.Column<int>(nullable: false),
                    Tensach = table.Column<string>(maxLength: 100, nullable: false),
                    Giatien = table.Column<double>(nullable: false),
                    Anhbia = table.Column<byte[]>(type: "image", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nhomsach", x => x.Manhomsach);
                    table.ForeignKey(
                        name: "FK_Nhomsach_Theloai",
                        column: x => x.Matheloai,
                        principalTable: "Theloai",
                        principalColumn: "Matheloai",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sach",
                columns: table => new
                {
                    Masach = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
                    Manhomsach = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
                    Magiasach = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
                    Damuon = table.Column<bool>(nullable: false),
                    Tinhtrangsach = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sach", x => x.Masach);
                    table.ForeignKey(
                        name: "FK_Sach_Nhomsach",
                        column: x => x.Manhomsach,
                        principalTable: "Nhomsach",
                        principalColumn: "Manhomsach",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Dattruoc",
                columns: table => new
                {
                    Mathe = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
                    Masach = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
                    Ngaydattruoc = table.Column<DateTime>(type: "date", nullable: false),
                    Danhan = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dattruoc", x => new { x.Mathe, x.Masach });
                    table.ForeignKey(
                        name: "FK_Dattruoc_Sach",
                        column: x => x.Masach,
                        principalTable: "Sach",
                        principalColumn: "Masach",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Dattruoc_User",
                        column: x => x.Mathe,
                        principalTable: "User",
                        principalColumn: "Mathe",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Luotmuon",
                columns: table => new
                {
                    Mathe = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
                    Masach = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
                    Ngaytra = table.Column<DateTime>(type: "date", nullable: false),
                    Ngaymuon = table.Column<DateTime>(type: "date", nullable: false),
                    Ngayhethan = table.Column<DateTime>(type: "date", nullable: false),
                    Tinhtrangsachluctra = table.Column<bool>(nullable: false),
                    Tienphat = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Luotmuon", x => new { x.Mathe, x.Masach });
                    table.ForeignKey(
                        name: "FK_Luotmuon_Sach",
                        column: x => x.Masach,
                        principalTable: "Sach",
                        principalColumn: "Masach",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Luotmuon_User",
                        column: x => x.Mathe,
                        principalTable: "User",
                        principalColumn: "Mathe",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Phieumuon",
                columns: table => new
                {
                    Mathe = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
                    Masach = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
                    Ngaymuon = table.Column<DateTime>(type: "date", nullable: false),
                    Ngayhethan = table.Column<DateTime>(type: "date", nullable: false),
                    Giahan = table.Column<bool>(nullable: false),
                    Datra = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Phieumuon", x => new { x.Mathe, x.Masach });
                    table.ForeignKey(
                        name: "FK_Phieumuon_Sach",
                        column: x => x.Masach,
                        principalTable: "Sach",
                        principalColumn: "Masach",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Phieumuon_User",
                        column: x => x.Mathe,
                        principalTable: "User",
                        principalColumn: "Mathe",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dattruoc_Masach",
                table: "Dattruoc",
                column: "Masach");

            migrationBuilder.CreateIndex(
                name: "IX_Luotmuon_Masach",
                table: "Luotmuon",
                column: "Masach");

            migrationBuilder.CreateIndex(
                name: "IX_Nhomsach_Matheloai",
                table: "Nhomsach",
                column: "Matheloai");

            migrationBuilder.CreateIndex(
                name: "IX_Phieumuon_Masach",
                table: "Phieumuon",
                column: "Masach");

            migrationBuilder.CreateIndex(
                name: "IX_Sach_Manhomsach",
                table: "Sach",
                column: "Manhomsach");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dattruoc");

            migrationBuilder.DropTable(
                name: "Luotmuon");

            migrationBuilder.DropTable(
                name: "Phieumuon");

            migrationBuilder.DropTable(
                name: "Sach");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Nhomsach");

            migrationBuilder.DropTable(
                name: "Theloai");
        }
    }
}
