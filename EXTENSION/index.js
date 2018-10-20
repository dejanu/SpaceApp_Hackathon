const app = document.getElementById('content');

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
    const contentElement = document.getElementById("content")
    launches.forEach(function(launch) {
	var div = document.createElement("div")
        div.innerHTML = launch.name
	contentElement.appendChild(div)
    })
}

// {/* <div class="card border-primary mb-3" style="max-width: 18rem;">
//       <div class="card-header">Header</div>
//       <div class="card-body text-primary">
//         <h5 class="card-title">Primary card title</h5>
//         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//       </div> */}

function generateCardItem(item) {
    console.log(item)
    const divElement = document.createElement("div")
    return divElement
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
