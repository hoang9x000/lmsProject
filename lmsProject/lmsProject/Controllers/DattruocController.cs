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
    public class DattruocController : ControllerBase
    {
        private readonly lmsContext _context;

        public DattruocController(lmsContext context)
        {
            _context = context;
        }

        // GET: api/Dattruoc
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dattruoc>>> GetDattruoc()
        {
            return await _context.Dattruoc.ToListAsync();
        }

        // GET: api/Dattruoc/5
        [HttpGet("{mathe}/{masach}")]
        public async Task<ActionResult<Dattruoc>> GetDattruoc(string mathe, string masach)
        {
            var dattruoc = await _context.Dattruoc.FindAsync(mathe, masach);

            if (dattruoc == null)
            {
                return NotFound();
            }

            return dattruoc;
        }

        // PUT: api/Dattruoc/5
        [HttpPut("{mathe}/{masach}")]
        public async Task<IActionResult> PutDattruoc(string mathe, string masach, Dattruoc dattruoc)
        {
            if (mathe != dattruoc.Mathe)
            {
                return BadRequest();
            }
            if (masach != dattruoc.Masach)
            {
                return BadRequest();
            }
            // neu da nhan thi tao ra phieu muon
            //if(dattruoc.Danhan == true)
            //{
            //    //tao phieu muon?
            //}

            _context.Entry(dattruoc).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DattruocExists(mathe,masach))
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

        // POST: api/Dattruoc
        [HttpPost]
        public async Task<ActionResult<Dattruoc>> PostDattruoc(Dattruoc dattruoc)
        {
            dattruoc.Ngaydattruoc = DateTime.Now;
     
            var _sach = await _context.Sach.FindAsync(dattruoc.Masach);
            var _nhomsach = await _context.Nhomsach.FindAsync(_sach.Manhomsach);
            _nhomsach.Soluongcon--;
            _context.Dattruoc.Add(dattruoc);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DattruocExists(dattruoc.Mathe, dattruoc.Masach))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDattruoc", new { id = dattruoc.Mathe }, dattruoc);
        }

        // DELETE: api/Dattruoc/5
        [HttpDelete("{mathe}/{masach}")]
        public async Task<ActionResult<Dattruoc>> DeleteDattruoc(string mathe, string masach)
        {
            var dattruoc = await _context.Dattruoc.FindAsync(mathe, masach);
            if (dattruoc == null)
            {
                return NotFound();
            }

            _context.Dattruoc.Remove(dattruoc);
            await _context.SaveChangesAsync();

            return dattruoc;
        }

        private bool DattruocExists(string mathe, string masach)
        {
            return _context.Dattruoc.Any(e => e.Mathe == mathe && e.Masach == masach);
        }
    }
}
