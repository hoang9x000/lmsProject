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
    public class LuotmuonController : ControllerBase
    {
        private readonly lmsContext _context;

        public LuotmuonController(lmsContext context)
        {
            _context = context;
        }

        // GET: api/Luotmuon
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Luotmuon>>> GetLuotmuon()
        {
            return await _context.Luotmuon.ToListAsync();
        }

        // GET: api/Luotmuon/5
        [HttpGet("{mathe}/{masach}")]
        public async Task<ActionResult<Luotmuon>> GetLuotmuon(string mathe, string masach)
        {
            var luotmuon = await _context.Luotmuon.FindAsync(mathe, masach);

            if (luotmuon == null)
            {
                return NotFound();
            }

            return luotmuon;
        }

        // PUT: api/Luotmuon/5
        [HttpPut("{mathe}/{masach}")]
        public async Task<IActionResult> PutLuotmuon(string mathe, string masach, Luotmuon luotmuon)
        {
            if (mathe != luotmuon.Mathe)
            {
                return BadRequest();
            }
            if (masach != luotmuon.Masach)
            {
                return BadRequest();
            }
            //

            _context.Entry(luotmuon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LuotmuonExists(mathe,masach))
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

        // POST: api/Luotmuon
        [HttpPost]
        public async Task<ActionResult<Luotmuon>> PostLuotmuon(Luotmuon luotmuon)
        {
            //
            luotmuon.Ngaytra = DateTime.Now;
            var _phieumuon = await _context.Phieumuon.FindAsync(luotmuon.Mathe, luotmuon.Masach);
            luotmuon.Ngaymuon = _phieumuon.Ngaymuon;
            luotmuon.Ngayhethan = _phieumuon.Ngayhethan;
            //
            var _sach = await _context.Sach.FindAsync(_phieumuon.Masach);
            var _nhomsach = await _context.Nhomsach.FindAsync(_sach.Manhomsach);
            //tien phat = songayquahan*5000 hoac tienphat= giatien*3;
            if (luotmuon.Tinhtrangsachluctra == false)
            {
                _sach.Tinhtrangsach = false;
                if (luotmuon.Ngaytra > luotmuon.Ngayhethan)
                {
                    TimeSpan _time = luotmuon.Ngaytra - luotmuon.Ngayhethan;
                    int songayquahan = _time.Days;
                    luotmuon.Tienphat = 5000 * songayquahan + _nhomsach.Giatien * 3;
                }
                else
                {
                    TimeSpan _time = luotmuon.Ngaytra - luotmuon.Ngayhethan;
                    int songayquahan = _time.Days;
                    luotmuon.Tienphat = _nhomsach.Giatien * 3;
                }
            }
            else
            {
                if (luotmuon.Ngaytra > luotmuon.Ngayhethan)
                {
                    TimeSpan _time = luotmuon.Ngaytra - luotmuon.Ngayhethan;
                    int songayquahan = _time.Days;
                    luotmuon.Tienphat = 5000 * songayquahan;
                }
            }

            _context.Luotmuon.Add(luotmuon);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LuotmuonExists(luotmuon.Mathe,luotmuon.Masach))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLuotmuon", new { id = luotmuon.Mathe }, luotmuon);
        }

        // DELETE: api/Luotmuon/5
        [HttpDelete("{mathe}/{masach}")]
        public async Task<ActionResult<Luotmuon>> DeleteLuotmuon(string mathe, string masach)
        {
            var luotmuon = await _context.Luotmuon.FindAsync(mathe,masach);
            if (luotmuon == null)
            {
                return NotFound();
            }

            _context.Luotmuon.Remove(luotmuon);
            await _context.SaveChangesAsync();

            return luotmuon;
        }

        private bool LuotmuonExists(string mathe, string masach)
        {
            return _context.Luotmuon.Any(e => e.Mathe == mathe && e.Masach == masach);
        }
    }
}
