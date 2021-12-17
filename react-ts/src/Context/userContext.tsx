import React, { createContext,memo } from 'react'
import io from 'socket.io-client'
export const DataContext = createContext<any>(null)
// const CONNECTION_PORT = 'localhost:3002/'
let CONNECTION_PORT 
if (process.env.NODE_ENV === "development")
{
  CONNECTION_PORT = 'localhost:3002/'
} else
{
  CONNECTION_PORT = 'https://caro-king.herokuapp.com/'
}
let socket: any = io(CONNECTION_PORT, { transports: ['websocket'] })
const LoadingContextProvider: React.FC<React.ReactNode> = ({ children }) =>
{
  const ContextData : {
    socketIO : any
  } = {
    socketIO:socket
  }
  // Return provider
  return (
    <DataContext.Provider value={ContextData}>
      {children}
    </DataContext.Provider>
  )
}

export default memo(LoadingContextProvider)