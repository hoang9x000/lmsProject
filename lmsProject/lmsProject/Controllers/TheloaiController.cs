﻿using System;
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
    public class TheloaiController : ControllerBase
    {
        private readonly lmsContext _context;

        public TheloaiController(lmsContext context)
        {
            _context = context;
        }

        // GET: api/Theloai
        [HttpGet]
        public IEnumerable<Theloai> GetTheloai()
        {
            return _context.Theloai;
        }

        // GET: api/Theloai/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTheloai([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var theloai = await _context.Theloai.FindAsync(id);

            if (theloai == null)
            {
                return NotFound();
            }

            return Ok(theloai);
        }

        // PUT: api/Theloai/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTheloai([FromRoute] string id, [FromBody] Theloai theloai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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
        [HttpPost]
        public async Task<IActionResult> PostTheloai([FromBody] Theloai theloai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Theloai.Add(theloai);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TheloaiExists(theloai.Matheloai))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTheloai", new { id = theloai.Matheloai }, theloai);
        }

        // DELETE: api/Theloai/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTheloai([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var theloai = await _context.Theloai.FindAsync(id);
            if (theloai == null)
            {
                return NotFound();
            }

            _context.Theloai.Remove(theloai);
            await _context.SaveChangesAsync();

            return Ok(theloai);
        }

        private bool TheloaiExists(string id)
        {
            return _context.Theloai.Any(e => e.Matheloai == id);
        }
    }
}