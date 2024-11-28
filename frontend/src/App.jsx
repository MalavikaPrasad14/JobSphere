import { useState } from 'react'
import './App.css'
import WelcomePage from './components/WelcomePage'
import { Route, Routes } from 'react-router-dom'
import About from './components/AboutUs'
import LoginSignup from './components/Login'
import CompanyReg from './components/CompanyReg'
import Home from './components/Home'
import RecruiterProfile from './pages/Recruiter/RecruiterProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/CompanyReg" element={<CompanyReg />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recruiter" element={<RecruiterProfile />} />
      </Routes>
    </>
  )
}

export default App
