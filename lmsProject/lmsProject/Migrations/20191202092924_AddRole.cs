using Microsoft.EntityFrameworkCore.Migrations;

namespace lmsProject.Migrations
{
    public partial class AddRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isAdmin",
                table: "User");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "User");

            migrationBuilder.AddColumn<bool>(
                name: "isAdmin",
                table: "User",
                nullable: false,
                defaultValue: false);
        }
    }
}
