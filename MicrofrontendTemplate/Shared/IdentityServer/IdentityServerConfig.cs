using System.Collections.Generic;
using IdentityServer4.Models;

namespace Shared
{
   public class IdentityServerConfig
   {
      public static readonly string MyClientId = "dotNetifyDemo";
      public static readonly string MyClientSecret = "secret";
      public static readonly string MyApiResource = "demo";

      public static IEnumerable<Client> GetClients()
      {
         return new List<Client>
            {
                new Client
                {
                    ClientId = MyClientId,
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = { new Secret(MyClientSecret.Sha256()) },
                    AllowedScopes = { MyApiResource }
                }
            };
      }

      public static IEnumerable<ApiResource> GetApiResources()
      {
         return new List<ApiResource>
         {
            new ApiResource(MyApiResource, "DotNetify Demo") { ApiSecrets = { new Secret(MyClientSecret.Sha256()) } }
         };
      }
   }
}