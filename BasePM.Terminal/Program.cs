﻿using BasePM.Data;
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
        sub.AddCommand<CreateCommand>("create");
    });
});
return app.Run(args);

public class CreateCommand : Command<CreateCommand.Settings>
{
    public class Settings : CommandSettings
    {

    }


    public override int Execute(CommandContext context, Settings settings)
    {
        // Display a header: Summary
        AnsiConsole.MarkupLine("[bold underline]Summary[/]");
        var asA = AnsiConsole.Ask<string>("[yellow]As a?:[/] ");
        var iWant = AnsiConsole.Ask<string>("[yellow]I want?:[/] ");
        var soThat = AnsiConsole.Ask<string>("[yellow]So that?:[/] ");
        
        // Display a header: Acceptance Criteria
        AnsiConsole.MarkupLine("[bold underline]Acceptance Criteria[/]");
        // capture acceptance criteria in the following manner:
        // What user interaction is required?
        var userInteraction = AnsiConsole.Ask<string>("[yellow]What user interaction is required?:[/] ");
        // what api interaction is required?
        var apiInteraction = AnsiConsole.Ask<string>("[yellow]What api interaction is required?:[/] ");
        // What validation is required?
        var validation = AnsiConsole.Ask<string>("[yellow]What validation is required?:[/] ");
        // What error handling is required?
        var errorHandling = AnsiConsole.Ask<string>("[yellow]What error handling is required?:[/] ");
        // What edge cases are there?
        var edgeCases = AnsiConsole.Ask<string>("[yellow]What edge cases are there?:[/] ");

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

