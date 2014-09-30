using Sensors.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Sensors.Data
{
    public class SensorsContext: DbContext
    {
        public SensorsContext()
            : base("SensorsContext")
        {
        }
        
        public DbSet<Sensor> Sensors { get; set; }
    }
}