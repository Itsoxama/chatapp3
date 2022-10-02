const mongoose = require("mongoose");
const uri = "mongodb+srv://admin:joho@cluster0.iykqmyl.mongodb.net/?retryWrites=true&w=majority";

// connect to db
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to db");
});
