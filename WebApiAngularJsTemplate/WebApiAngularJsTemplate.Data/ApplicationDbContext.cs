using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using WebApiAngularJsTemplate.Data.Migrations;

namespace WebApiAngularJsTemplate.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, Role, int, UserLogin, UserRole, UserClaim>
    {
        public ApplicationDbContext() : base("DefaultConnection")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, Configuration>());
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}