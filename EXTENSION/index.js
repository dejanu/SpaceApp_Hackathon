const app = document.getElementById('accordion');

window.onload = main

function main() {
    getUrl("https://launchlibrary.net/1.4/launch/next/5?mode=verbose").then((response)=>{
        setupHTMLContent(response.launches)
    }).catch((error)=>{
        console.log(error)
    })
}

// HTML generation
function setupHTMLContent(launches) {
    var currentTime = (new Date).getTime()
    launches.forEach(function(launch) {
        launch.eta = Math.round((Date.parse(launch.windowstart) - currentTime)/(1000*60*60*24))
        createDiv(launch)
//        var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${launch.location.pads[0].latitude}&lon=${launch.location.pads[0].longitude}&appid=6f594b427c2a97614343c56c6486d3b1`
//        getUrl(weatherUrl).then((response)=>{
//            launch.weather = response
//            createDiv(launch)
//        }).catch((error)=>{
//            console.log(error)
//            createDiv(launch)
//        })
    })
}

function createDiv(launch) {
    var element = `collapse${launch.id}`
  	var div = document.createElement("div")
    div.className = "card"
    div.innerHTML = `
        <div class="card-header display:inline-block" id=${launch.id}>
            <a class="btn btn-link collapsed" data-toggle="collapse" data-target="#${element}" aria-expanded="false" aria-controls=${element}>
                ${launch.missions[0].name} in ${launch.eta} days
            </a>
        </div>
        <div id=${element} class="collapse" aria-labelledby=${launch.id} data-parent="#accordion">
            <div class="card-body">
                ${launch.vidURLs[0] ? `<a href=${launch.vidURLs[0]} target="_blank">Live feed</a>` : ""}
                <div class="launch-description">${launch.missions[0].description}</div>
            </div>
        </div>
        `
    app.appendChild(div)
}

// ES6 Requests
function getUrl(url) {
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then((response)=>{
            resolve(response.json())
        })
        .catch((error)=>{
            reject(error)
        })
    })
}
