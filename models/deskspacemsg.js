const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message:String,
  senderid:String,
  sendername:String,
  deskspaceid:String 


},
{
    
  timestamps:true,
}
);

module.exports = mongoose.model("deskspacemsg", messageSchema);
