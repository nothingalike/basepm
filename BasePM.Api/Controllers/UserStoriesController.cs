using BasePM.Data;
using LinqToDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BasePM.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserStoriesController : ControllerBase
{
    private readonly BasePMDataConnection _db;

    public UserStoriesController(BasePMDataConnection db)
    {
        _db = db;
    }

    [HttpGet]
    [ProducesResponseType<List<UserStory>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> Get()
    {
        var userStories = await _db.UserStories.ToListAsync();
        return Ok(userStories);
    }

    [HttpGet("{id}")]
    [ProducesResponseType<UserStory>(StatusCodes.Status200OK)]
    public async Task<IActionResult> Get(int id)
    {
        var userStory = await _db.UserStories.FirstOrDefaultAsync(x => x.Id == id);
        if (userStory == null)
        {
            return NotFound();
        }
        return Ok(userStory);
    }

    [HttpPost]
    [ProducesResponseType<UserStory>(StatusCodes.Status200OK)]
    public async Task<IActionResult> Post(UserStory userStory)
    {
        userStory.Id = _db.InsertWithInt32Identity(userStory);
        //var us = await _db.UserStories.SingleOrDefaultAsync(x => x.Id == userStory.Id)
        return Ok(userStory);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Put(int id, UserStory userStory)
    {
        if (id != userStory.Id)
        {
            return BadRequest();
        }
        await _db.UpdateAsync(userStory);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Delete(int id)
    {
        var userStory = await _db.UserStories.FirstOrDefaultAsync(x => x.Id == id);
        if (userStory == null)
        {
            return NotFound();
        }
        await _db.DeleteAsync(userStory);
        return NoContent();
    }
}
