// Get references to elements
/*var chatBody = document.getElementById('chat-body');
var userInput = document.getElementById('user-input');
var sendBtn = document.getElementById('send-btn');

// Function to add a message to the chat
function appendMessage(text, type) {
  var msg = document.createElement('div'); // create a div for the message
  if(type === 'user') {
    msg.className = 'message user-message'; // user message style
  } else {
    msg.className = 'message bot-message'; // bot message style
  }
  msg.textContent = text; // set the message text
  chatBody.appendChild(msg); // add it to chat body
  //chatBody.scrollTop = chatBody.scrollHeight; // scroll to bottom
}

// Function to send the message to backend
function sendMessage() {
  var text = userInput.value.trim(); // get user input
  if(text === '') return; // if empty, do nothing

  appendMessage(text, 'user'); // show user message
  userInput.value = ''; // clear input box

  appendMessage('🤖 Thinking...', 'bot'); // temporary bot message

  // Send request to backend
  fetch("http://localhost:5000/chat", { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: text }) // send question to backend
  })
  .then(function(response) {
    return response.json(); // convert response to JSON
  })
  .then(function(data) {
    chatBody.lastChild.remove(); // remove "Thinking..." message
    var answer = data.answer || "Sorry, I didn't understand that."; // default message if empty
    appendMessage(answer, 'bot'); // show bot answer
  })
  .catch(function(error) {
    chatBody.lastChild.remove();
    appendMessage("Oops! Something went wrong. Try again.", 'bot');
    console.log(error); // log error in console
  });
}

// Send message when Enter key is pressed
userInput.addEventListener('keypress', function(e) {
  if(e.key === 'Enter') {
    sendMessage();
  }
});

// Send message when button is clicked
sendBtn.addEventListener('click', sendMessage);*/

/*var chatbody=document.getElementById('chat-body');
var userInput=document.getElementById('user-input');
var sendBtn=document.getElementById('send-btn');

userInput.addEventListener('keypress',function(e)
{
  if(e.key==='Enter')
  {
    sendMsg();
  }
});

sendBtn.addEventListener('click',sendMsg);

function sendMsg()
{
  var text=userInput.value.trim();
  if(text==='')
  {
    return;
  }
  appendMessage(text,'user');
  userInput.value = '';

 

  appendMessage('thinking.....','bot');

  fetch("http://localhost:5000/chat",
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: text }) // send question to backend
})

.then(function(response)
{
  return response.json();
})
.then(function(data)
{
  chatbody.lastChild.remove();
  var answer = data.answer || "Sorry, I didn't understand that.";
  chatbody.appendMessage(answer);
})

.catch(function(error)
{
    chatbody.lastChild.remove();
    appendMessage("Oops! Something went wrong. Try again.", 'bot');
    console.log(error); // log error in console

})
  

}

function appendMessage(text,type)
{
  var msg=document.createElement('div');
  if(type === 'user')
  {
    msg.className="message user-message "

  }
  else
  {
    msg.className="message bot-message "

  }

  msg.textContent=text;
  chatbody.appendChild(msg);

 
}*/
var chatBody = document.getElementById('chat-body');
var userInput = document.getElementById('user-input');
var sendBtn = document.getElementById('send-btn');

userInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    sendMsg();
  }
});

sendBtn.addEventListener('click', sendMsg);

function sendMsg() {
  var text = userInput.value.trim();
  if (text === '') return;

  appendMessage(text, 'user');
  userInput.value = '';

 appendMessage('🤖 Thinking...', 'bot');
 
  fetch("http://localhost:5000/chat", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: text })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    chatBody.lastChild.remove();
    var answer = data.answer || "Sorry, I didn't understand that.";
    appendMessage(answer, 'bot');
  })
  .catch(function(e) {
    chatBody.lastChild.remove();
    appendMessage("Oops! Something went wrong. Try again.", 'bot');
    console.log(e);
  });
}

function appendMessage(text, type) {
  var msg = document.createElement('div');
  if (type === 'user') {
    msg.className = "message user-message";
  } else {
    msg.className = "message bot-message";
  }

  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}
