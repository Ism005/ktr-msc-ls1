import "./register.css"
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import logo from "../img/geo-fill.svg";
const registerURL = 'http://localhost:5001/register';



const Register = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const registerUsers = async () => {
        await axios.post(registerURL, {email, password, phone, name, company })
            .then((res ) => {
                if (res.status === 201) window.location.assign("/login")
            })
    }

    return (
        <div className="container">
            <form className="regisform" id="inscription">
                <img className="logo" src={logo} alt=""/>
                <h1>REGISTER</h1>
                <input  type="text" name="username" id="username" placeholder="Name" onChange={(e) => {setName(e.target.value)}}/><br/>
                <input className='descr' type="text" name="username" id="username" placeholder="Company name" onChange={(e) => {setCompany(e.target.value)}} /><br/>
                <input className='descr' type="password" name="username" id="username" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/><br/>
                <input className='descr' type="email" name="username" id="username" placeholder="Email" onChange={(e) =>{setEmail(e.target.value)}}/><br/>
                <input  type="text" name="username" id="username" placeholder="Phone number"  onChange={(e) =>{setPhone(e.target.value)}} /><br/>
                <input className="registerbutton" type="button" value="CREATE" onClick={() => registerUsers()}/>
                <Link className="link" to={"/login"}>Login</Link>
            </form>
        </div>
    );
    }


export default Register;