using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Shared;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Portal
{
   [Route("api/[controller]")]
   [ApiController]
   public class LoginController : ControllerBase
   {
      private readonly IHttpClientFactory _httpClientFactory;
      private readonly IdentityServerSettings _identityServerSettings;

      public LoginController(IHttpClientFactory httpClientFactory, IOptions<IdentityServerSettings> identityServerOptions)
      {
         _httpClientFactory = httpClientFactory;
         _identityServerSettings = identityServerOptions.Value;
      }

      [HttpPost]
      public async Task<object> Post([FromForm] string username, [FromForm] string password)
      {
         if (username != "guest" || password != "dotnetify")
            return Unauthorized();

         using (var client = _httpClientFactory.CreateClient())
         {
            var tokenResponse = await IdentityServerClient.RequestClientCredentialsTokenAsync(client, _identityServerSettings);
            return new
            {
               access_token = tokenResponse.AccessToken,
               expires_in = tokenResponse.ExpiresIn
            };
         }
      }

      [HttpPost]
      [Route("[action]")]
      public async Task<IActionResult> Validate([FromForm]string token)
      {
         using (var client = _httpClientFactory.CreateClient())
         {
            var response = await IdentityServerClient.IntrospectTokenAsync(client, _identityServerSettings, token);
            if (response.IsError)
               throw new Exception(response.Error);

            return response.IsActive ? new OkResult() : (IActionResult)Unauthorized();
         }
      }
   }
}