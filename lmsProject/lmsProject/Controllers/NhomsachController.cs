﻿using System;
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
    public class NhomsachController : ControllerBase
    {
        private readonly lmsContext _context;

        public NhomsachController(lmsContext context)
        {
            _context = context;
        }

        // GET: api/Nhomsach
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Nhomsach>>> GetNhomsach()
        {
            var result = _context.Nhomsach.Select(n => new
            {
                n.Manhomsach,
                n.Matheloai,
                n.Magiasach,
                n.MatheloaiNavigation.Tentheloai,
                n.Tensach,
                n.Tacgia,
                n.Giatien,
                n.Soluong,
                n.Soluongcon,
                n.AnhPath,
                Sach = from s in _context.Sach
                       where s.Manhomsach == n.Manhomsach
                       select new
                       {
                           s.Masach,
                           s.Manhomsach,
                           s.Damuon,
                           s.Tinhtrangsach
                       }
            });
            return Ok(result);
        }

        // GET: api/Nhomsach/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Nhomsach>> GetNhomsach(string id)
        {
            var nhomsach = await _context.Nhomsach.FindAsync(id);

            if (nhomsach == null)
            {
                return NotFound();
            }
            //
            var result = _context.Nhomsach.Select(n => new
            {
                n.Manhomsach,
                n.Matheloai,
                n.Magiasach,
                n.MatheloaiNavigation.Tentheloai,
                n.Tensach,
                n.Tacgia,
                n.Giatien,
                n.Soluong,
                n.Soluongcon,
                n.AnhPath,
                Sach = from s in _context.Sach
                       where s.Manhomsach == n.Manhomsach
                       select new
                       {
                           s.Masach,
                           s.Manhomsach,
                           s.Damuon,
                           s.Tinhtrangsach
                       }
            }).Where(w => w.Manhomsach == nhomsach.Manhomsach);

            return Ok(result);


            //return nhomsach;
        }

        // PUT: api/Nhomsach/5
        [Authorize(Roles = Role.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNhomsach(string id, Nhomsach nhomsach)
        {
            if (id != nhomsach.Manhomsach)
            {
                return BadRequest();
            }
            if (nhomsach.Soluong < nhomsach.Soluongcon)
                return BadRequest();
            //tang so luong sach cua nhom sach (nhomsach.soluong)
            var nhomsachCu = await _context.Nhomsach.FindAsync(nhomsach.Manhomsach);
            if(nhomsach.Soluong > nhomsachCu.Soluong)
            {
                var j = nhomsach.Soluong;
                for (int i = nhomsachCu.Soluong; i < j; i++)
                {
                    if (_context.Sach.Any(e => e.Masach == (nhomsach.Manhomsach + i)))
                    {
                        j++;
                        continue;
                        
                    }
                        
                    Sach _sach = new Sach();
                    _sach.Masach = (string)nhomsach.Manhomsach + i;
                    _sach.Manhomsach = nhomsach.Manhomsach;
                    _sach.Tinhtrangsach = true;
                    _context.Sach.Add(_sach);

                }
                nhomsach.Soluongcon = nhomsachCu.Soluongcon + (nhomsach.Soluong - nhomsachCu.Soluong);
            }

            _context.Entry(nhomsachCu).State = EntityState.Detached;
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
        [Authorize(Roles = Role.Admin)]
        [HttpPost]
        public async Task<ActionResult<Nhomsach>> PostNhomsach(Nhomsach nhomsach)
        {
            nhomsach.Soluongcon = nhomsach.Soluong;
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
            for(int i=0; i < nhomsach.Soluong; i++)
            {
                Sach _sach = new Sach();
                _sach.Masach = (string)nhomsach.Manhomsach + i;
                _sach.Manhomsach = nhomsach.Manhomsach;
                _sach.Tinhtrangsach = true;
                _context.Sach.Add(_sach);

            }
            await _context.SaveChangesAsync();

            return Ok();
            //return CreatedAtAction("GetNhomsach", new { id = nhomsach.Manhomsach }, nhomsach);
        }

        // DELETE: api/Nhomsach/5
        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Nhomsach>> DeleteNhomsach(string id)
        {
            var nhomsach = await _context.Nhomsach.FindAsync(id);
            if (nhomsach == null)
            {
                return NotFound();
            }
            foreach(Sach item in nhomsach.Sach)
            {
                _context.Sach.Remove(item);
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
