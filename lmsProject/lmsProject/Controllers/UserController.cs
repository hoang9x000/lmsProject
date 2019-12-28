using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using lmsProject.DTO;
using lmsProject.Helpers;
using lmsProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using lmsProject.Models;

namespace lmsProject.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UserController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            var user = _userService.Authenticate(userDto.Mathe, userDto.Password);
            if(user == null)
                return BadRequest(new { message = "Username or password is incorrect" });
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Mathe),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return Ok(new
            {
                Mathe = user.Mathe,
                Hoten = user.Hoten,
                Gioitinh = user.Gioitinh,
                Ngaysinh = user.Ngaysinh,
                Diachi = user.Diachi,
                Ngaydangki = user.Ngaydangki,
                Ngayhethan = user.Ngayhethan,
                Sosachdamuon = user.Sosachdamuon,
                //IsAdmin = user.IsAdmin,
                Role = user.Role,
                Token = tokenString
            });
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]UserDto userDto)
        {
            //map dto to entity
            var user = _mapper.Map<User>(userDto);

            try
            {
                //save 
                _userService.Create(user, userDto.Password);
                return Ok();
            }
            catch(AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [Authorize(Roles = Role.Admin)]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            var userDtos = _mapper.Map<IList<UserDto>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var user = _userService.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            //chi co admin moi co the xem ho so cua nguoi khac
            //id = mathe
            var currentUserID = User.Identity.Name;
            if (id != currentUserID && !User.IsInRole(Role.Admin))
                return Forbid();
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody]UserDto userDto)
        {
            //map dto to entity and set id
            var user = _mapper.Map<User>(userDto);
            user.Mathe = id;
            //
            var currentUserID = User.Identity.Name;
            if (id != currentUserID && !User.IsInRole(Role.Admin))
                return Forbid();

            try
            {
                //save
                if (!User.IsInRole(Role.Admin))
                    user.Role = Role.User;
                _userService.Update(user, userDto.Password);
                return Ok();
            }
            catch(AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _userService.Delete(id);
            return Ok();
        }

    }
}