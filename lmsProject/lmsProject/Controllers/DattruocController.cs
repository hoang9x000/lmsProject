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
    public class DattruocController : ControllerBase
    {
        private readonly lmsContext _context;

        public DattruocController(lmsContext context)
        {
            _context = context;
        }

        // GET: api/Dattruoc
        [Authorize(Roles =Role.Admin)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dattruoc>>> GetDattruoc()
        {
            var result = _context.Dattruoc.Select(d => new
            {
                d.Mathe,
                d.Masach,
                d.Ngaydattruoc,
                d.Danhan,
                d.MatheNavigation.Hoten,
                d.MasachNavigation.ManhomsachNavigation.Tensach
            });
            return Ok(result);
            //return await _context.Dattruoc.ToListAsync();
        }

        // GET: api/Dattruoc/102160243/10
        [HttpGet("{mathe}/{masach}")]
        public async Task<ActionResult<Dattruoc>> GetDattruoc(string mathe, string masach)
        {
            var dattruoc = await _context.Dattruoc.FindAsync(mathe, masach);

            if (dattruoc == null)
            {
                return NotFound();
            }
            var currentUserID = User.Identity.Name;
            if (mathe != currentUserID && !User.IsInRole(Role.Admin))
                return Forbid();

            var result = _context.Dattruoc.Select(d => new
            {
                d.Mathe,
                d.Masach,
                d.Ngaydattruoc,
                d.Danhan,
                d.MatheNavigation.Hoten,
                d.MasachNavigation.ManhomsachNavigation.Tensach
            })
                .Where(w => w.Mathe == dattruoc.Mathe && w.Masach == dattruoc.Masach);
            return Ok(result);

            //return dattruoc;
        }

        // GET: api/Dattruoc/102160243
        [HttpGet("{mathe}")]
        public async Task<ActionResult<Dattruoc>> GetDattruoc(string mathe)
        {
            var user = await _context.User.FindAsync(mathe);

            if (user == null)
            {
                return NotFound();
            }
            var currentUserID = User.Identity.Name;
            if (mathe != currentUserID && !User.IsInRole(Role.Admin))
                return Forbid();

            var result = _context.User.Select(u => new
            {
                u.Mathe,
                u.Hoten,
                Dattruoc = from d in _context.Dattruoc
                           where u.Mathe == d.Mathe
                           select new
                           {
                               d.Mathe,
                               d.Masach,
                               d.Ngaydattruoc,
                               d.Danhan,
                               d.MasachNavigation.ManhomsachNavigation.Tensach
                           }
            })
                .Where(w => w.Mathe == mathe);
            return Ok(result);

            //return dattruoc;
        }

        // PUT: api/Dattruoc/5
        [Authorize(Roles = Role.Admin)]
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
            var _dattruocCu = await _context.Dattruoc.FindAsync(mathe, masach);
            dattruoc.Ngaydattruoc = _dattruocCu.Ngaydattruoc;
            //neu da nhan thi tao ra phieu muon
            if (dattruoc.Danhan == true)
            {
                var _sach = await _context.Sach.FindAsync(dattruoc.Masach);
                var _nhomsach = await _context.Nhomsach.FindAsync(_sach.Manhomsach);
                var _theloai = await _context.Theloai.FindAsync(_nhomsach.Matheloai);

                _sach.Damuon = true;

                Phieumuon _phieumuon = new Phieumuon();
                _phieumuon.Mathe = dattruoc.Mathe;
                _phieumuon.Masach = dattruoc.Masach;
                _phieumuon.Ngaymuon = dattruoc.Ngaydattruoc;
                _phieumuon.Ngayhethan = _phieumuon.Ngaymuon.AddDays(_theloai.Songaymuontoida);
                _phieumuon.Giahan = false;
                _phieumuon.Datra = false;
                _context.Phieumuon.Add(_phieumuon);
            }
            _context.Entry(_dattruocCu).State = EntityState.Detached;
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
            var currentUserID = User.Identity.Name;
            if (dattruoc.Mathe != currentUserID && !User.IsInRole(Role.Admin))
                return Forbid();
            dattruoc.Ngaydattruoc = DateTime.Now;

            var _user = await _context.User.FindAsync(dattruoc.Mathe);
            var _sach = await _context.Sach.FindAsync(dattruoc.Masach);
            var _nhomsach = await _context.Nhomsach.FindAsync(_sach.Manhomsach);

            if (_sach.Damuon == true || _sach.Tinhtrangsach == false || _user.Sosachdamuon > 6)
            {
                return BadRequest();
            }

            _user.Sosachdamuon++;
            _sach.Damuon = true;
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

            //return CreatedAtAction("GetDattruoc", new { id = dattruoc.Mathe }, dattruoc);
            return Ok();
        }

        // DELETE: api/Dattruoc/5
        [Authorize(Roles =Role.Admin)]
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
