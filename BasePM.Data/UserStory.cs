using LinqToDB.Mapping;
using System.Text.Json.Serialization;

namespace BasePM.Data;

[Table("userstories")]
public class UserStory
{
    [Column("id"), PrimaryKey, Identity]
    public int Id { get; set; }

    [Column("title")]
    public string? Title { get; set; }

    [Column("asa")]
    [JsonPropertyName("asA")]
    public string? AsA { get; set; }

    [Column("iwant")]
    [JsonPropertyName("iWant")]
    public string? IWant { get; set; }

    [Column("sothat")]
    [JsonPropertyName("soThat")]
    public string? SoThat { get; set; }

    [Column("userinteraction")]
    [JsonPropertyName("userInteractions")]
    public string? UserInteraction { get; set; }

    [Column("apiinteraction")]
    [JsonPropertyName("apiInteractions")]
    public string? ApiInteraction { get; set; }

    [Column("validation")]
    [JsonPropertyName("validation")]
    public string? Validation { get; set; }
    [Column("errorhandling")]
    [JsonPropertyName("errorHandling")]
    public string? ErrorHandling { get; set; }
    [Column("edgecases")]
    [JsonPropertyName("edgeCases")]
    public string? EdgeCases { get; set; }
}
