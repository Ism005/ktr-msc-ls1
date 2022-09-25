import React, { useState } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
const userURL = 'http://localhost:5001/users/login';

const Login =  () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState(null);
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUsers = async () => {
        await axios.post(userURL, {email, password})
            .then((res ) => {
                if(res.status === 200){
                    console.log(res.data);
                    setUser(res.data)
                    localStorage.setItem("accessToken", res.data.authTokens[0].authToken);
                    localStorage.setItem("userId", res.data._id);
                    window.location.assign("/profile");
                }
            })
    }

    return (
        <div>
            <div className="container">
                <form name="RegForm" id="inscription">
                    <h1>LOGIN</h1>
                    <input className='descr' type="email" name="email" id="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} /><br/>
                    <input className='descr' type="password" name="username" id="username" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/><br/>
                        <button type="button"  onClick={() => loginUsers()}>
                           LOGIN
                        </button>
                    <Link to={"/"}>Register</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;