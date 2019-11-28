using IdentityModel;
using IdentityModel.Client;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Shared
{
   public class IdentityServerClient
   {
      public static async Task<TokenResponse> RequestClientCredentialsTokenAsync(HttpClient client, IdentityServerSettings settings)
      {
         var disco = await client.GetDiscoveryDocumentAsync(settings.Uri);
         return await client.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest
         {
            Address = disco.TokenEndpoint,
            ClientId = IdentityServerConfig.MyClientId,
            ClientSecret = IdentityServerConfig.MyClientSecret,
            Scope = IdentityServerConfig.MyApiResource
         });
      }

      public static async Task<IntrospectionResponse> IntrospectTokenAsync(HttpClient client, IdentityServerSettings settings, string token)
      {
         var disco = await client.GetDiscoveryDocumentAsync(settings.Uri);
         return await client.IntrospectTokenAsync(new TokenIntrospectionRequest
         {
            Address = disco.IntrospectionEndpoint,
            Token = token,
            ClientId = IdentityServerConfig.MyApiResource,
            ClientSecret = IdentityServerConfig.MyClientSecret
         });
      }

      public static async Task<IEnumerable<SecurityKey>> GetIssuerSigningKeysAsync(HttpClient client, IdentityServerSettings settings)
      {
         var disco = await client.GetDiscoveryDocumentAsync(settings.Uri);
         if(disco?.KeySet == null)
            throw new Exception("Failed to get signing keys. Make sure the Portal is running.");

         var keys = new List<SecurityKey>();
         foreach(var webKey in disco.KeySet.Keys)
         {
            var key = new RsaSecurityKey(new RSAParameters
            {
               Exponent = Base64Url.Decode(webKey.E),
               Modulus = Base64Url.Decode(webKey.N)
            });

            key.KeyId = webKey.Kid;
            keys.Add(key);
         }

         return keys;
      }
   }
}