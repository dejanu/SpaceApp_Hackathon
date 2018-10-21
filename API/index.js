var express = require('express')
var app = express()
var request = require('request')

var port = 3000
var interval = 15 * 1000
var launches = new Map()

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

setInterval(function() {
    request('https://launchlibrary.net/1.4/launch/next/5?mode=verbose',
    (lErr, lRes, lBody) => {
        if (lErr) { return console.log(lErr); }

        var currentTime = (new Date).getTime()
        JSON.parse(lBody).launches.forEach(function(launch) {
            request(`https://api.openweathermap.org/data/2.5/forecast?lat=${launch.location.pads[0].latitude}&lon=${launch.location.pads[0].longitude}&appid=6f594b427c2a97614343c56c6486d3b1`,
            (wErr, wRes, wBody) => {
                if (wErr) { return console.log(wErr); }

                launch.hoursLeft = Math.round((Date.parse(launch.windowstart) - currentTime)/(1000*60*60))
                launch.forecast = JSON.parse(wBody).list.find(function(entry) {
                    return entry.dt > currentTime
                })
                launches.set(launch.id, launch)
            })
        })
    })
}, interval)

function compare(thisLaunch, otherLaunch) {
    return thisLaunch.hoursLeft > otherLaunch.hoursLeft
}

app.get('/launches', function(req, res){
    res.send({data: Array.from(launches.values()).sort(compare).map(function(entry) {
        return {
            id: entry.id,
            name: entry.name,
            windowstart: entry.windowstart,
            hoursLeft: entry.hoursLeft,
            forecast: entry.forecast,
            vidURLs: entry.vidURLs,
            location: entry.location,
            missions: entry.missions
        }
    })})
})

app.listen(port)
