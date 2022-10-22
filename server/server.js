const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

app.use(cors());
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  console.log(username);
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", async (socket) => {
  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });
});
io.on("connection", async (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);
});

io.on("connection", async (socket) => {
  console.log("New user Connected");
  const username = socket.handshake.auth.username;

  socket.join("test");

  socket.on("send_message", ({ recipients, text }) => {
    // console.log("WE ARE HERE");
    recipients.forEach((recipient) => {
      const newRecipients = [...recipients];
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: username,
        text,
      });
    });
  });

  socket.on("disconnect", async () => {
    console.log("Disconected");
    // console.log(socket);
    // const matchingSockets = await io.in(socket.id).fetchSockets();
    // const isDisconnected = matchingSockets.size === 0;

    console.log(socket.id);
    // notify other users
    socket.broadcast.emit("user disconnected", socket.id);
    // update the connection status of the session
  });
});

server.listen(3001, () => {
  console.log("Server is running 🟢");
});
