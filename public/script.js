
const socket = io();
let mySocketId;

// Get socket ID when connected
socket.on('connect', () => {
  mySocketId = socket.id;
  console.log('Connected with ID:', mySocketId);
});

const input = document.getElementById("messageInput");
const messagesDiv = document.getElementById("messages");

// Send message
function sendMessage() {
  const text = input.value.trim();
  if (text !== "") {
    socket.emit("chat message", { message: text });
    input.value = "";
  }
}

// Receive and display message
socket.on("chat message", (data) => {
  const isMyMessage = data.senderId === mySocketId;
  addMessage(data.message, isMyMessage ? "sent" : "received");
});

// Add to chat
function addMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = `message ${className}`;
  msg.textContent = text;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Send on Enter
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") sendMessage();
});














// for permintly store uses db

// const socket = io();

// // DOM elements
// const input = document.getElementById("messageInput");
// const messagesDiv = document.getElementById("messages");
// let isYou = true;

// // Send message
// function sendMessage() {
//   const text = input.value.trim();
//   if (text !== "") {
//     const data = {
//       message: text,
//       sender: isYou ? "You" : "Friend"
//     };
//     socket.emit("chat message", data);
//     input.value = "";
//     isYou = !isYou;
//   }
// }

// // Receive individual message
// socket.on("chat message", (data) => {
//   addMessage(data.message, data.sender);
// });

// // Load old messages
// socket.on("load messages", (messages) => {
//   messages.forEach((msg) => {
//     addMessage(msg.message, msg.sender);
//   });
// });

// // Display message
// function addMessage(text, sender) {
//   const msg = document.createElement("div");
//   msg.className = `message ${sender === "You" ? "sent" : "received"}`;
//   msg.textContent = text;
//   messagesDiv.appendChild(msg);
//   messagesDiv.scrollTop = messagesDiv.scrollHeight;
// }

// // Enter key to send
// input.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") sendMessage();
// });
