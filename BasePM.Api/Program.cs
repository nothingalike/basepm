using LinqToDB.AspNet;
using BasePM.Data;
using LinqToDB;

namespace BasePM.Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services
          .AddLinqToDBContext<BasePMDataConnection>((provider, options)
            => options
              .UsePostgreSQL(builder.Configuration["Connections:Default"] ?? ""));

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors(policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

        //app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetService<BasePMDataConnection>();
            if (db is not null)
            {
                var sp = db.DataProvider.GetSchemaProvider();
                var dbSchema = sp.GetSchema(db);
                if (!dbSchema.Tables.Any(t => t.TableName == "userstories"))
                {
                    db.CreateTable<UserStory>();
                }
            }
        }

        app.Run();
    }
}
