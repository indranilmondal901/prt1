import React, { useState } from 'react';
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import "../login/Login.css";

const Login = () => {
    const navigate = useNavigate()
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/login", { username, password })
            .then((res) => {
                console.log(res.data.token);
                localStorage.setItem("token",res.data.token)
                window.alert(res.data.message)
                navigate("/home")
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
                <h1 style={{textAlign:"center"}}>LOGIN</h1>
            <form>
                <input type='text' required onChange={(e) => { setusername(e.target.value) }} value={username} placeholder='email' />
                <input type='password' required onChange={(e) => { setpassword(e.target.value) }} value={password} placeholder='password' />
                <button type='submit' onClick={handleSubmit}>Submit</button>
                <p>Don't have account? <Link to="/register">Click here</Link> </p>
            </form>
        </div>
    )
}

export default Login
