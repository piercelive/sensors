var addPointToChart = function (reading) {
    var series = $(chartPrefix + reading.SensorId).highcharts().series[0];
    series.addPoint([(new Date()).getTime(), reading.Value], true, (series.data.length >= numPointsOnChart));
};
var addColorsAndReading = function (reading) {
    var levelClass;
    if (reading.Value < low) {
        levelClass = lowClass;
    } else if (reading.Value < medium) {
        levelClass = mediumClass;
    } else {
        levelClass = highClass;
    }
    $(containerPrefix + reading.SensorId).attr('class', cardClass + ' ' + levelClass);
    $(readingPrefix + reading.SensorId).attr('class', levelClass).text(Highcharts.numberFormat(reading.Value * 100, 2) + '%');
};

var handleReading = function (data) {
    //received a reading, add to chart and update readings and colors
    if (monitoredSensors.indexOf(data.SensorId) >= 0) {
        addPointToChart(data);
        addColorsAndReading(data);
    }
}

var readingsService = {
    handleReading: handleReading
};