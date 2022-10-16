
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./config/dbConfig");
var fs = require('fs'),
request = require('request');


var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream("asd")).on('close', callback);
  });
};

download('https://firebasestorage.googleapis.com/v0/b/screenshot-afa24.appspot.com/o/RoomsImages%2F1663716124738mrHankey.jpg?alt=media&token=3e1db55a-d9a5-41b0-84d6-8ffa8742d0ee', 'google.png', function(){
  console.log('done');
});

const Room = require("./models/room");
const Message = require("./models/message");
const user = require("./models/user");
const deskspace = require("./models/deskspace");
const deskspacemsg = require("./models/deskspacemsg");

const chat = require("./models/chat");
const validateForm = require("./middlewares/validateFormMiddleware");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });



allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};


let stream = require( './ws/stream' );
let path = require( 'path' );

io.of( '/stream' ).on( 'connection', stream );







app.use(allowCrossDomain);

io.on("connection", (socket) => {
  console.log("connencted")
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);

});
  socket.emit('me',socket.id) 




socket.on('calluser',({usertocall,signaldata,from,name})=>{
  io.to(usertocall).emit('calluser',{signal:signaldata,from,name })
})


socket.on('answercall',(data)=>{
io.to(data.to).emit('callaccepted',data.signal)
})




  
 socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('voice call',(id,peer,user)=>{
    io.emit("calling",id,peer,user)
  })
socket.on('answered',(apeer,from)=>{
  io.emit("recieved",apeer,from)

})
socket.on('newgroupmsg',(id)=>{
  
  io.emit("broadcastmsg",id)
})

 socket.on('my message', (id) => {


    io.emit('my broadcast', id);
  });

});

app.use(bodyParser.json());
app.use(cors());


app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );



app.get("/", (req, res) => {
  Room.find({}, (err, rooms) => {
    if (err) return console.log(err);
    res.json(rooms);
  });
});

// create a new room
app.post("/rooms", validateForm, (req, res) => {
  let roomName = req.body["roomName"];
  let generatedRoom = new Room({ name: roomName });

  generatedRoom.save((err, res) => {
    if (err) return console.log(err);
  });

  res.status(201);
  res.end();
});

//get all users
app.get("/api/users", (req, res) => {
  
  user.find({}, (err, rooms) => {
    if (err) return console.log(err);
    res.json(rooms);
  });
});


// create a user
app.post("/api/user", (req, res) => {
  let userx = req.body;
  let createuserx = new user(userx);

  createuserx.save((err, res) => {
    if (err) return console.log(err)
    else{
      console.log("success")
    }
  });

  res.status(201);
  res.end();
});

// create a deskspace
app.post("/api/deskspace", (req, res) => {
  console.log(req.body)
  let userx = req.body;
  let createuserx = new deskspace(userx);

  createuserx.save((err, resa) => {
    if (err) return console.log(err)
    else{
      console.log("success")
    }
  });
  res.status(201);
  res.end();
});


// update messgae
app.post("/api/updatedeskmsg", (req, res) => {
 

  deskspacemsg.findOneAndUpdate(
    { _id:req.body.params._id  }, 
    { message: req.body.params.message },

   function (error, success) {
         if (error) {
             console.log(error);
         } else {
             console.log(success);
         }
     }

  
)

    })

// delete desk message
app.delete("/api/deletedeskmessage", (req, res) => {
  var a=req.query._id
  console.log(a)
  deskspacemsg.deleteOne({ "_id":  a},
  function (err, _result) {
    if (err) {
      res.sendStatus(400)
    } else {
      
      res.sendStatus(200)
    }
  }
  );
});


// get message of deskspaces
app.get("/api/deskspaces", (req, res) => {
  console.log(req.query)
  deskspacemsg.find(

    { deskspaceid:req.query.deskid}, 
    

   function (error, chats) {
         if (error) {
             console.log(error);
         } else {  
          res.json(chats)
             }
     }

  
)

    })


// create a message of deskspace
app.post("/api/deskmsg", (req, res) => {
  let userx = req.body;
  console.log(req.body)
  let createuserx = new deskspacemsg(userx);

  createuserx.save((err, res) => {
    if (err) return console.log(err)
    else{
      console.log("success")
    }
  });

  res.status(201);
  res.end();
});


// add message
app.post("/api/message", (req, res) => {
  let userx = req.body;
  let createuserx = new chat(userx);

  createuserx.save((err, res) => {
    if (err) return console.log(err)
    else{
      console.log("success")
    }
  });

  res.status(201);
  res.end();
});



// delete user
app.delete("/api/deleteuser", (req, res) => {
  var a=req.query._id
  console.log(a)
  user.deleteOne({ "_id":  a},
  function (err, _result) {
    if (err) {
      res.status(400).send(`Error deleting listing with id`);
    } else {
      
      res.status(200).send(`done`);
    }
  }
  );
});


