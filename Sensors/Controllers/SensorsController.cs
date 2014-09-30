using Sensors.Models;
using Sensors.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sensors.Controllers
{
    public class SensorsController : ApiController
    {
        private readonly ISensorService _sensorService;
        public SensorsController(ISensorService sensorService)
        {
            _sensorService = sensorService;
        }
        // GET api/sensors
        public List<Sensor> Get()
        {
            return _sensorService.GetSensors();
        }

        // GET api/sensors/5
        public Sensor Get(int id)
        {
            return _sensorService.GetSensor(id);
        }
    }
}
