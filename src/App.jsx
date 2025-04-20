import React from "react"
import { BrowserRouter, Routes ,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import CreateTodo from "./components/CreateTodo";
import ReadTodo from "./components/ReadTodo"
import UpdateTodo from "./components/UpdateTodo"

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<CreateTodo/>}/>
        <Route path="/read" element={<ReadTodo/>}/>
        <Route path="/edit/:id" element={<UpdateTodo/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
