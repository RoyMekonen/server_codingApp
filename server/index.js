
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

app.use(cors());
require("dotenv").config();
require("./config/database");
app.use(express.json());

//Routers
const userRouter = require("./routes/userRouter");
const roomRouter = require("./routes/roomRouter");
const loginRouter = require("./routes/loginRouter");
app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);
app.use("/api/login", loginRouter);

const PORT = process.env.PORT || 8800
app.listen(PORT, () => {
  console.log(`server run on${PORT}`);
 
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: "GET, POST",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    // update function to the database and return the update object.
    socket.broadcast.emit("receive_message", data);
  });
});

// To activate the socket in the application, uncomment it

// server.listen(3001, ()=>{
//   console.log('Server is Running');
// })