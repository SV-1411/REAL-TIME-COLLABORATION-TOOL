const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let users = {};
app.use(cors());
app.use(express.json());

// WebSocket connections
wss.on("connection", (ws) => {
  const userId = Date.now(); // Generate a unique ID
  users[userId] = { id: userId, color: getRandomColor() };

  // Notify all clients about the new user list
  broadcastUserList();
  console.log("New client connected");
  broadcastUserList();

  // Listen for messages from clients
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      
      if (data.type === "cursorMove") {
        console.log("Cursor moved:", data);
      } else if (data.type === "draw") {
        console.log("Drawing received:", data);
      }

      // Broadcast the message to all clients except the sender
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });

    } catch (error) {
      console.error("❌ Error handling message:", error);
    }
  });
 

  ws.on("close", () => {
     delete users[userId];
    broadcastUserList();
    console.log("Client disconnected");
    
  });
});
function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Send the updated user list
function broadcastUserList() {
  broadcast(JSON.stringify({ type: "users", users }));
}

// Generate a random color for the user
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Start the server
server.listen(5000, () => {
  console.log("Server running on port 5000");
});
