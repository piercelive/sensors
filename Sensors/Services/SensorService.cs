using Sensors.Data;
using Sensors.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sensors.Services
{
    public class SensorService : ISensorService
    {
        public Sensor GetSensor(int Id)
        {
            using (var db = new SensorsContext())
            {
                return db.Sensors.FirstOrDefault(s => s.ID == Id);
            }
        }
        public List<Sensor> GetSensors()
        {
            using (var db = new SensorsContext())
            {
                return db.Sensors.ToList();
            }
        }
    }
}