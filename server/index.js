const express = require('express');
const socket = require("socket.io");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
let path = require("path");
const port = process.env.PORT || 3002

// app.listen (port, () => {
//   console.log ('Máy chủ hoạt động!');
// });
// app.use(function(req, res, next) {
//     console.log("đvdv");
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     // Pass to next layer of middleware
//     next();
// });
// app.use("/", express.static("build"));
const server = app.listen(port, () => {
  console.log("Server Running on Port 3002...");
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
io = socket(server);
let listRoom = [];
let list = {
  dataTable: [],
  turn: "X",
  room: "",
  user1: { name: "CONG", type: "X", id: "",dataWin:[]},
  user2: { name: "DANH", type: "O", id: "",dataWin:[]},
  userOut: "O",
}
let tamDataWin = []
io.on("connection",async (socket) => {
  socket.on("create_room",async (dataRoom) => {
    socket.join(dataRoom)
    await io.emit("list_room", getActiveRooms(io))
    await socket.emit("receive_room", dataRoom)
    listRoom = getActiveRooms(io)
    list = {
      dataTable: [],
      turn: "X",
      room: dataRoom,
      user1: { name: "CONG", type: "X", id: socket.id,dataWin:[] },
      user2: { name: "DANH", type: "O", id: "",dataWin:[] },
      userOut: "O",
    }
  })
  socket.on("search_room", async (dataRoom) => {
    let checkListRoom = io.sockets.adapter.rooms.get(dataRoom)
    if (list.dataTable.length != 0) {
      if (checkListRoom?.size < 2 || checkListRoom?.size===undefined) {
        await socket.join(dataRoom)
      list.room = dataRoom
      if (list.user1.id === "") {
        list.user1.id = socket.id
        list.userOut = "X"
      } else if (list.user2.id === "") {
        list.user2.id = socket.id
        list.userOut = "O"
        }
      await socket.emit("receive_search_room", list)
      } else {
        await socket.emit("no_search_room",true)
      }
    }
  })
  socket.on("send_play_check", async (data) => {
    if (data.turn === "X") {
      list.user1.dataWin = data.dataWin
    } else {
      list.user2.dataWin = data.dataWin
    }
    list.dataTable = data.dataTable
    list.turn = data.turn == "X" ? "O" : "X"
    list.room = data.dataRoom
    await socket.to(data.dataRoom).emit("receive_play_check", list)
  })
  socket.on("new_game", (data) => {
    list.dataTable = []
    list.user1.dataWin = []
    list.user2.dataWin = []
  })
  socket.on("send_list_room", () => {
    io.emit("list_room", getActiveRooms(io))
  })
 
  socket.on("back", (data) => {
    socket.emit("reveive_back")
  });

  socket.on("disconnect", (data) => {
    socket.emit("out_room", true)
    if (list.user1.id === socket.id) {
      list.user1.id = ""
      list.userOut = "X"
    } else if (list.user2.id === socket.id) {
      list.user2.id = ""
      list.userOut = "O"
    }
    console.log("USER DISCONNECTED");
  });
})

function getActiveRooms(io) {
  // Convert map into 2D list:
  // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
  const arr = Array.from(io.sockets.adapter.rooms);
  // Filter rooms whose name exist in set:
  // ==> [['room1', Set(2)], ['room2', Set(2)]]
  const filtered = arr.filter(room => !room[1].has(room[0]))
  // console.log("filtered",filtered);
  // Return only the room name: 
  // ==> ['room1', 'room2']
  const res = filtered.map(i => i[0]);
  // console.log("res",res);
  const result = res.map((data, i) => {
    return { nameRoom: data, numberUser: io.sockets.adapter.rooms.get(data).size } // lấy room
  })
  return result;
}


////////////////////////////////////////////// list room

