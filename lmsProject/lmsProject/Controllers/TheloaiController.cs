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
    public class TheloaiController : ControllerBase
    {
        private readonly lmsContext _context;

        public TheloaiController(lmsContext context)
        {
            _context = context;
        }

        // GET: api/Theloai
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Theloai>>> GetTheloai()
        {
            return await _context.Theloai.ToListAsync();
        }

        // GET: api/Theloai/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Theloai>> GetTheloai(string id)
        {
            var theloai = await _context.Theloai.FindAsync(id);

            if (theloai == null)
            {
                return NotFound();
            }

            return theloai;
        }

        // PUT: api/Theloai/5
        [Authorize(Roles =Role.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTheloai(string id, Theloai theloai)
        {
            if (id != theloai.Matheloai)
            {
                return BadRequest();
            }

            _context.Entry(theloai).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TheloaiExists(id))
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

        // POST: api/Theloai
        [Authorize(Roles = Role.Admin)]
        [HttpPost]
        public async Task<ActionResult<Theloai>> PostTheloai(Theloai theloai)
        {
            _context.Theloai.Add(theloai);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TheloaiExists(theloai.Matheloai))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTheloai", new { id = theloai.Matheloai }, theloai);
        }

        // DELETE: api/Theloai/5
        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Theloai>> DeleteTheloai(string id)
        {
            var theloai = await _context.Theloai.FindAsync(id);
            if (theloai == null)
            {
                return NotFound();
            }

            _context.Theloai.Remove(theloai);
            await _context.SaveChangesAsync();

            return theloai;
        }

        private bool TheloaiExists(string id)
        {
            return _context.Theloai.Any(e => e.Matheloai == id);
        }
    }
}
