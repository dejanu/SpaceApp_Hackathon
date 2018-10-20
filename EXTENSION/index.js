const app = document.getElementById('carousel-inner');

window.onload = main

function main() {
    getUrl("https://launchlibrary.net/1.4/launch/next/5?mode=verbose")
    .then((response)=>{
        setupHTMLContent(response.launches)
    })
    .catch((error)=>{
        console.log(error)
    })
}

// HTML generation

function setupHTMLContent(launches) {
    launches.forEach(function(launch, index) {
        createDiv(launch, index === 0)
    })
//	var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${launch.location.pads[0].latitude}&lon=${launch.location.pads[0].longitude}&appid=6f594b427c2a97614343c56c6486d3b1`
//	getUrl(weatherUrl)
//	.then((response)=>{
//   		launch.weather = response
//    	})
//    	.catch((error)=>{
//        	console.log(error)
//		createDiv(launch)
//    	})
//    })
}

function createDiv(launch, isActive) {
	var div = document.createElement("div")
    div.className = isActive ? "carousel-item active" : "carousel-item"
    div.innerHTML = `
        <div class="launch-name">${launch.name}</div>
        <div class="launch-windowstart">${launch.windowstart}</div>
        <div class="launch-vid">${launch.vidURLs[0] || []}</div>
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
