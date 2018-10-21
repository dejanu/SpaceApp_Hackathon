console.log("ss");
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
    let msg = {
        txt : "helloooo"
    }
   chrome.tabs.sendMessage(tab.id,msg);
}