const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:3000/" });

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  // เรียกการเชื่อมต่อ
  socket.on("addNewUser", (userId) => {
    console.log("Received userId from client:", userId);
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    console.log("onlineUsers", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  // เพิ่มข้อความ
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(3002);
