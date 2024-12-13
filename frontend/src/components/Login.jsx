import { useState, useEffect } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import "../css/WelcomePage.css";
import log from '../assets/orangelogo.png';
import { USER_API_END_POINT } from '../utils/constant';
import { setLoading, setUser } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';


function LoginSignup() {
    const [isActive, setIsActive] = useState(false);
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
    
    });
     const toggleForm = () => setIsActive(!isActive);
    const [registerData, setRegisterData] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: 'student',
    });
    
    
    const [error, setError] = useState(null);
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({ ...prevInput, [name]: value }));
    };

    // const handleRegisterChange = (e) => {
    //     const { name, value } = e.target;
    //     setRegisterData((prevData) => ({ ...prevData, [name]: value }));
    // };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                 
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/home");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
            alert("something wrong")
        } finally {
            dispatch(setLoading(false));
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
            const dataToSubmit = { ...registerData, role: registerData.role || "student" };
            const res = await axios.post(`${USER_API_END_POINT}/register`, registerData, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/home");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
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
                            value={input.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={input.password}
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
