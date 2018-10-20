chrome.runtime.onInstalled.addListener(()=> {
  // On install
  console.log("lol")
});

window.onload = ()=>{
  console.log("onload" + Date())
}