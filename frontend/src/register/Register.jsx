import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "../register/Register.css"

const Register = () => {
    const navigate = useNavigate()
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            axios.post("https://prt1b.onrender.com/register", { username, password })
                .then((res) => {
                    console.log(res);
                    window.alert(res.data.essage);
                    navigate("/");
                }).catch((err) => {
                    console.log(err)
                })
        } else {
            window.alert("Password and Confirm Password is different")
        }
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}> Register Here</h1>
            <form>
                <input type='text' required onChange={(e) => { setusername(e.target.value) }} value={username} placeholder='email' />
                <input type='password' required onChange={(e) => { setpassword(e.target.value) }} value={password} placeholder='password' />
                <input type='password' required onChange={(e) => { setconfirmPassword(e.target.value) }} value={confirmPassword} placeholder='confirm password' />
                <button type='submit' onClick={handleSubmit}>Submit</button>
                <p>Already have account? <Link to="/">click here</Link> </p>
            </form>
        </div>
    )
}

export default Register
