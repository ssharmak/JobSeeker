const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/jobNotifications", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// MongoDB Schemas
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  subscriptions: [String], // List of subscribed companies
});

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
});

const User = mongoose.model("User", UserSchema);
const Job = mongoose.model("Job", JobSchema);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

// User Authentication (Signup)
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, subscriptions: [] });
  await user.save();
  res.json({ message: "User registered successfully" });
});

// User Authentication (Login)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
  res.json({ token, subscriptions: user.subscriptions });
});

// Store user subscriptions
app.post("/subscribe", async (req, res) => {
  const { token, companies } = req.body;
  try {
    const decoded = jwt.verify(token, "secret");
    await User.findByIdAndUpdate(decoded.userId, { subscriptions: companies });
    res.json({ message: "Subscribed successfully" });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

// WebSocket Connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("subscribe", async ({ token }) => {
    try {
      const decoded = jwt.verify(token, "secret");
      const user = await User.findById(decoded.userId);
      if (user) {
        socket.join(user._id.toString());
        console.log(`User ${user.username} subscribed to ${user.subscriptions}`);
      }
    } catch {
      console.log("Invalid Token");
    }
  });

  socket.on("newJob", async (job) => {
    const newJob = new Job(job);
    await newJob.save();

    const subscribers = await User.find({ subscriptions: job.company });
    subscribers.forEach(user => {
      io.to(user._id.toString()).emit("jobPosts", [job]);
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5001, () => console.log("Server running on port 5001"));
