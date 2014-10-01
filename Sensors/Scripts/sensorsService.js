var getSensorsService = function () {
    var createChart = function (sensor) {
        highchartsOptions.title.text = sensor.Name;
        highchartsOptions.subtitle.text = sensor.Description;
        $(chartPrefix + sensor.ID).highcharts(highchartsOptions);
    };
    var addSensor = function (sensor) {
        $.get(sensorTemplateUrl, function (template) {
            var rendered = Mustache.render(template, sensor);
            $(sensorsRegion).append(rendered);
            createChart(sensor);
        });
    }

    return {
        addSensor: addSensor
    }
}