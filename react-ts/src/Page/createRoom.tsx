import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Fade,
  Box,
  Typography,
  Backdrop,
  TextField,
} from "@mui/material";
//import SearchBar from 'material-ui-search-bar'
import { useHistory } from "react-router-dom";
import { DataContext } from "../Context/userContext";

// const data1: any = [
//   { content: "1", childs: [] },
//   {
//     content: "2",
//     childs: [
//       {
//         content: "3",
//         childs: [
//           { content: "4", childs: [] },
//           { content: "5", childs: [] },
//         ],
//       },
//     ],
//   },
//   { content: "6", childs: [] },
//   {
//     content: "7",
//     childs: [
//       {
//         content: "8",
//         childs: [
//           {
//             content: "9",
//             childs: [
//               {
//                 content: "10",
//                 childs: [{ content: "11", childs: [] }],
//               },
//             ],
//           },
//           {
//             content: "12",
//             childs: [
//               {
//                 content: "13",
//                 childs: [{ content: "14", childs: [] }],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   { content: "15", childs: [] },
// ];

// const data2: any = [
//   {
//     content: "1",
//     childs: [
//       {
//         content: "2",
//         childs: [
//           {
//             content: "3",
//             childs: [
//               {
//                 content: "4",
//                 childs: [
//                     { content: "5",
//                       childs: []
//                     }
//                 ],
//               },
//               {
//                 content: "6",
//                 childs: [
//                     { content: "7",
//                       childs: []
//                     }
//                 ],
//               },
//             ],
//           }
//         ],
//       },
//     ],
//   },
// ];
//console.log(data1);
interface listRoomKey {
  nameRoom: string;
  numberUser: number;
}
function CreateRoom() {
  const { socketIO } = useContext(DataContext);
  const [listRoom, setListRoom] = useState<listRoomKey[]>([]);
  const [searched, setSearched] = useState<string>("");
  const [namePlayer, setNamePlayer] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [checkType, setCheckType] = useState<string>("");
  const [nameRoom, setNameRoom] = useState<string>("");
  const [size, setSize] = useState<number>(6);
  
  let history = useHistory();
  useEffect(() => {
    socketIO.emit("send_list_room");
  }, []);
  useEffect(() => {
    socketIO.on("list_room", (data: any) => {
      setListRoom(data); // cần fix
    });
  }, []);
  useEffect(() => {
    socketIO.on("reveive_back", (data: any) => {
      if (window.performance) {
        if (performance.navigation.type == 1) {
          window.location.reload();
        }
      }
    });

    //Duyen
    //let a: any = window?.innerWidth;
    //setSize(a);
    //console.log(data1);
    //let b = [[1, 2], 1, [2], [[4, 5]]];
    // let abc: any = (b: any) => {
    //   //console.log(b);
    //   for (let i = 0; i < b.length; i++) {
    //     if (typeof b[i] == "object") {
    //     //  console.log(abc(b[i]));
    //     } else {
    //      // console.log("cscscscs", b[i]);
    //     }
    //   }
    // };

    // abc(b);
  });

  // let bcd: any = (dataTe: any,tang:any) => {
  //     let g = dataTe.map((data:any,index:any)=>{
  //         if(data.childs.length > 0){
  //             return <div style={{paddingLeft:tang*10 +"px"}}>{data.content}{ bcd(data.childs,tang+1)}</div>
  //         }else{
  //             return <div style={{paddingLeft:"10px"}}>{data.content}</div>
  //         }
  //     })
  //     return g
  // };
 console.log(1+1);
 
  const requestSearch = (searchedVal: string) => {
    const filteredRows = listRoom.filter((row) => {
      return row.nameRoom.includes(searchedVal);
    });
    setListRoom(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalMessage = () => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nhập tên người chơi
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              onChange={(e) => {
                setNamePlayer(e.target.value);
              }}
              style={{ width: "100%" }}
              id="outlined-basic"
              label="UserName"
              variant="outlined"
            />
          </Typography>
          <Typography
            className="flex justify-content-between"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <Button
              style={styleBtn}
              variant="contained"
              onClick={async () => {
                if (checkType === "newGame") {
                  let numberRoom = String(Math.floor(Math.random() * 100000));
                  // await socketIO.emit("create_room", {
                  //   numberRoom,
                  //   namePlayer,
                  // });
                  history.push({
                    pathname: `/${numberRoom}`,
                    state: { numberRoom: numberRoom, namePlayer: namePlayer },
                  });
                } else if (checkType === "searchGame") {
                 // socketIO.emit('search_room',{numberRoom:nameRoom,namePlayer:namePlayer})
                  history.push({
                    pathname: `/${nameRoom}`,
                    state: {
                      numberRoom: nameRoom,
                      namePlayer: namePlayer,
                    },
                  });
                }
              }}
            >
              <div style={{ padding: "0 10px" }}>Tạo bàn</div>
            </Button>

            <Button variant="outlined" onClick={handleClose}>
              <div style={{ padding: "0 10px" }}>Cancel</div>
            </Button>
          </Typography>
        </Box>
      </Modal>
    );
  };

  return (
    <>
      {/* {bcd(data1, 1)} */} 
      <div className="flex h-100 justify-content-center align-items-start">
        {modalMessage()}
        <div>
          <div className="text-center" style={styleTitle}>
            <span>Đại chiến</span>{" "}
            <span style={{ color: "#1976d2", fontSize: "60px" }}>Caro</span>
          </div>
          <div className="flex justify-content-center">
            <Button
              style={styleBtn}
              variant="contained"
              onClick={async () => {
                setOpen(true);
                setCheckType("newGame");
                // let numberRoom = String(Math.floor(Math.random() * 100000))
                // await socketIO.emit('create_room',numberRoom)
                // history.push({
                //     pathname: `/${numberRoom}`,
                //     state: { numberRoom: numberRoom,checkSearch:'Cong' },
                // })
              }}
            >
              <div style={{ padding: "0 10px" }}>Tạo bàn mới</div>
            </Button>
            <div style={{ marginLeft: "10px", marginRight: "10px" }}></div>
          </div>

          <div>
            <TableContainer component={Paper}>
              {/* <SearchBar value={searched} onChange={(searchVal) => requestSearch(searchVal)} onCancelSearch={() => cancelSearch()} /> */}
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Danh sách phòng</TableCell>
                    <TableCell align="right">Số thành viên</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listRoom.map((row: any, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      onClick={async (e) => {
                        if (row.numberUser < 2) {
                          setOpen(true);
                          setCheckType("searchGame");
                          setNameRoom(row.nameRoom);
                        } else {
                          alert("Phòng đã đủ người chơi");
                        }
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.nameRoom}
                      </TableCell>
                      <TableCell align="right">{row.numberUser}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateRoom;

const styleTitle: any = {
  marginBottom: "20px",
  fontSize: "50px",
  fontFamily: "cursive",
  fontWeight: "bold",
};

const styleBtn: any = {
  color: "#fff",
  background: "rgb(25, 118, 210)",
  borderRadius: "4px",
  height: "35px",
};
const styleModal: any = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
