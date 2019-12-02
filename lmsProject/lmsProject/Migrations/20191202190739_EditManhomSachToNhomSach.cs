using Microsoft.EntityFrameworkCore.Migrations;

namespace lmsProject.Migrations
{
    public partial class EditManhomSachToNhomSach : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Magiasach",
                table: "Sach");

            migrationBuilder.AddColumn<string>(
                name: "Magiasach",
                table: "Nhomsach",
                maxLength: 10,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Magiasach",
                table: "Nhomsach");

            migrationBuilder.AddColumn<string>(
                name: "Magiasach",
                table: "Sach",
                unicode: false,
                maxLength: 10,
                nullable: false,
                defaultValue: "");
        }
    }
}
