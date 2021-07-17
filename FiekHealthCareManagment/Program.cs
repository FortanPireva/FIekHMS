using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace FiekHealthCareManagment
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((context, config) =>
                {
                    // ONLY if the app is in production
                    if (!context.HostingEnvironment.IsDevelopment())
                    {
                        // Load AWS Secrets after all config steps
                        config.AddSecretsManager(configurator: ops =>
                        {
                            ops.KeyGenerator = (secret, name) => name.Replace("__", ":");
                        }); 
                    }
                    else
                    {
                        config.AddUserSecrets<Program>();
                    }
                    
                })
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}