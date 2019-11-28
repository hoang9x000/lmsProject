using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using lmsProject.Models;

namespace lmsProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhomsachController : ControllerBase
    {
        private readonly lmsContext _context;

        public NhomsachController(lmsContext context)
        {
            _context = context;
        }

        // GET: api/Nhomsach
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Nhomsach>>> GetNhomsach()
        {
            return await _context.Nhomsach.ToListAsync();
        }

        // GET: api/Nhomsach/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Nhomsach>> GetNhomsach(string id)
        {
            var nhomsach = await _context.Nhomsach.FindAsync(id);

            if (nhomsach == null)
            {
                return NotFound();
            }

            return nhomsach;
        }

        // PUT: api/Nhomsach/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNhomsach(string id, Nhomsach nhomsach)
        {
            if (id != nhomsach.Manhomsach)
            {
                return BadRequest();
            }

            _context.Entry(nhomsach).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhomsachExists(id))
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

        // POST: api/Nhomsach
        [HttpPost]
        public async Task<ActionResult<Nhomsach>> PostNhomsach(Nhomsach nhomsach)
        {
            _context.Nhomsach.Add(nhomsach);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (NhomsachExists(nhomsach.Manhomsach))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetNhomsach", new { id = nhomsach.Manhomsach }, nhomsach);
        }

        // DELETE: api/Nhomsach/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Nhomsach>> DeleteNhomsach(string id)
        {
            var nhomsach = await _context.Nhomsach.FindAsync(id);
            if (nhomsach == null)
            {
                return NotFound();
            }

            _context.Nhomsach.Remove(nhomsach);
            await _context.SaveChangesAsync();

            return nhomsach;
        }

        private bool NhomsachExists(string id)
        {
            return _context.Nhomsach.Any(e => e.Manhomsach == id);
        }
    }
}
