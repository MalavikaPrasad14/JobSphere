// export default ComRegister;
import { useState } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import company_icon from '../assets/companyicon.jpg'
import "../css/WelcomePage.css"; 
import log from '../assets/orangelogo.png'

function CompanyReg() {
    const [isActive, setIsActive] = useState(false);
    const [loginData, setLoginData] = useState({ userEmail: '', password: '' });
    const [registerData, setRegisterData] = useState({ username: '', userEmail: '', password: '', phone: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleForm = () => setIsActive(!isActive);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (isActive) {
            setRegisterData({ ...registerData, [name]: value });
        } else {
            setLoginData({ ...loginData, [name]: value });
        }
        setError(''); // Clear error when typing
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axiosInstance.post("/user/login", loginData);
            alert(res.data.message);
            if (res.data.usertoken) {
                localStorage.setItem("token", res.data.usertoken);
                navigate('/');
            }
        } catch (err) {
            setError("Invalid Credentials");
            console.error(err);
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axiosInstance.post("/user/register", registerData);
            alert(res.data.message);
            setIsActive(false);
        } catch (err) {
            setError("Registration failed. Please try again.");
            console.error(err);
        }
    };

    return (
        <>
        {/* <header className="navbar">
        <div className="logo">
          <img src="/path/to/logo.png" alt="EcoCollect Logo" />
          <span>JOB PORTAL</span>
        </div>
        <nav className="nav-links">
          
          <Link to={'/'}><a href="#home">Home</a></Link>
          
          
          <Link to={'/'}><a href="#price-sheet">About us</a></Link>
         
         
          <Link to={'/login'}> <a href="#about-us">Join</a></Link>
        </nav>
        
      </header> */}
      {/* Navbar */}
      <header className="navbar">
          <div className="logo">
            <img src={log} alt="JobSphere Logo"
              style={{ width: 90, height: 90 }} />
            <span style={{ fontWeight: 600, fontSize: 25 }}>JobSphere</span>
          </div>
          <nav className="nav-links">

            <Link to={'/'}><a href="#home">Home</a></Link>


            <Link to={'/aboutus'}><a href="#price-sheet">About us</a></Link>


            <Link to={'/login'}> <a href="#about-us">Join</a></Link>
          </nav>

        </header>
        <div className={`container ${isActive ? 'active' : ''}`} id="container">
            {/* Sign-up form */}
            <div className="form-container sign-up">
                <form onSubmit={handleRegisterSubmit}>
                    <h1>Create Account</h1>
                
                    <button type="submit">Sign Up</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>

            {/* Sign-in form */}
            <div className="form-container sign-in">
                <form onSubmit={handleLoginSubmit}>
                    <h2> COMPANY SIGN UP</h2>
                    <input type="text" placeholder="Name" name="username" value={registerData.username} onChange={handleChange} />
                    <input type="email" placeholder="Email" name="userEmail" value={registerData.userEmail} onChange={handleChange} />
                    <input type="text" placeholder="Phone" name="phone" value={registerData.phone} onChange={handleChange} />

                    <input type="password" placeholder="Password" name="password" value={registerData.password} onChange={handleChange} />
                    <input type="password" placeholder=" Confirm Password" name="password" value={registerData.password} onChange={handleChange} />
                   
            <Link to={'/recruiter'}> <button type="submit">Sign In</button></Link>
                   
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>

            {/* Toggle panels */}
   <div className="toggle-container">
                <div className="toggle">
                   
                    <div className="toggle-panel toggle-right">
                      
                    <img src={company_icon} alt="Instagram" style={{ width: '240px', height: '240px' }} />

                    </div>
                    
                </div>
             

                    
            </div>
        </div>
        </>
    );
}



export default CompanyReg;