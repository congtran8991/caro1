import React, { useRef, useEffect, useState, useContext } from 'react'
import { Modal, Fade, Box, Typography, Backdrop, Button } from '@mui/material'
import { useLocation, useParams,useHistory } from 'react-router-dom'
import { DataContext } from '../Context/userContext'
import { checkWinNgang } from '../CheckWin/checkWinNgang'
import { checkWinDoc } from '../CheckWin/checkWinDoc'
import { checkWinCheoTrai } from '../CheckWin/checkWinCheoTrai'
import { checkWinCheoPhai } from '../CheckWin/checkWinCheoPhai'

interface XO_arrRef {
    x: number
    y: number
}
interface stateType {
    from: { pathname: string }
    numberRoom: string
    checkSearch: string
    numberUser:number
}
function Room() {
    let history = useHistory()
    const param:any = useParams();
    
    
    const { socketIO } = useContext(DataContext)
    const { state } = useLocation<stateType>()
    const [arrayTable, setArrayTable] = useState<Array<any>>([])
    const [checkInturn, setCheckInturn] = useState<boolean>(true)
    const [turn, setTurn] = useState<string>('X')
    const [showMessage, setShowMessage] = useState<boolean>(true)
    const ORef = useRef<XO_arrRef[]>([])
    const XRef = useRef<XO_arrRef[]>([])
    const [checkEndGame, setCheckEndGame] = useState<boolean>(false)
    const [checkTurn, setCheckTurn] = useState<string>('X')
    const [checkX, setCheckX] = useState<boolean>(true)
    const [checkUserTurn,setCheckUserTurn] = useState<boolean>(true)
    const handleClose = () => setCheckEndGame(false)
    useEffect(() => {
        socketIO.emit('send_list_room')
    }, [])
    useEffect(() => {
        createArr(15)
    }, [])
    useEffect(() => {
        return history.listen((location) => {
            if (history.action === 'POP') {
                socketIO.emit('back')
            }
        })
    }, [])

    useEffect(() =>
    {
        // if (XRef.current.length !== 0)
        // {
        
        socketIO.emit('search_room', param.id)
        // }
        socketIO.on('receive_search_room', (data: any) =>
        {
            // console.log(data.userOut);
            // console.log((XRef.current + ORef.current));
            
            setCheckTurn(data.turn)
            XRef.current = data.user1.dataWin
            ORef.current = data.user2.dataWin
            console.log(turn);
            console.log("scscs",data.userOut === "X" && ((XRef.current.length + ORef.current.length) % 2 == 1));
            
            if (data.userOut === "X" && (XRef.current.length + ORef.current.length) % 2 == 1)
            {
                socketIO.emit('play_tick', { check: true, dataRoom: param.id })
                setCheckUserTurn(false)
            } 

            if (data.userOut === "O" && (XRef.current.length + ORef.current.length) % 2 == 0)
            {
                socketIO.emit('play_tick', { check: true, dataRoom: param.id })
                setCheckUserTurn(false)
            } 

            if (data.dataTable.length !== 0) {
                setArrayTable(data.dataTable)
            }
            setTurn(data.turn)
            if (data.userOut === 'O') {
                setCheckInturn(false)
            } else {
                setCheckInturn(true)
            }
        })
    }, [])

    useEffect(() =>
    {
        socketIO.on('receive_first_search', (data:string) =>
        {
            setCheckTurn('X')
            setCheckX(false)
            setCheckUserTurn(false)
      })  
    }, [])

    useEffect(() =>
    {
        // console.log(!checkInturn && turn === 'O');
        // console.log(checkTurn);
        
        // if ((XRef.current.length + ORef.current.length) % 2 === 0 && checkTurn === 'O')
        // {
        //     console.log(checkTurn);
            
        //     socketIO.emit('play_tick', { check: true, dataRoom: param.id })
        //     setCheckUserTurn(false)
        // }
        socketIO.on('receive_play_tick', (data:boolean) =>
        {
            console.log("vdvd",data);
            
            setCheckUserTurn(data)
        })
    },[])
    console.log('turn',checkUserTurn ? "lượt mình": "lượt nta");
    
    useEffect(() => {
        socketIO.on('receive_play_check', (data: any) =>
        {
            if (data.turn === 'O') {
                checkWin(data.user1.dataWin, 'X')
                setCheckTurn('O')
                setShowMessage(false)
            } else {
                checkWin(data.user2.dataWin, 'O')
                setCheckTurn('X')
                setShowMessage(false)
            }
            XRef.current = data.user1.dataWin
            ORef.current = data.user2.dataWin
            setArrayTable(data.dataTable)
            setTurn(data.turn)
            if (data.turn === 'O') {
                setCheckInturn(false)
            } else {
                setCheckInturn(true)
            }
        })
    }, [])

    
    const onPlayTick = async (indexRow: number, indexColumn: number) => {
        let tamArrTable: any = arrayTable
        let dataSocket: {
            dataTable: any
            dataRoom: string
            turn: string
            dataWin: XO_arrRef[]
        }
        let coordinates: {
            x: number
            y: number
        } = {
            x: indexRow,
            y: indexColumn,
        }
        if (checkInturn && turn === 'X' && checkDuplicateTick(coordinates) && checkTurn==="X" && checkX === true)
        {
            tamArrTable[indexRow][indexColumn].checkClick = 'X'
            setCheckInturn(false)
            setCheckTurn('O')
            XRef.current.push(coordinates)
            dataSocket = {
                dataTable: [...tamArrTable],
                dataRoom: state.numberRoom,
                turn: turn,
                dataWin: XRef.current,
            }
            await socketIO.emit('send_play_check', dataSocket)
            await socketIO.emit('play_tick', { check: true, dataRoom: state.numberRoom })
            setCheckUserTurn(false)
            setArrayTable([...tamArrTable])
            checkWin(XRef.current, 'X')
            setShowMessage(true)
        } else if (!checkInturn && turn === 'O' && checkDuplicateTick(coordinates))
        {
            tamArrTable[indexRow][indexColumn].checkClick = 'O'
            setCheckInturn(true)
            setCheckTurn('X')
            ORef.current.push(coordinates)
            dataSocket = {
                dataTable: [...tamArrTable],
                dataRoom: state.numberRoom,
                turn: turn,
                dataWin: ORef.current,
            }
            await socketIO.emit('send_play_check', dataSocket)
            await socketIO.emit('play_tick', { check: true, dataRoom: state.numberRoom })
            setCheckUserTurn(false)
            setArrayTable([...tamArrTable])
            checkWin(ORef.current, 'O')
            setShowMessage(true)
        }
    }
    const checkWin = (checkWinRefData: XO_arrRef[], type: string) => {
        if (checkWinDoc(checkWinRefData) || checkWinNgang(checkWinRefData) || checkWinCheoTrai(checkWinRefData) || checkWinCheoPhai(checkWinRefData)) {
            setCheckEndGame(true)
        }
    }
    const checkDuplicateTick = (keyCheck: XO_arrRef) => {
        return (
            XRef.current.concat(ORef.current).filter((data, index) => {
                return data.x === keyCheck.x && data.y === keyCheck.y
            }).length === 0 
        )
    }
    const createArr = (numberArr: number) => {
        //assignable: gán
        let arrColumn: Array<object> = []
        for (let i = 0; i < numberArr; i++) {
            let arrChild: Array<object> = []
            for (let j = 0; j < numberArr; j++) {
                let dataObj: {
                    checkClick: string
                } = {
                    checkClick: '',
                }
                arrChild.push(dataObj)
            }
            arrColumn.push(arrChild)
        }
        setArrayTable(arrColumn)
    }

    const createTable = () => {
        // Tạo table trờ chơi
        let result = arrayTable.map((dataRow: any, index: number) => {
            return (
                <tr key={index}>
                    {dataRow.map((data: any, indexChild: number) => (
                        <td
                            onClick={() => {
                                if (state?.numberRoom) {
                                    onPlayTick(index, indexChild)
                                }
                            }}
                            key={indexChild}>
                            <div
                                className='flex justify-content-center align-items-center'
                                style={{ ...styles, color: data.checkClick === 'X' ? 'rgb(25, 118, 210)' : 'brown' }}>
                                {data.checkClick}
                            </div>
                        </td>
                    ))}
                </tr>
            )
        })
        return result || <tr></tr>
    }
    const modalMessage = () => {
        return (
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                open={checkEndGame}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={checkEndGame}>
                    <Box sx={styleModal}>
                        <Typography id='transition-modal-description' variant='h4' component='h2' className='text-center'>
                            {showMessage ? 'Chúc mừng bạn là người chiến thắng' : 'Chúc mừng bạn là một con gà'}
                        </Typography>
                        <Typography id='transition-modal-description' sx={{ mt: 1 }} variant='h6' component='h2' className='text-center'>
                            Bạn có muốn bắt đầu ván mới không
                        </Typography>
                        <Typography
                            id='transition-modal-description'
                            sx={{ mt: 1 }}
                            variant='h6'
                            component='h2'
                            className='flex text-center justify-content-center'>
                            <Button
                                onClick={() => {
                                    socketIO.emit('new_game', { dataRoom: state.numberRoom })
                                    createArr(15)
                                    handleClose()
                                    XRef.current = []
                                    ORef.current = []
                                }}
                                style={{ color: '#fff', background: 'rgb(25, 118, 210)', borderRadius: '4px', height: '35px', width: '120px' }}
                                variant='contained'>
                                <div style={{ padding: '0 10px' }}>Đồng ý</div>
                            </Button>
                            <div style={{ width: '30px' }}></div>
                            <Button
                                onClick={async () => {
                                    await socketIO.emit('back')
                                    history.push({
                                        pathname: `/`,
                                    })
                                }}
                                style={{ color: 'rgb(25, 118, 210)', borderRadius: '4px', height: '35px', width: '120px' }}
                                variant='outlined'>
                                <div style={{ padding: '0 10px' }}>Rời phòng</div>
                            </Button>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        )
    }
    return (
        <>
        <div className='flex h-100 justify-content-between align-items-center'>
            <div>
                <div className='text-center'>
                    <span style={{...styleTextXy,color:'blue',opacity:(checkTurn === 'X') ? 1 : 0.2}}>X</span>
                </div>
                    <img style={{ paddingTop: '20px' }} src="https://kenh14cdn.com/203336854389633024/2020/12/31/unnamed-16094336835851157908418.jpg" width={300} alt="" />
                    <div>Lượt của bạn</div>
            </div>
                {modalMessage()}
                <div>
                    <div className='text-center'  onClick={async () => {
                                    await socketIO.emit('back')
                                    history.push({
                                        pathname: `/`,
                                    })
                                }}>Rời phòng</div>
                    <br></br>
                    <div className='text-center'>{checkTurn === "X" ? "Lượt của X" : "lượt của 0"}</div>
                    <div className='text-center'>Phòng: {param.id}</div>
                <table className='borderCollapse'>
                <tbody>
                    {createTable()}
                </tbody>
            </table>
                </div>
            <div>
                <div className='text-center'>
                   <span style={{...styleTextXy,color:'brown',opacity:(checkTurn !== 'X') ? 1 : 0.2}}>0</span>
                </div>
                    <img style={{ paddingTop: '20px' }} src="https://kenh14cdn.com/203336854389633024/2020/12/31/unnamed-16094336835851157908418.jpg" width={300} alt="" />
                    <div>Lượt của bạn</div>
            </div>
        </div>
           
        </>
    )
}

export default Room

const styles: any = {
    border: '3px outset white',
    width: '25px',
    height: '25px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#d3d3d3',
    fontFamily: 'cursive',
    fontWeight: '800',
    fontSize: '25px',
}
const styleModal: any = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const styleTextXy: any = {
    fontSize: '100px',
    fontFamily: 'cursive',
    fontWeight: '700'
}
