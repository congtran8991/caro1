import React, { useRef, useEffect, useState, useContext } from "react";
import { Modal, Fade, Box, Typography, Backdrop, Button } from "@mui/material";
import { useLocation, useParams, useHistory, Redirect } from "react-router-dom";
import { DataContext } from "../Context/userContext";
import { checkWinNgang } from "../CheckWin/checkWinNgang";
import { checkWinDoc } from "../CheckWin/checkWinDoc";
import { checkWinCheoTrai } from "../CheckWin/checkWinCheoTrai";
import { checkWinCheoPhai } from "../CheckWin/checkWinCheoPhai";
import { setTimeout } from "timers";

interface XO_arrRef {
  x: number;
  y: number;
}
interface stateType {
  from: { pathname: string };
  numberRoom: string;
  namePlayer: string;
  numberUser: number;
}
function Room() {
  let history = useHistory();
  const param: any = useParams();

  const { socketIO } = useContext(DataContext);
  const { state } = useLocation<stateType>();
  const [arrayTable, setArrayTable] = useState<Array<any>>([]);
  const [turn, setTurn] = useState<string>("X");
  const [showMessage, setShowMessage] = useState<string>('');
  const ORef = useRef<XO_arrRef[]>([]);
  const XRef = useRef<XO_arrRef[]>([]);
  const [checkEndGame, setCheckEndGame] = useState<boolean>(false);
  const [nameUser1, setNameUser1] = useState<string>('#X')
  const [nameUser2, setNameUser2] = useState<string>('#O')
  const [checkClick,setCheckClick] = useState<boolean>(false)
  const handleClose = () => setCheckEndGame(false);
  useEffect(() => {
    socketIO.emit("send_list_room");
  }, []);
  useEffect(() => {
    createArr(15);
  }, []);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'POP') {
        socketIO.emit('back')
      }
    })
  }, [])

  useEffect(() => {
    socketIO.emit('search_room', { numberRoom: state.numberRoom, namePlayer: state.namePlayer })
    socketIO.on('receive_search_room', (data: any) => {
      setNameUser1(data[param.id]?.user1?.name)
      setNameUser2(data[param.id]?.user2?.name)
      setTurn(data[param.id].turn)
      XRef.current = data[param.id].user1.dataWin
      ORef.current = data[param.id].user2.dataWin
      if (data[param.id].dataTable.length) {
        setArrayTable(data[param.id].dataTable)
      }
      console.log(data[param.id].user1.clickPlay);
      console.log(data[param.id].user2.clickPlay);
      
      if(data[param.id].user1.clickPlay === true && data[param.id].user2.clickPlay === true){
        setCheckClick(true)
      }else{
        setCheckClick(false)
      }
    })
  }, [])

  useEffect(() => {
    socketIO.on("receive_play_check", (data: any) => {
      if (data[param.id].dataTable.length > 0) {
        setArrayTable(data[param.id].dataTable);
        setTurn(data[param.id].turn);
        XRef.current = data[param.id].user1.dataWin
        ORef.current = data[param.id].user2.dataWin
        setTimeout(() => {
            checkWin(data[param.id].user1.dataWin, 'X')
            checkWin(data[param.id].user2.dataWin, 'O')
        }, 500)
      }
    });
  }, []);

  useEffect(() => {
    socketIO.on("receive_send_message_win", (data: boolean) => {
      if(data){
        setShowMessage("Chúc mừng bạn là người chiến thắng.")
      }else{
        setShowMessage("Thua rồi. Gà quá về luyện thêm đi.")
      }
    })
  }, [])

  const onPlayTick = async (indexRow: number, indexColumn: number) => {
    if(!checkClick){
      alert("Phòng chưa đủ thành viên hoặc thành viên chưa sẵn sàng!")
      return 
    }
    let tamArrTable: any = arrayTable;
    let dataSocket: {
      dataTable: any;
      dataRoom: string;
      turn: string;
      dataWin: XO_arrRef[];
    };
    let coordinates: {
      x: number;
      y: number;
    } = {
      x: indexRow,
      y: indexColumn,
    };
    if (turn === "X" && state.namePlayer === nameUser1 && checkDuplicateTick(coordinates)) {
      tamArrTable[indexRow][indexColumn].checkClick = "X";
      XRef.current.push(coordinates);
      dataSocket = {
        dataTable: [...tamArrTable],
        dataRoom: param.id,
        turn: turn,
        dataWin: XRef.current,
      };
      await socketIO.emit("send_play_check", dataSocket);
    } else if (turn === "O" && state.namePlayer === nameUser2 && checkDuplicateTick(coordinates)) {
      tamArrTable[indexRow][indexColumn].checkClick = "O";
      ORef.current.push(coordinates);
      dataSocket = {
        dataTable: [...tamArrTable],
        dataRoom: param.id,
        turn: turn,
        dataWin: ORef.current,
      };
      await socketIO.emit("send_play_check", dataSocket);
    }
  };
  const checkWin = (checkWinRefData: XO_arrRef[], type: string) => {
    if (
      checkWinDoc(checkWinRefData) ||
      checkWinNgang(checkWinRefData) ||
      checkWinCheoTrai(checkWinRefData) ||
      checkWinCheoPhai(checkWinRefData)
    ) {
      socketIO.emit("send_message_win", { room: param.id, type: type });
      setCheckEndGame(true)
    }
  };
  const checkDuplicateTick = (keyCheck: XO_arrRef) => {
    return (
      XRef.current.concat(ORef.current).filter((data, index) => {
        return data.x === keyCheck.x && data.y === keyCheck.y;
      }).length === 0
    );
  };
  const createArr = (numberArr: number) => {
    //assignable: gán
    let arrColumn: Array<object> = [];
    for (let i = 0; i < numberArr; i++) {
      let arrChild: Array<object> = [];
      for (let j = 0; j < numberArr; j++) {
        let dataObj: {
          checkClick: string;
        } = {
          checkClick: "",
        };
        arrChild.push(dataObj);
      }
      arrColumn.push(arrChild);
    }
    setArrayTable(arrColumn);
  };

  const createTable = () => {
    // Tạo table trờ chơi
    let result = arrayTable.map((dataRow: any, index: number) => {
      return (
        <tr key={index}>
          {dataRow.map((data: any, indexChild: number) => (
            <td
              onClick={() => {
                if (state?.numberRoom) {
                  onPlayTick(index, indexChild);
                }
              }}
              key={indexChild}
            >
              <div
                className="flex justify-content-center align-items-center"
                style={{
                  ...styles,
                  color:
                    data.checkClick === "X" ? "rgb(25, 118, 210)" : "brown",
                }}
              >
                {data.checkClick}
              </div>
            </td>
          ))}
        </tr>
      );
    });
    return result || <tr></tr>;
  };
  const modalMessage = () => {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={checkEndGame}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={checkEndGame}>
          <Box sx={styleModal}>
            <Typography
              id="transition-modal-description"
              variant="h4"
              component="h2"
              className="text-center"
            >
              {showMessage}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 1 }}
              variant="h6"
              component="h2"
              className="text-center"
            >
              Bạn có muốn bắt đầu ván mới không
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 1 }}
              variant="h6"
              component="h2"
              className="flex text-center justify-content-center"
            >
              <Button
                onClick={() => {
                  createArr(15);
                  handleClose();
                  socketIO.emit('continue_game', { numberRoom: state.numberRoom, namePlayer: state.namePlayer })
                }}
                variant="contained"
              >
                <div>Đồng ý</div>
              </Button>
              <div style={{ width: "30px" }}></div>
              <Button
                onClick={async () => {
                  await socketIO.emit("back");
                  XRef.current = [];
                  ORef.current = [];
                  createArr(15);
                  history.push({
                    pathname: `/`,
                  });
                }}
                variant="outlined"
              >
                <div>Rời phòng</div>
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    );
  };
  return (
    <>
      <div className="flex h-100 justify-content-center align-items-center">
        {modalMessage()}
        <div>
          <table className="borderCollapse">
            <tbody>{createTable()}</tbody>
          </table>
        </div>
        <div style={{ height: '490px', width: '290px', border: "1px solid black" }}>
          <div style={{ padding: "10px" }}>
            <div className="flex justify-content-between" style={{ borderBottom: "1px solid black", paddingBottom: '10px' }}>
              <div style={{color:"#1976d2",fontWeight:"bold"}}>{param.id}</div>
              <div style={{fontWeight:"bold", color:turn === "X" ? "#1976d2" : "#a52a2a"}}>{`Lượt của ${turn}`}</div>
            </div>
            <div className="flex justify-content-between mt-1">
              <div>
                <div style={{color:"#1976d2",fontWeight:"bold"}}>#X</div>
                <Button style={{ width: '100px' }} variant={turn === 'X' ? 'contained' : 'outlined'}>
                  <span>{nameUser1 || "#X"}</span>
                  {""}
                  <span onClick={(e) => {
                    e.stopPropagation()
                  }}>{ }</span>

                </Button>
              </div>
              <div>
                <div style={{color:"#a52a2a",fontWeight:"bold"}}>#O</div>
                <Button onClick={async () => {
                  await socketIO.emit("type", { type: "O", namePlayer: state.namePlayer, numberRoom: param.id });
                }} style={{ width: '100px'}} variant={turn === 'O' ? 'contained' : 'outlined'}>{nameUser2 || "#O"}</Button></div>
            </div>
            <div className="mt-1" style={{ borderBottom: "1px solid black", paddingBottom: '10px' }}>Chát</div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Room;

const styles: any = {
  border: "3px outset white",
  width: "25px",
  height: "25px",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "#d3d3d3",
  fontFamily: "cursive",
  fontWeight: "800",
  fontSize: "25px",
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

const styleTextXy: any = {
  fontSize: "100px",
  fontFamily: "cursive",
  fontWeight: "700",
};

const styleBtn1: any = {
  color: "#fff",
  background: "rgb(25, 118, 210)",
  borderRadius: "4px",
  height: "35px",
  width: "120px",
};

const styleBtn2: any = {
  color: "rgb(25, 118, 210)",
  borderRadius: "4px",
  height: "35px",
  width: "120px",
};
