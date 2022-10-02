const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderid:String,
  recid:String,
  sendername:String,
  message:String,
  


},
{
    
  timestamps:true,
}
);

module.exports = mongoose.model("chat", messageSchema);
