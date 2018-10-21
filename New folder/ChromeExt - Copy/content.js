const url = 'http://localhost:4000/';

function getPosts(){
    
    return fetch(url).then(res=>res.json()).then(posts=>{
    console.log(posts["raspuns"])   
})  
}
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(request,sender, sendResponse){
getPosts();
}