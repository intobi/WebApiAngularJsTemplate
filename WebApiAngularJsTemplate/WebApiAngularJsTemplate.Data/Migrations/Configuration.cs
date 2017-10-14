using System.Data.Entity.Migrations;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace WebApiAngularJsTemplate.Data.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            var manager = new UserManager<ApplicationUser, int>(new UserStore(context));
            
            var roleManager = new RoleManager<Role, int>(new RoleStore(context));

            var user = new ApplicationUser()
            {
                UserName = "Admin",
                Email = "admin@admin.com",
                EmailConfirmed = true,
            };

            manager.Create(user, "qwerty");

            if (!roleManager.Roles.Any())
            {
                roleManager.Create(new Role { Name = "Admin"});
                roleManager.Create(new Role { Name = "User"});
            }

            var adminUser = manager.FindByName("Admin");

            manager.AddToRole(adminUser.Id, "Admin");
        }
    }
}
