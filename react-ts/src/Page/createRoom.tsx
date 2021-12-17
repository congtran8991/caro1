import React, { useEffect, useState, useContext } from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import SearchBar from 'material-ui-search-bar'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../Context/userContext'

interface listRoomKey {
    nameRoom: string
    numberUser: number
}
function CreateRoom() {
    const { socketIO } = useContext(DataContext)
    const [listRoom, setListRoom] = useState<listRoomKey[]>([])
    const [searched, setSearched] = useState<string>('')
    let history = useHistory()
    useEffect(() => {
        socketIO.on('receive_room', (data: any) =>
        {
            history.push({
                pathname: `/${data}`,
                state: { numberRoom: data,checkSearch:'nosearch' },
            })
        })
    }, [])
    useEffect(() => {
        socketIO.emit('send_list_room')
    }, [])
    useEffect(() => {
        socketIO.on('list_room', (data: any) => {
            setListRoom(data) // cần fix
        })
    }, [])
    useEffect(() => {
        socketIO.on('reveive_back', (data: any) => {
            if (window.performance) {
                if (performance.navigation.type == 1) {
                     window.location.reload()
                }
            }
        })
    }, [])
    const requestSearch = (searchedVal: string) => {
        const filteredRows = listRoom.filter((row) => {
            return row.nameRoom.includes(searchedVal)
        })
        setListRoom(filteredRows)
    }
    const cancelSearch = () => {
        setSearched('')
        requestSearch(searched)
    }
    return (
        <div className='flex h-100 justify-content-center align-items-start'>
            <div>
                <div className='text-center' style={{ marginBottom: '20px', fontSize: '50px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                    <span>Đại chiến</span> <span style={{ color: '#1976d2', fontSize: '60px' }}>Caro</span>
                </div>
                <div className='flex justify-content-center'>
                    <Button
                        style={{ color: '#fff', background: 'rgb(25, 118, 210)', borderRadius: '4px', height: '35px' }}
                        variant='contained'
                        onClick={async () => {
                            let numberRoom = String(Math.floor(Math.random() * 100000))
                            await socketIO.emit('create_room', numberRoom)
                        }}>
                        <div style={{ padding: '0 10px' }}>Tạo bàn mới</div>
                    </Button>
                    <div style={{ marginLeft: '10px', marginRight: '10px' }}></div>
                </div>

                <div>
                    <TableContainer component={Paper}>
                        <SearchBar value={searched} onChange={(searchVal) => requestSearch(searchVal)} onCancelSearch={() => cancelSearch()} />
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Danh sách phòng</TableCell>
                                    <TableCell align='right'>Số thành viên</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listRoom.map((row: any, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        onClick={async (e) => {
                                            if (row.numberUser < 2) {
                                                history.push({
                                                    pathname: `/${row.nameRoom}`,
                                                    state: { numberRoom: row.nameRoom, checkSearch: 'search',numberUser:row.numberUser },
                                                })
                                            } else
                                            {
                                                alert("Phòng đã đủ người chơi")
                                            }
                                        }}>
                                        <TableCell component='th' scope='row'>
                                            {row.nameRoom}
                                        </TableCell>
                                        <TableCell align='right'>{row.numberUser}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default CreateRoom

const styles: any = {
    border: '1px solid #dddddd',
    textAlign: 'center',
    cursor: 'pointer',
    width: '100px',
}
