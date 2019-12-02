using Microsoft.EntityFrameworkCore.Migrations;

namespace lmsProject.Migrations
{
    public partial class AddRoleNotNull : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "User",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "User",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
