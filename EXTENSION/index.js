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
        contentElement.append(generateCardItem(jsonArray[index]))
    }
}

function generateCardItem(item) {
    console.log(item)
    const divElement = document.createElement("div")
    divElement.textContent = item.title
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