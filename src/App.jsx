import { useState } from 'react'
import useLocalStorage from './Hook/LocalStorage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './components/Main'
import Footer from './components/Footer'
import Nav from './components/Nav'
import ListJersey from './components/ListJersey'
import Infos from './components/Infos'
import Admin from './components/Admin'
import DetailJersey from './components/DetailJersey'



function App() {
  

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/jersey' element={<ListJersey />} />
        <Route path='/infos' element={<Infos/>}/>      
        <Route path='/admin' element={<Admin />} />
        <Route path='/jersey/:id' element={<DetailJersey/>}/>

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
