import React from 'react'
import { Routes, Route } from "react-router-dom"

import Nav from "./nav/Nav"
import Home from './home/Home'
import Park from './park/Park'
import Journal from './journal/Journal'


function App() {

    return (
        <>
            <Nav />

            {/* router: conditionally renders components based on path */}
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/park" element={<Park />} />
                <Route exact path="/journal" element={<Journal />} />

            </Routes>
        </>
    )
}

export default App
