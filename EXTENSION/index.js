const app = document.getElementById('content');

window.onload = main

function main() {
    getData()
    .then((json)=>{
        setupHTMLContent(json)
    })
    .catch((error)=>{
        console.log(error)
    })
}

// HTML generation

function setupHTMLContent(jsonArray) {
    const contentElement = document.getElementById("content")
    for (const index in jsonArray) {
        contentElement.add(generateCardItem(jsonArray[index]))
    }
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

function getData() {
    return extractJSON(fetch("https://jsonplaceholder.typicode.com/todos"))
}

function extractJSON(promise) {
    return new Promise((resolve,reject)=>{
      promise
      .then((response)=>{
        resolve(response.json())
      })
      .catch((error)=>{
        reject(error)
      })
    })
  }