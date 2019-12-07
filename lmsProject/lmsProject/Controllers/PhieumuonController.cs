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
    public class PhieumuonController : ControllerBase
    {
        private readonly lmsContext _context;

        public PhieumuonController(lmsContext context)
        {
            _context = context;
        }

        // GET: api/Phieumuon
        [Authorize(Roles = Role.Admin)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Phieumuon>>> GetPhieumuon()
        {
            var result = _context.Phieumuon.Select(p => new
            {
                p.Mathe,
                p.Masach,
                p.Ngaymuon,
                p.Ngayhethan,
                p.Giahan,
                p.Datra,
                p.MatheNavigation.Hoten,
                p.MasachNavigation.ManhomsachNavigation.Tensach
            });
            return Ok(result);

            //return await _context.Phieumuon.ToListAsync();
        }

        // GET: api/Phieumuon/102160243/1
        [HttpGet("{mathe}/{masach}")]
        public async Task<ActionResult<Phieumuon>> GetPhieumuon(string mathe,string masach)
        {
            var currentUserID = User.Identity.Name;
            if (mathe != currentUserID && !User.IsInRole(Role.Admin))
                return Forbid();
            var phieumuon = await _context.Phieumuon.FindAsync(mathe,masach);

            if (phieumuon == null)
            {
                return NotFound();
            }
            var result = _context.Phieumuon.Select(p => new
            {
                p.Mathe,
                p.Masach,
                p.Ngaymuon,
                p.Ngayhethan,
                p.Giahan,
                p.Datra,
                p.MatheNavigation.Hoten,
                p.MasachNavigation.ManhomsachNavigation.Tensach
            })
                .Where(w => w.Mathe == phieumuon.Mathe && w.Masach == phieumuon.Masach);
            return Ok(result);

            //return phieumuon;
        }

        // GET: api/Phieumuon/102160243
        [HttpGet("{mathe}")]
        public async Task<ActionResult<Phieumuon>> GetPhieumuon(string mathe)
        {
            var currentUserID = User.Identity.Name;
            if (mathe != currentUserID && !User.IsInRole(Role.Admin))
                return Forbid();
            var user = await _context.User.FindAsync(mathe);

            if (user == null)
            {
                return NotFound();
            }
            var result = _context.User.Select(u => new
            {
                u.Mathe,
                u.Hoten,
                Phieumuon = from p in _context.Phieumuon
                            where p.Mathe == u.Mathe
                            select new
                            {
                                p.Mathe,
                                p.Masach,
                                p.Ngaymuon,
                                p.Ngayhethan,
                                p.Giahan,
                                p.Datra,
                                p.MasachNavigation.ManhomsachNavigation.Tensach
                            }
            })
                .Where(w => w.Mathe == mathe);
            return Ok(result);

            //return phieumuon;
        }

        // PUT: api/Phieumuon/5
        [Authorize(Roles = Role.Admin)]
        [HttpPut("{mathe}/{masach}")]
        public async Task<IActionResult> PutPhieumuon(string mathe,string masach, Phieumuon phieumuon)
        {
            if (mathe != phieumuon.Mathe)
            {
                return BadRequest();
            }
            if (masach != phieumuon.Masach)
            {
                return BadRequest();
            }
            var _phieumuonCu = await _context.Phieumuon.FindAsync(mathe,masach);
            phieumuon.Ngayhethan = _phieumuonCu.Ngayhethan;
            phieumuon.Ngaymuon = _phieumuonCu.Ngaymuon;
            //neu gia han = true => tang ngay het han len
            if(_phieumuonCu.Giahan == false)
            {
                if (phieumuon.Giahan == true)
                {
                    var _sach = await _context.Sach.FindAsync(phieumuon.Masach);
                    var _nhomsach = await _context.Nhomsach.FindAsync(_sach.Manhomsach);
                    var _theloai = await _context.Theloai.FindAsync(_nhomsach.Matheloai);
                    phieumuon.Ngayhethan = _phieumuonCu.Ngayhethan.AddDays(_theloai.Songaymuontoida);
                }
                else
                {
                    phieumuon.Ngayhethan = _phieumuonCu.Ngayhethan;
                }
            }
           
            //neu tra sach = true thi damuon=true, soluongcon++ va sinh ra phieu muon(hoa don) va xoa di phieu muon
            if(_phieumuonCu.Datra == false)
            {
                if (phieumuon.Datra == true)
                {
                    var _sach = await _context.Sach.FindAsync(phieumuon.Masach);
                    var _nhomsach = await _context.Nhomsach.FindAsync(_sach.Manhomsach);
                    var _theloai = await _context.Theloai.FindAsync(_nhomsach.Matheloai);
                    //
                    _nhomsach.Soluongcon++;
                    _sach.Damuon = false;
                    //nen remove di ko?
                }
            }
            _context.Entry(_phieumuonCu).State = EntityState.Detached;
            _context.Entry(phieumuon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhieumuonExists(mathe, masach))
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

        // POST: api/Phieumuon
        [Authorize(Roles = Role.Admin)]
        [HttpPost]
        public async Task<ActionResult<Phieumuon>> PostPhieumuon(Phieumuon phieumuon)
        {
            //
            phieumuon.Ngaymuon = DateTime.UtcNow;
            var _sach = await _context.Sach.FindAsync(phieumuon.Masach);
            var _nhomsach = await _context.Nhomsach.FindAsync(_sach.Manhomsach);
            var _theloai = await _context.Theloai.FindAsync(_nhomsach.Matheloai);
            phieumuon.Ngayhethan = phieumuon.Ngaymuon.AddDays(_theloai.Songaymuontoida);
            phieumuon.Giahan = false;
            phieumuon.Datra = false;
            //
            if(_sach.Damuon == true || _sach.Tinhtrangsach == false)
            {
                return BadRequest();
            }
            //chuyen sach.Damuon = true  va tru so luong con cua nhomsach -1 
            _sach.Damuon = true;
            _nhomsach.Soluongcon--;

            _context.Phieumuon.Add(phieumuon);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PhieumuonExists(phieumuon.Mathe,phieumuon.Masach))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPhieumuon", new { id = phieumuon.Mathe }, phieumuon);
        }

        // DELETE: api/Phieumuon/5
        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{mathe}/{masach}")]
        public async Task<ActionResult<Phieumuon>> DeletePhieumuon(string mathe, string masach)
        {
            var phieumuon = await _context.Phieumuon.FindAsync(mathe, masach);
            if (phieumuon == null)
            {
                return NotFound();
            }

            _context.Phieumuon.Remove(phieumuon);
            await _context.SaveChangesAsync();

            return phieumuon;
        }

        private bool PhieumuonExists(string mathe,string masach)
        {
            return _context.Phieumuon.Any(e => e.Mathe == mathe && e.Masach == masach);
        }
    }
}
