import { useState } from 'react'
import './App.css'
import LoginScreen from './components/loginScreen'
import Footer from './components/Footer'
import HeaderHome from './components/HeaderHome'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Resultado from './components/Resultado'

import Carrossel from './components/Carrossel'


function App() {

  const [isLogin, setIsLogin] = useState(false)

  return (

    <div style={{ position: 'relative' }}>

      <Router>

        <Routes>

          <Route path='/' element={<Navigate replace to="/login" />} />

          <Route path='/login' element={ 
            <>
              <LoginScreen setIsLogin={setIsLogin} />
              <Footer />
            </>} />

          <Route path='/home' element={ isLogin ?
            <>
              <HeaderHome />
              <Home />
              <Footer />
            </>: <Navigate to='/' />} />

            <Route path="/resultado/:id" element={ isLogin ?
            <>
              <HeaderHome />
              <Resultado />
              <Footer />
            </>: <Navigate to='/' />} />

        </Routes>
      </Router>


    </div>

    

  )
}

export default App
