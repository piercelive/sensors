using Sensors.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sensors.Services
{
    public interface ISensorService
    {
        Sensor GetSensor(int Id);
        List<Sensor> GetSensors();
    }
}
