using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FiekHealthCareManagment.Migrations
{
    public partial class thirdmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Patients",
                newName: "Address");

            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDay",
                table: "Patients",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "YearOfBirth",
                table: "Patients",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthDay",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "YearOfBirth",
                table: "Patients");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Patients",
                newName: "Email");
        }
    }
}
