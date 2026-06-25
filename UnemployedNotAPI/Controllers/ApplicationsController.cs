using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UnemployedNotAPI.Data;
using UnemployedNotAPI.Models;

namespace UnemployedNotAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ApplicationsController(AppDbContext db) { _db = db; }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _db.Applications.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var app = await _db.Applications.FindAsync(id);
            return app == null ? NotFound() : Ok(app);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUser(int userId)
        {
            var apps = await _db.Applications.Where(a => a.UserId == userId).ToListAsync();
            return Ok(apps);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Application application)
        {
            _db.Applications.Add(application);
            await _db.SaveChangesAsync();
            return Ok(application);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Application updated)
        {
            var app = await _db.Applications.FindAsync(id);
            if (app == null) return NotFound();

            app.CoverLetter = updated.CoverLetter;
            app.Status = updated.Status;

            await _db.SaveChangesAsync();
            return Ok(app);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var app = await _db.Applications.FindAsync(id);
            if (app == null) return NotFound();
            _db.Applications.Remove(app);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Deleted" });
        }
    }
}