using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;

namespace SchoolHeath.Controllers
{
    public class AuthController : Controller
    {
        [HttpGet("google-login")]
        public IActionResult GoogleLogin([FromQuery] string returnUrl)
        {
            // returnUrl là địa chỉ frontend, ví dụ: http://localhost:3000
            var properties = new AuthenticationProperties { RedirectUri = returnUrl ?? "/" };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }
    }
} 