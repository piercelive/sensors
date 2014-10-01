//global variables
var monitoredSensors = [];

//urls
var connectionUrl = 'https://sensorsource.azurewebsites.net/sensor/readings',
    sensorTemplateUrl = '/Scripts/Templates/sensor.html',
    sensorsApiUrl = '/api/sensors';

//config numbers
var numPointsOnChart = 10,
    low = 0.7,
    medium = 0.8;

//classes
var highClass = 'high',
    mediumClass = 'medium',
    lowClass = 'low',
    cardClass = 'card';

//ids and prefixes
var loader = "#loader",
    sensorsRegion = '#sensors',
    chartPrefix = '#chart-',
    containerPrefix = '#container-',
    readingPrefix = '#reading-';

//charting options
var highchartsOptions = {
    chart: {
        type: 'line',
        animation: Highcharts.svg,
        height: 250
    },
    credits: {
        enabled: false
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0.6,
        max: 0.9,
        tickInterval: 0.1
    },
    tooltip: {
        formatter: function () {
            return Highcharts.dateFormat('%H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y * 100, 2) + '%';
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: 'Sensor Reading',
        color: '#012e78 ',
        data: []
    }]
};