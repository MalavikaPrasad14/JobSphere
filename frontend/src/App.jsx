import { useState } from 'react'
import './App.css'
import WelcomePage from './components/WelcomePage'
import { Route, Routes } from 'react-router-dom'
import About from './components/AboutUs'
import LoginSignup from './components/Login'
import CompanyReg from './components/CompanyReg'
import Home from './components/Home'
import RecruiterProfile from './pages/Recruiter/RecruiterProfile'
import UserProfile from './pages/Job Seeker/UserProfile'
import Single from './components/Single'
import JobPostForm from './pages/Recruiter/JobPostForm'
import JobApplicationsTable from './pages/Recruiter/Application'
import Shortlisted from './pages/Recruiter/Shortlisted'


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
        <Route path="/user" element={<UserProfile />} />
        <Route path="/home/single" element={<Single />} />
        <Route path="/newjob" element={<JobPostForm />} />
        <Route path="/recuiter/application" element={<JobApplicationsTable />} />
        <Route path="/recuiter/shortlisted" element={<Shortlisted/>} />
      </Routes>
    </>
  )
}

export default App
