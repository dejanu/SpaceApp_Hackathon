const app = document.getElementById('accordion');

window.onload = main

function main() {
    getUrl("http://127.0.0.1:3000/launches").then((response)=>{
        response.data.forEach(function(launch) {
            createDiv(launch)
        })
    }).catch((error)=>{
        console.log(error)
    })
}

function createDiv(launch) {
    var element = `collapse${launch.id}`
  	var div = document.createElement("div")
    div.className = "card"
    div.innerHTML = `
        <div class="card-header display:inline-block" id=${launch.id}>
            <a class="btn btn-link collapsed" data-toggle="collapse" data-target="#${element}" aria-expanded="false" aria-controls=${element}>
                ${launch.missions[0].name} in ${launch.hoursLeft} hours
            </a>
        </div>
        <div id=${element} class="collapse" aria-labelledby=${launch.id} data-parent="#accordion">
            <div class="card-body">
                ${launch.vidURLs[0] ? `<a href=${launch.vidURLs[0]} target="_blank">Live feed</a>` : ""} ${(launch.forecast) ? launch.forecast.weather[0].main : ""}
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
