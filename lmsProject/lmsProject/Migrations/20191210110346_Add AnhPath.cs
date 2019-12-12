using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace lmsProject.Migrations
{
    public partial class AddAnhPath : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Anhbia",
                table: "Nhomsach");

            migrationBuilder.AddColumn<string>(
                name: "AnhPath",
                table: "Nhomsach",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnhPath",
                table: "Nhomsach");

            migrationBuilder.AddColumn<byte[]>(
                name: "Anhbia",
                table: "Nhomsach",
                type: "image",
                nullable: true);
        }
    }
}
