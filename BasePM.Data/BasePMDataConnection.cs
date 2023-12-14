using LinqToDB;
using LinqToDB.Data;

namespace BasePM.Data;
public class BasePMDataConnection(DataOptions<BasePMDataConnection> options) : DataConnection(options.Options)
{
    public ITable<UserStory> UserStories => this.GetTable<UserStory>();
}
