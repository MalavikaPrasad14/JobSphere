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
import JobList from './pages/Recruiter/Joblist'
import Applied from './pages/Job Seeker/Appliedjob'
import UserShortlisted from './pages/Job Seeker/UserShortlisted'
import RProfile from './pages/Recruiter/RProfileSetup'
import UpdateProfileDialog from './pages/Recruiter/UpdateProfileDialog'
import ViewProfile from './components/Viewprofile'
// import HelpPage from './components/HelpPage'


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
        <Route path="/recruiter/addJob"  element={<JobPostForm />} />
        <Route path="/recruiter/application" element={<JobApplicationsTable />} />
        <Route path="/recruiter/shortlisted" element={<Shortlisted/>} />
        <Route path="/recruiter/JobList" element={<JobList/>} />
        <Route path="/jobSeeker/applied" element={<Applied/>} />
        <Route path="/jobSeeker/shortlisted" element={<UserShortlisted/>} />
        {/* <Route path="/help" element={<HelpPage/>} /> */}
        <Route path="/recruiter/profile" element={<RProfile/>} />
        <Route path="/recruiter/update" element={<UpdateProfileDialog/>} />
        <Route path="/profile" element={<ViewProfile/>} />
      </Routes>
    </>
  )
}

export default App
