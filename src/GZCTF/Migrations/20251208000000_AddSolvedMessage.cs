using GZCTF.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GZCTF.Migrations
{
    /// <inheritdoc />
    // Attributes placed here (instead of a separate .Designer.cs) so the migration
    // is discovered and applied at runtime by Database.MigrateAsync().
    [DbContext(typeof(AppDbContext))]
    [Migration("20251208000000_AddSolvedMessage")]
    public partial class AddSolvedMessage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SolvedMessage",
                table: "GameChallenges",
                type: "character varying(4096)",
                maxLength: 4096,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SolvedMessage",
                table: "GameChallenges");
        }
    }
}
