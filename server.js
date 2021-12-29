require("dotenv").config();
const express = require("express");
var cors = require('cors');
const userRoutes = require("./userRoutes");

const connectDB = require("./db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json())
// GET Request to "/" route
app.get("/", (req, res) => {
  res.send("API is running..");
});

app.use("/api/user", userRoutes);

const port= process.env.PORT || 3000;
// app.listen(PORT, console.log(`Server running on PORT ${PORT}..`));

app.listen(port,()=>{
  console.log("server running in port ",port)
})