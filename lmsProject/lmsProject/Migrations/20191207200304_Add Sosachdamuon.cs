using Microsoft.EntityFrameworkCore.Migrations;

namespace lmsProject.Migrations
{
    public partial class AddSosachdamuon : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Sosachdamuon",
                table: "User",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sosachdamuon",
                table: "User");
        }
    }
}
