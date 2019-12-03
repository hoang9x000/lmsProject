using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using lmsProject.Models;
using Microsoft.AspNetCore.Authorization;

namespace lmsProject.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SachController : ControllerBase
    {
        private readonly lmsContext _context;

        public SachController(lmsContext context)
        {
            _context = context;
        }

        // GET: api/Sach
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sach>>> GetSach()
        {
            return await _context.Sach.ToListAsync();
        }

        // GET: api/Sach/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Sach>> GetSach(string id)
        {
            var sach = await _context.Sach.FindAsync(id);

            if (sach == null)
            {
                return NotFound();
            }

            return sach;
        }

        // PUT: api/Sach/5
        [Authorize(Roles =Role.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSach(string id, Sach sach)
        {
            if (id != sach.Masach)
            {
                return BadRequest();
            }

            _context.Entry(sach).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SachExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sach
        [Authorize(Roles = Role.Admin)]
        [HttpPost]
        public async Task<ActionResult<Sach>> PostSach(Sach sach)
        {
            sach.Tinhtrangsach = true;
            _context.Sach.Add(sach);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SachExists(sach.Masach))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSach", new { id = sach.Masach }, sach);
        }

        // DELETE: api/Sach/5
        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sach>> DeleteSach(string id)
        {
            var sach = await _context.Sach.FindAsync(id);
            if (sach == null)
            {
                return NotFound();
            }

            _context.Sach.Remove(sach);
            await _context.SaveChangesAsync();

            return sach;
        }

        private bool SachExists(string id)
        {
            return _context.Sach.Any(e => e.Masach == id);
        }
    }
}
