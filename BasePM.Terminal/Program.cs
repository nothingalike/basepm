using Microsoft.Extensions.DependencyInjection;
using Spectre.Console;
using Spectre.Console.Cli;

var registrations = new ServiceCollection();
//registrations.AddSingleton<IGreeter, HelloWorldGreeter>();

// Create a type registrar and register any dependencies.
// A type registrar is an adapter for a DI framework.
//var registrar = new TypeRegistrar(registrations);

// Create a new command app with the registrar
// and run it with the provided arguments.
var app = new CommandApp();
app.Configure(config =>
{
    config.AddBranch("userstory", sub => {
        sub.AddCommand<AddCommand>("add");
    });
});
return app.Run(args);

public class AddCommand : Command<AddCommand.Settings>
{
    public class Settings : CommandSettings
    {

    }


    public override int Execute(CommandContext context, Settings settings)
    {
        var asA = AnsiConsole.Ask<string>("As a?: ");
        var iWant = AnsiConsole.Ask<string>("I want?: ");
        var soThat = AnsiConsole.Ask<string>("So that?: ");

        // output the story in yellow. concat the strings with a space between them
        AnsiConsole.MarkupLine($"[yellow]As a[/] {asA}, [yellow]I want[/] {iWant}, [yellow]So that[/] {soThat}");
        
        // capture acceptance criteria in the following manner:
        // What user interaction is required?
        var userInteraction = AnsiConsole.Ask<string>("What user interaction is required?: ");
        // what api interaction is required?
        var apiInteraction = AnsiConsole.Ask<string>("What api interaction is required?: ");
        // What validation is required?
        var validation = AnsiConsole.Ask<string>("What validation is required?: ");
        // What error handling is required?
        var errorHandling = AnsiConsole.Ask<string>("What error handling is required?: ");
        // What edge cases are there?
        var edgeCases = AnsiConsole.Ask<string>("What edge cases are there?: ");

        // output the acceptance criteria in yellow. concat the strings with new lines between them
        AnsiConsole.MarkupLine($"[yellow]What user interaction is required?[/] {userInteraction}\n" +
                                $"[yellow]What api interaction is required?[/] {apiInteraction}\n" +
                               $"[yellow]What validation is required?[/] {validation}\n" +
                               $"[yellow]What error handling is required?[/] {errorHandling}\n" +
                               $"[yellow]What edge cases are there?[/] {edgeCases}");

        // create user story object
        var userStory = new UserStory
        {
            AsA = asA,
            IWant = iWant,
            SoThat = soThat,
            UserInteraction = userInteraction,
            ApiInteraction = apiInteraction,
            Validation = validation,
            ErrorHandling = errorHandling,
            EdgeCases = edgeCases
        };

        // output the user story in markdown format
        // Two parts: Summary and Acceptance Criteria
        AnsiConsole.MarkupLine($"## **Summary**\n" +
                               $"As a {userStory.AsA}, I want {userStory.IWant}, so that {userStory.SoThat}\n\n" +
                               $"## **Acceptance Criteria**\n" +
                               $"**What user interaction is required?** \n{userStory.UserInteraction}\n\n" +
                                $"**What api interaction is required?** \n{userStory.ApiInteraction}\n\n" +
                               $"**What validation is required?** \n{userStory.Validation}\n\n" +
                               $"**What error handling is required?** \n{userStory.ErrorHandling}\n\n" +
                               $"**What edge cases are there?** \n{userStory.EdgeCases}");
        
        return 0;
    }
}

public class UserStory
{
    public string? AsA { get; set; }
    public string? IWant { get; set; }
    public string? SoThat { get; set; }
    public string? UserInteraction { get; set; }
    public string? ApiInteraction { get; set; }
    public string? Validation { get; set; }
    public string? ErrorHandling { get; set; }
    public string? EdgeCases { get; set; }
}