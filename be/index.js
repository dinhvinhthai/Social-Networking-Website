const express = require("express");
var app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const userModal = require("./model/usersModel");
const conversationModel = require("./model/conversationsModel");
const messagesModel = require("./model/messagesModel");
const {
  onlineUsers,
  addNewUser,
  removeAuser,
  getAUser,
  getAllUser,
  getOnlineUser,
  getFriendsOnline,
} = require("./socket/socketHelper");

//socket
//online users
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("sendListToGetOnlineFriends", ({ friends, user }) => {
    getFriendsOnline(friends).forEach((friend) => {
      io.emit("getOnlineUsers", getOnlineUser());
    });
  });

  socket.on("disconnect", () => {
    removeAuser(socket.id);
  });

  socket.on("userConnection", (user) => {
    addNewUser(user, socket.id);
  });
  socket.on("sendNotification", async ({ receiverUserId, type }) => {
    try {
      const receiver = await getAUser(receiverUserId);
      if (!receiver) return;
      const query = await userModal.findById(receiver._id).populate({
        path: "notifications",
        populate: { path: "userId", model: "usersModal" },
      });
      await io
        .to(receiver.socketId)
        .emit("getNotification", query.notifications);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("sendMessage", async ({ conversationId }) => {
    try {
      const conversationQuery = await conversationModel.findById(
        conversationId
      );

      const receivers = getAllUser(conversationQuery.members);
      if (!receivers) return;
      const messageQuery = await messagesModel
        .find({
          conversationId: conversationId,
        })
        .populate("sender");
      receivers.forEach((r) => {
        io.to(r.socketId).emit("getMessage", messageQuery);
      });
    } catch (error) {
      console.log(error);
    }
  });
});

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

//routes
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const postsRoute = require("./routes/postsRoute");
const commentsRoute = require("./routes/commentsRoute");
const eventsRoute = require("./routes/eventsRoute");
const jobsRoute = require("./routes/jobsRoute");
const conversationsRoute = require("./routes/conversationsRoute");
const messagesRoute = require("./routes/messagesRoute");

require("dotenv").config();

mongoose.connect(process.env.connectString, { useNewUrlParser: true }, () => {
  console.log("connect to mongoDB");
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/images", express.static("images"));
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/events", eventsRoute);
app.use("/api/jobs", jobsRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/messages", messagesRoute);

http.listen(5000, () => {
  console.log("running at local host 5000");
});
