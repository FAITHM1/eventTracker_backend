////////////////////
//dependencies
///////////////////
require("dotenv").config();
const { PORT = 3000, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
const morgan = require("morgan");
///////////////
//database connection
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// connection events
mongoose.connection
  .on("open", () => console.log("you are open"))
  .on("close", () => console.log("you are closed"))
  .on("error", (error) => console.log(error));

///
//model

const EventSchema = new mongoose.Schema({
  Title: String,
  subTitle: String,
  Type: String,
  Date: String,
  Description: String,
});

const Event = mongoose.model("Event", EventSchema);
////
//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("hello world");
});

//index route
app.get("/events", async (req, res) => {
  try {
    res.json(await Event.find({}));
  } catch (error) {
    res.status(400).json({ error });
  }
});
//create route
app.post("/events", async (req, res) => {
  try {
    res.json(await Event.create(req.body));
  } catch (error) {
    res.status(400).json({ error });
  }
});
// update route
app.put("/events/:id", async (req, res) => {
  try {
    res.json(
      await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json({ error });
  }
});
// distroy route
app.delete("/events/:id", async (req, res) => {
  try {
    res.json(await Event.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json({ error });
  }
});
//server listener
app.listen(PORT, () => {
  console.log("okay");
});
