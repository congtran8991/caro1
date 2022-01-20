const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
let path = require("path");
const { json } = require("express");
const port = process.env.PORT || 3002;

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
app.use("/", express.static("build"));
const server = app.listen(port, () => {
  console.log("Server Running on Port 3002...");
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
io = socket(server);
let roomOut = '';
let list = {
  dataTable: [],
  turn: "X",
  room: "",
  user1: { name: "", type: "", id: "", dataWin: [],clickPlay:false},
  user2: { name: "", type: "", id: "", dataWin: [],clickPlay:false},

};

let dataListRoom = {};
io.on("connection", async (socket) => {
  socket.on("search_room", async (data) => {
    let { numberRoom, namePlayer } = data;
    const checkRoom = getActiveRooms(io).find((data)=>data.nameRoom === numberRoom)
    if(checkRoom?.numberUser > 1) return
    await socket.join(numberRoom);
    await io.emit("list_room", getActiveRooms(io));
    if(dataListRoom[numberRoom] === undefined){
      list = {
        dataTable: [],
        turn: "X",
        room: numberRoom,
        user1: {
          name: namePlayer,
          type: "X",
          id: socket.id,
          dataWin: [],
          clickPlay:true
        },
        user2: { name: "", type: "", id: "", dataWin: [], clickPlay: false },
      };
      dataListRoom[numberRoom] = list;
      await io.in(numberRoom).emit("receive_search_room", dataListRoom);
    }else if(dataListRoom[numberRoom].user1.id === "" || dataListRoom[numberRoom].user2.id === ""){
      if(dataListRoom[numberRoom].user1.id === ""){
        dataListRoom[numberRoom].user1.id = socket.id
        dataListRoom[numberRoom].user1.name = (namePlayer === dataListRoom[numberRoom].user2.name) ?  namePlayer+"1" : namePlayer
        dataListRoom[numberRoom].user1.clickPlay = true
        if(dataListRoom[numberRoom].user2.type === "X"){
          dataListRoom[numberRoom].user1.type = "O"
        }else{
          dataListRoom[numberRoom].user1.type = "X"
        }
      }else{
        dataListRoom[numberRoom].user2.id = socket.id
        dataListRoom[numberRoom].user2.name = (namePlayer === dataListRoom[numberRoom].user1.name) ? namePlayer+"1" : namePlayer
        dataListRoom[numberRoom].user2.clickPlay = true
        if(dataListRoom[numberRoom].user1.type === "X"){
          dataListRoom[numberRoom].user2.type = "O"
        }else{
          dataListRoom[numberRoom].user2.type = "X"
        }
      }
    }
    await io.in(numberRoom).emit("receive_search_room", dataListRoom);
  });
  socket.on("send_play_check", async (data) => {
    if (data.turn === "X") {
      dataListRoom[data.dataRoom].user1.dataWin = data.dataWin
      dataListRoom[data.dataRoom].turn = "O"
    } else {
      dataListRoom[data.dataRoom].user2.dataWin = data.dataWin
      dataListRoom[data.dataRoom].turn = "X"
    }
    dataListRoom[data.dataRoom].dataTable = data.dataTable;
    dataListRoom[data.dataRoom].room = data.dataRoom;
    io.in(data.dataRoom).emit("receive_play_check", dataListRoom);
  });
  socket.on("send_message_win",async (data)=>{
    const cloneDataList = dataListRoom[data.room]
    cloneDataList.dataTable = []

    cloneDataList.user1.dataWin = []
    cloneDataList.user1.clickPlay = false

    cloneDataList.user2.dataWin = []
    cloneDataList.user2.clickPlay = false

    if(data.type === "X"){
      await  io.to(cloneDataList.user1.id).emit("receive_send_message_win",true)
      await io.to(cloneDataList.user2.id).emit("receive_send_message_win",false)
    }else{
      await io.to(cloneDataList.user2.id).emit("receive_send_message_win",true)
      await io.to(cloneDataList.user1.id).emit("receive_send_message_win",false)
    }
    await io.in(data.room).emit("receive_search_room", dataListRoom);
  })

  socket.on("continue_game",(data)=>{
     const cloneData = dataListRoom[data.numberRoom]
     if(cloneData.user1.name === data.namePlayer){
        cloneData.user1.clickPlay = true
     }else{
        cloneData.user2.clickPlay = true
     }
    io.in(data.numberRoom).emit("receive_search_room", dataListRoom);
  })
  socket.on("send_list_room", () => {
    io.emit("list_room", getActiveRooms(io));
  });

  socket.on("back", (data) => {
    socket.emit("reveive_back");
  });

  Object.keys(dataListRoom).forEach((key)=>{
    if(!getActiveRooms(io).find((data)=>data.nameRoom === key)){
      delete dataListRoom[key]
    }
  })

  socket.on("disconnect", async(data)=> { 
    console.log("USER DISCONNECTEDg");
  });

  socket.on("disconnecting",async function () {
    console.log("getActiveRooms(io)",getActiveRooms(io));
    var self = this;
    var rooms = Array.from(self.rooms);
    if(dataListRoom[rooms[1]]?.user1?.id === socket.id){
      dataListRoom[rooms[1]].user1.id = "";
      dataListRoom[rooms[1]].user1.name = "";
      dataListRoom[rooms[1]].user1.clickPlay = false;
    } else if(dataListRoom[rooms[1]]?.user2?.id === socket.id){
      dataListRoom[rooms[1]].user2.id = "";
      dataListRoom[rooms[1]].user2.name = "";
      dataListRoom[rooms[1]].user2.clickPlay = false
    }else{
      return
    }
    await io.in(rooms[1]).emit("receive_search_room", dataListRoom);
  });
});

function getActiveRooms(io) {
  // Convert map into 2D list:
  // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
  const arr = Array.from(io.sockets.adapter.rooms);
  // Filter rooms whose name exist in set:
  // ==> [['room1', Set(2)], ['room2', Set(2)]]
  const filtered = arr.filter((room) => !room[1].has(room[0]));
  //console.log("filtered",filtered);
  // Return only the room name:
  // ==> ['room1', 'room2']
  const res = filtered.map((i) => i[0]);
  //console.log("res",res);
  const result = res.map((data, i) => {
    return {
      nameRoom: data,
      numberUser: io.sockets.adapter.rooms.get(data).size,
    }; // lấy room
  });
  return result;
}

////////////////////////////////////////////// list room
