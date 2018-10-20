const app = document.getElementById('content');

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Get request to API endpoint
request.open('GET', 'https://api.github.com/users/dejanu', true);

request.onload = function () {
  // Begin accessing JSON data here

  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    data.forEach(user_name => {
      console.log(user_name.id);
    });
  } else {
    console.log('error');
  }
}


// Send request
request.send();