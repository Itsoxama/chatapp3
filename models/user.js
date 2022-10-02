const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name:String,
  username:String,
  password:String,
  lastactive:String,
  chats:[{
    id:String,
    chatroomid:String,
  }]

});

module.exports = mongoose.model("user", messageSchema);
