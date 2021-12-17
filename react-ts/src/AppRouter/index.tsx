//import React, { Component, useContext, useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ThemeContextProvider from '../Context/userContext'
import { routes } from './routes'
// import io from 'socket.io-client'
// const CONNECTION_PORT = 'localhost:3002/'
// let socket: any
function AppRouter() {
    const showContentMenus = () => {
        let result = routes.map((router: any, index: number) => {
            return (
                <Route key={index} exact={router?.exact} path={router?.path}>
                    {router?.main}
                </Route>
            )
        })
        return <Switch>{result}</Switch>
    }
    return (
        <ThemeContextProvider>
            <BrowserRouter>
                <Switch>{showContentMenus()}</Switch>
            </BrowserRouter>
        </ThemeContextProvider>
    )
}

export default AppRouter
