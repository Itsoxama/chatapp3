const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name:String,
  users:[{
    username:String,
    userid:String

  }]
  


},
{
    
  timestamps:true,
}
);

module.exports = mongoose.model("deskspace", messageSchema);
