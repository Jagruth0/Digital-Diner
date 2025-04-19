import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Menu from "./pages/Menu";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/menu' element={<Menu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
