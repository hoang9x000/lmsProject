using lmsProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace lmsProject.Services
{
    public interface IUserService
    {
        User Authenticate(string mathe, string password);
        IEnumerable<User> GetAll();
        User GetById(string id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(string id);
    }
    public class UserService : IUserService
    {
        private lmsContext _context;
        public UserService(lmsContext context)
        {
            _context = context;
        }
        public User Authenticate(string mathe, string password)
        {
            if (string.IsNullOrEmpty(mathe) || string.IsNullOrEmpty(password))
                return null;
            var user = _context.User.SingleOrDefault(x => x.Mathe == mathe);

            if (user == null)
            return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;
            return user;
        }

        public User Create(User user, string password)
        {
            //validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password không được để trống");
            if (_context.User.Any(x => x.Mathe == user.Mathe))
                throw new AppException("Mathe \"" + user.Mathe + "\" đã tồn tại");
            //
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            //
            if (user.Role == null) user.Role = Role.User;
            //
            if(user.Ngayhethan < user.Ngaydangki)
                throw new AppException("Lỗi: Ngày đăng kí trước ngày hết hạn");

            //
            _context.User.Add(user);
            _context.SaveChanges();

            return user;
        }

        public void Delete(string id)
        {
            var user = _context.User.Find(id);
            if (user != null)
            {
                _context.User.Remove(user);
                _context.SaveChanges();
            }
            //throw new NotImplementedException();
        }

        public IEnumerable<User> GetAll()
        {
            return _context.User;
            //throw new NotImplementedException();
        }

        public User GetById(string id)
        {
            return _context.User.Find(id);
            //throw new NotImplementedException();
        }

        public void Update(User userParam, string password = null)
        {
            var user = _context.User.Find(userParam.Mathe);

            if (user == null)
                throw new AppException("Không tìm thấy User");

            if(userParam.Mathe != user.Mathe)
            {
                if (_context.User.Any(x => x.Mathe == userParam.Mathe))
                    throw new AppException("Username " + userParam.Mathe + " is already taken");
            }
            //update user properties
            if(userParam.Ngaydangki < userParam.Ngayhethan)
            {
                user.Hoten = userParam.Hoten;
                user.Gioitinh = userParam.Gioitinh;
                user.Diachi = userParam.Diachi;
                user.Ngaysinh = userParam.Ngaysinh;
                user.Ngaydangki = userParam.Ngaydangki;
                user.Ngayhethan = userParam.Ngayhethan;
                //user.IsAdmin = userParam.IsAdmin;
                //test thu 
                user.Role = userParam.Role;
            }
            else
            {
                throw new AppException("Lỗi: Ngày đăng kí trước ngày hết hạn");
            }

           

            //update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }
            _context.User.Update(user);
            _context.SaveChanges();
            //throw new NotImplementedException();
        }
        //
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Password không được rỗng hoặc khoảng trắng.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Password không được rỗng hoặc khoảng trắng.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}
