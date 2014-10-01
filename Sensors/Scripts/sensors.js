$(function () {
    //Highcharts global options
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    var sensorsService = getSensorsService();
    var readingsService = getReadingsService();
    //get all the sensors from the database, then establish signalr connection
    $.get(sensorsApiUrl,
        function (sensors) {
            $(loader).hide();
            //add html for each sensor
            $.each(sensors, function (i, sensor) {
                if (sensor.IsMonitored) {
                    monitoredSensors.push(sensor.ID);
                    sensorsService.addSensor(sensor);
                }
            });
            //setup signalr connection
            var readings = $.connection(connectionUrl);
            readings.received(readingsService.handleReading);
            readings.start();
        }
    );
});