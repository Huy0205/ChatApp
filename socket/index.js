const io = require("socket.io")(9000, {
  cors: {
    origin: [
      "http://localhost:3000",
      "exp://192.168.1.2:8081",
      "exp://192.168.1.17:8081",
      "http://localhost:8081",
      "exp://192.168.1.7:8081",
      "exp://192.168.1.22:8081",
      "exp://192.168.1.8:8081",
      "exp://192.168.1.91:8081",
      "*"
    ],
  }
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
const getUserIdBySocketId = (socketId) => {
  return users.find((user) => user.socketId === socketId)?.userId;
};

io.on("connection", (socket) => {
  //when user connect
  console.log("a user connected.");
 console.log("a user connected>>>",users);
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
    
  
  });

  //send and get message
  socket.on(
    "sendMessage",
    ({ senderId, conversationId, new_message, members }) => {

      console.log("members>>>",members);
      console.log("senderId>>>",senderId);
      console.log("conversationId>>>",conversationId);
      console.log("new_message>>>",new_message);
      
      members
        .filter((member) => member != senderId)
        .forEach((member) => {
          const reciever = getUser(member);
          if (reciever) {
            io.to(reciever.socketId).emit("getMessage", {
              conversationId,
              new_message,
            });
          }
        });
    }
  );

  socket.on(
    "sendEmojiMessage",
    ({ senderId, conversationId, new_message, members }) => {
      //.filter((member => member != senderId))
      members.forEach((member) => {
        const reciever = getUser(member);
        if (reciever) {
          io.to(reciever.socketId).emit("getMessageEmoji", {
            conversationId,
            new_message,
          });
        }
      });
    }
  );

  socket.on(
    "delete-message",
    ({ senderId, conversationId, new_message, members }) => {
      members.forEach((member) => {
        const reciever = getUser(member);
        if (reciever) {
          io.to(reciever.socketId).emit("getMessageDelete", {
            conversationId,
            new_message,
            senderId,
          });
        }
      });
    }
  );

  socket.on(
    "recall-message",
    ({ senderId, conversationId, new_message, members }) => {
      members.forEach((member) => {
        const reciever = getUser(member);
        if (reciever) {
          io.to(reciever.socketId).emit("getRecallMessage", {
            conversationId,
            new_message,
            senderId,
          });
        }
      });
    }
  );

  socket.on("addUserToGroup", ({ userInvited, members, newMembers }) => {
    members
      .filter((id) => id != getUserIdBySocketId(socket.id))
      .forEach((member) => {
        const reciever = getUser(member);
        if (reciever) {
          io.to(reciever.socketId).emit("getNotyfiAddUserToGroup", {
            userInvited,
            members,
            newMembers,
          });
        }
      });
  });
  socket.on(
    "reRenderConversations",
    ({ members, conversationId, unseen, lastMessage, sendAt }) => {
      users
        .filter((user) => members.includes(user.userId))
        .forEach((user) => {
          io.to(user.socketId).emit("reRenderConversations", {
            conversationId,
            unseen,
            lastMessage,
            sendAt,
          });
        });
    }
  );
  socket.on(
    "sendRequestFriend",
    ({ recieverId }) => {
      const reciever = getUser(recieverId);
      if (reciever) {
        io.to(reciever.socketId).emit("getFriendRequest");
      }
    },
    (c) => {
      console.log("c :>> ", c);
    }
  );

  socket.on("acceptFriendRequest", (senderId) => {
    const sender = getUser(senderId);
    if (senderId) {
      io.to(sender.socketId).emit("re-renderFriendRequest");
    }
  });
  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

console.log("====================================");
console.log("Socket server is running!");
console.log("====================================");
