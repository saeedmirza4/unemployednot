using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UnemployedNotAPI.Data;
using UnemployedNotAPI.Models;

namespace UnemployedNotAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public JobsController(AppDbContext db) { _db = db; }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _db.Jobs.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var job = await _db.Jobs.FindAsync(id);
            return job == null ? NotFound() : Ok(job);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Job job)
        {
            _db.Jobs.Add(job);
            await _db.SaveChangesAsync();
            return Ok(job);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Job updated)
        {
            var job = await _db.Jobs.FindAsync(id);
            if (job == null) return NotFound();

            job.Title = updated.Title;
            job.Company = updated.Company;
            job.Location = updated.Location;
            job.Category = updated.Category;
            job.Description = updated.Description;
            job.Salary = updated.Salary;

            await _db.SaveChangesAsync();
            return Ok(job);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var job = await _db.Jobs.FindAsync(id);
            if (job == null) return NotFound();
            _db.Jobs.Remove(job);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Deleted" });
        }
    }
}