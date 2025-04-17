
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
