// if(location.protocol != 'https:'){
//   location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
// }


getPosition();

function findCityWeather(lat, lng) {
    var clientID = 'RVOHazZHTR2oXOKXl46cF';
    var clientSec = 'iOUgwnACeghVFqgnJISoTpHK9XI65o31oddSgXtt';

    $.ajax({
        url: 'https://api.aerisapi.com/batch/?p=' + lat + ',' + lng + '&requests=observations%3Ffields=ob.icon,ob.precipIN,ob.humidity,ob.windMPH,ob.windKPH,ob.weatherShort,ob.tempF,ob.tempC,/places%3Ffields=place.name,place.state&client_id=' + clientID + '&client_secret=' + clientSec,


        success: function(data) {
            var locW = data.response.responses[0].response.ob;
            var loc = data.response.responses[1].response.place;

            var cityState = loc.name + ', ' + loc.state;
            $('#location').html(cityState);

            if (locW.windMPH != null) {
                $('#wind').show();
            };
            getIcon(locW.icon);

            var tempC = Math.round(locW.tempC) + '<span>&deg;</span>';
            var tempF = locW.tempF + '<span>&deg;</span>';

            $('#temp').html(locW.tempF + '<span>&deg;</span>');
            $('#humidity').append(locW.humidity + '%');
            $('#precipitation').append(locW.precipIN + '%');
            $('#condition').append(locW.weatherShort.toUpperCase());
            $('#wind').append(locW.windMPH + 'MPH');

            $('#please').change(function() {
                $('#please').prop('checked') ? $('#temp').html(tempC) : $('#temp').html(tempF);
            });

        },
        error: function() {
            console.log('error');
        },
        complete: function() {
            $('.loading').toggle();
            $('#switcher').css('display', 'flex').show(0);
            $('#weather_box').show(0).delay(100).css('opacity', '100');

        },
    });
}

function getPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            findCityWeather(lat, lng);
        });
    }
}



























function getIcon(value) {

    for (var key in icons) {
        var array = icons[key];
        var parameter = value.split('').slice(0, -4).join('');
        for (var i = 0; i < array.length; i++) {
            if (array[i] === parameter) {

                $('#icon').html("<img class='icon' src=" + array[0] + '>');

                console.log(array[0])
            }
        }

    }

}





























var icons = {
    clearday: ['https://kuuv.io/i/wWhmIRA.png', 'clear', 'sunny'],
    clearnight: ['https://kuuv.io/i/6eSOcmx.png', 'clearn', 'sunnyn'],
    cloudsday: ['https://kuuv.io/i/q35E2eB.png', 'am_pcloudy', 'cloudy', 'mcloudy', 'pcloudy', 'pm_cloudy', 'cloudyw', 'mcloudyw', 'fair', 'fairw'],
    cloudsnight: ['https://kuuv.io/i/47WtoBh.png', 'cloudyn', 'mcloudyn', 'pcloudyn', 'cloudywn', 'mcloudywn', 'pcloudywn', 'fairn', 'fairwn'],
    fog: ['https://kuuv.io/i/G3LHlzK.png', 'dust', 'fog', 'fogn'],
    haze: ['https://kuuv.io/i/YKl1i6f.png', 'hazy', 'hazyn'],
    rainsnow: ['https://kuuv.io/i/FmtskI1.png', 'freezingrain', 'freezingrainn', 'rainandsnow', 'rainandsnown', 'raintosnow', 'raintosnown', 'sleet', 'sleetn', 'sleetsnow', 'snowtorain', 'snowtorainn', 'wintrymix', 'wintrymixn'],
    rainyday: ['https://kuuv.io/i/P330x4r.png', 'am_pcloudyrain', 'rain', 'rainw', 'mcloudyr', 'mcloudyrw', 'pcloudyr', 'pcloudyrw', 'pm_cloudyr', 'drizzle', 'drizzlef', 'fdrizzle'],
    rainynight: ['https://kuuv.io/i/JDLQxsA.png', 'mcloudyrn', 'mcloudyrwn', 'pcloudyrn', 'pcloudyrwn', 'rainn', 'drizzlen', 'fdrizzlen'],
    showers: ['https://kuuv.io/i/MMir4N4.png', 'am_showers', 'pm_showers', 'showers', 'showersw', 'showersn'],
    snowweather: ['https://kuuv.io/i/9NppUIe.png', 'am_snowshowers', 'blizzard', 'blizzardn', 'blowingsnow', 'blowingsnown', 'flurries', 'flurriesn', 'flurriesw', 'flurrieswn', 'pm_snowshowers', 'snow', 'snown', 'snowshowers', 'snowshowersn', 'snowshowersw', 'snowshowerswn', 'snoww', 'snowwn'],
    ssd: ['https://kuuv.io/i/SDgV9eH.png', 'mcloudys', 'mcloudysfw', 'mcloudysw', 'pcloudys', 'pcloudysf', 'pcloudysfw', 'pcloudysw'],
    ssn: ['https://kuuv.io/i/jg7xlCI.png', 'mcloudysfn', 'mcloudysfwn', 'mcloudysn', 'pcloudysn', 'pcloudysfn', 'pcloudysfwn', 'pcloudyswn', 'mcloudyswn'],
    thunderweather: ['https://kuuv.io/i/dMumRZw.png', 'am_tstorm', 'chancetstorm', 'mcloudyt', 'mcloudytw', 'pcloudyt', 'pcloudytw', 'pm_tstorm', 'tstorm', 'tstormsw', 'tstormw', 'chancetstorm', 'mcloudytn', 'mcloudytwn', 'pcloudytn', 'pcloudytwn', 'tstormn', 'tstormswn', 'tstormwn'],
    unknown: ['http://kuuv.io/i/MXApCRe.png', 'na'],
    windyday: ['http://kuuv.io/i/IJ2oicP.png', 'clearw', 'sunnyw', 'pcloudyw', 'wind'],
    windynight: ['http://kuuv.io/i/uJG9Y28.png', 'sunnywn', 'clearwn'],

};