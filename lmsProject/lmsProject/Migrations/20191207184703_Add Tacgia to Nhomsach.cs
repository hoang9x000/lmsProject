using Microsoft.EntityFrameworkCore.Migrations;

namespace lmsProject.Migrations
{
    public partial class AddTacgiatoNhomsach : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Tacgia",
                table: "Nhomsach",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tacgia",
                table: "Nhomsach");
        }
    }
}
