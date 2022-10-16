const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name:String,
  username:String,
  password:String,
  lastactive:String,
  
  allowed:[{
    id:{
      type:String,
    unique:true,
    }
  }],
  invite:[{
    id:{
      type:String,
        unique: true
    },
    name:String
  }],
  chats:[{
    id:String,
    chatroomid:String,
  }]

});

module.exports = mongoose.model("user", messageSchema);
