import { useState, useEffect } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import "../css/WelcomePage.css";
import log from '../assets/orangelogo.png';

import { setLoading, setUser } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';

function LoginSignup() {
    const [isActive, setIsActive] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState('');
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(null);
    const toggleForm = () => setIsActive(!isActive);
    const [registerData, setRegisterData] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: 'student',
    });
    
    
    
   
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoad(true);
        setLoginError('');
        setLoginData('');

        const { email, password } = loginData;
        try {
            const response = await axios.post("http://localhost:3000/api/login", { email, password });
            const { access_token, refresh_token, user } = response.data;
    
            // Save the token and user info in localStorage
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('user', JSON.stringify(user)); // Store user data
           
            setLoginData('Login successful');
            navigate('/home');
        } catch (error) {
            setLoginData(error.response ? error.response.data.message : 'Error logging in');
        } finally {
            setLoad(false);
        }
    };
    
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
    
            // Ensure 'role' defaults to 'student' if not provided
            const dataToSubmit = { ...registerData, role: registerData.role || "student" };
    
            // API call to register the user
            const res = await axios.post("http://localhost:3000/api/register", dataToSubmit, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            // Handle success response
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/user");
                toast.success(res.data.message || "Registration successful");
            } else {
                toast.error(res.data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };
    
   
    
    



    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    return (
        <>
        {/* Navbar */}
            <header className="navbar">                <div className="logo">
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
    <input
        type="text"
        placeholder="Full Name"
        name="fullname"
        value={registerData.fullname}
        onChange={handleRegisterChange}
    />
    <input
        type="email"
        placeholder="Email"
        name="email"
        value={registerData.email}
        onChange={handleRegisterChange}
    />
    <input
        type="text"
        placeholder="Phone Number"
        name="phoneNumber"
        value={registerData.phoneNumber}
        onChange={handleRegisterChange}
    />
    <input
        type="password"
        placeholder="Password"
        name="password"
        value={registerData.password}
        onChange={handleRegisterChange}
    />
    <button type="submit">Sign Up</button>
    {error && <p className="error-message">{error}</p>}
</form>

                </div>

                {/* Sign-in form */}
                <div className="form-container sign-in">
                    <form onSubmit={handleLoginSubmit}>
                        <h1>Sign In</h1>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={handleChange}
                        />
                        <a href="#">Forget Your Password?</a>
                        <button type="submit">Sign In</button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>

                {/* Toggle panels */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all site features</p>
                            <button className="hidden" id="login" onClick={toggleForm}>Sign In</button>

                            <Link to={'/CompanyReg'}><Button className="Hidden" id="login"  >I'M an Employer</Button> </Link>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all site features</p>
                            <button className="hidden" id="register" onClick={toggleForm}>Sign Up</button>

                        </div>





                    </div>



                </div>
            </div>

        </>
    );
}

export default LoginSignup;