// delete message
app.delete("/api/deletemessage", (req, res) => {
  var a=req.query._id
  console.log(a)
  chat.deleteOne({ "_id":  a},
  function (err, _result) {
    if (err) {
      res.sendStatus(400)
    } else {
      
      res.sendStatus(200)
    }
  }
  );
});



// get message of particular user
app.get("/api/partchat", (req, res) => {
  chat.find(
    {$or:[ {senderid:req.query.senderid ,
      recid:req.query.recid},
      {senderid:req.query.recid ,
        recid:req.query.senderid}]}, 
    

   function (error, chats) {
         if (error) {
             console.log(error);
         } else {  
          res.json(chats)
             }
     }

  
)

    })

    

// get deskspaces of particular user
app.get("/api/partdesk", (req, res) => {
console.log(req.query)

  deskspace.find(
    { 
    "users.userid":req.query.userid
        
    }, 
    

   function (error, chats) {
         if (error) {
             console.log(error);
         } else {  
          res.json(chats)
             }
     }

  
)

    })


//login user


app.get("/api/login", (req, res) => {
  user.findOne(
    { username:req.query.username ,
      password:req.query.password}, 
    

   function (error, user) {
         if (error) {
             console.log(error);
         } else {  
          res.json(user)
             }
     }

  
)

    })




  
    var download = function(uri, filename, callback){
      request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
    
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    
    download('https://firebasestorage.googleapis.com/v0/b/screenshot-afa24.appspot.com/o/RoomsImages%2F1663716124738mrHankey.jpg?alt=media&token=3e1db55a-d9a5-41b0-84d6-8ffa8742d0ee', 'google.png', function(){
      console.log('done');
    });
    
// update last active
app.post("/api/updatetime", (req, res) => {
 
  

console.log(req.body)
  user.findOneAndUpdate(
    { _id:req.body.id  }, 
    { lastactive: req.body.time },

   function (error, success) {
         if (error) {
             console.log(error);
         } else {
             console.log(success);
         }
     }

  
)

    })

// update messgae
app.post("/api/updatemsg", (req, res) => {
 

    chat.findOneAndUpdate(
      { _id:req.body.params._id  }, 
      { message: req.body.params.message },
  
     function (error, success) {
           if (error) {
               console.log(error);
           } else {
               console.log(success);
           }
       }
  
    
  )
  
      })
  


// add allowed
app.post("/allowed", (req, res) => {
 var a=req.body.id
var ab=req.body.allowed
for(var i=0;i<3;i++){
  if(i===0){
    
  user.findByIdAndUpdate(

    { _id:a  }, 
    { $push: { allowed:{id: ab } } },
    {upsert:true},
 
   function (error, success) {
         if (error) {
             console.log(error);
         } else {
         }
     }

  
)
  }
  else if(i===1){
    
  user.findByIdAndUpdate(

    { _id:ab  }, 
    { $push: { allowed:{id: a } } },
    {upsert:true},
 
   function (error, success) {
         if (error) {
             console.log(error);
         } else {
         }
     }

  
)

  }

}

    })

    
// add invite

app.post("/invite", (req, res) => {
 
  var a=req.body.id
  
  var ab=req.body.addid
  
user.findByIdAndUpdate(

  { _id:a  }, 
  { $push: { invite:{
    id: ab,
    name:req.body.name
   } } },
   function (error, success) {
         if (error) {
             console.log(error);
         } else {
             console.log(success);
         }
     }

  
)
    })

// delete invite

app.post("/deleteinvite", (req, res) => {
  var a=req.body.id
  var ab= req.body.deleteid
  console.log(req.body)
  
  
user.findByIdAndUpdate(

  { _id:a  }, 
  { $pull: { invite:{
    id: ab
   } } },
   function (error, success) {
         if (error) {
             console.log(error);
         } else {
         }
     }

  
)
    })


// create a message
app.post("/addchat", (req, res) => {
 

  user.findOneAndUpdate(
    { _id:"63207d5eb32ffb339001ca56"  }, 
    { $push: { chats: req.body  } },

   function (error, success) {
         if (error) {
             console.log(error);
         } else {
             console.log(success);
         }
     }

  
)

    })



//get all messages



app.get("/api/getchats", (req, res) => {
  
  chat.find({}, (err, rooms) => {
    if (err) return console.log(err);
    res.json(rooms);
  });
});





app.get("/api/getchats2", (req, res) => {
  chat.find({senderid:"63207a44ea5f532a280s76ad0ww"}, (err, rooms) => {
    if (err) return console.log(err);
    res.json(rooms);
  });
});





server.listen(process.env.PORT|| 5000, () => {
  console.log("Initialized");
});
