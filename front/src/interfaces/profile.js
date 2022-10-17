import React, {useEffect, useState} from 'react';
import "./profile.css";
import axios from "axios"; // requête qui communique entre front et back
import { EditText, EditTextarea} from "react-edit-text";

const cardURL = 'http://localhost:5001/cards';

const Profile = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState(null);
    const [listener, setListener] = useState("");
    const [email, setEmail] = useState("");
    const [cardlist, setCardlist] = useState("");
    const userId = localStorage.getItem("userId");

    const registerCard = async () => {
        await axios.post(cardURL, {email, phone, name, company, userId })
            .then((res ) => {
                setListener(res.data._id) // Dès que user change reload la page.
            })
    };

    const editCard = async () => {
        await axios
    }

    const fetchCards = async (userId) => {
        const cards = await axios.get(cardURL + "/" + userId);
        setCardlist(cards.data);
    };

    const logout = async () => {
        localStorage.clear()
        window.location.assign("/login")
    };

    useEffect(() =>{
        if(localStorage.getItem("userId") === null){
            window.location.assign("/login")
        } //Le useEffect s'active dàs qu'une variable est moodifiée
        fetchCards(userId)
    }, [])

    useEffect(() =>{
      fetchCards(userId)
    }, [listener])

    return (
        <>
        <div>
            <div className="section">
                <input className='descr' type="text" name="email" id="email" placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
                <input className='descr' type="text" name="email" id="email" placeholder=" Company " onChange={(e) => {setCompany(e.target.value)}}/>
                <input className='descr' type="text" name="email" id="email" placeholder=" Email " onChange={(e) => {setEmail(e.target.value)}}/>
                <input className='descr' type="text" name="email" id="email" placeholder=" Phone number " onChange={(e) => {setPhone(e.target.value)}}/>
                <input type="button" value="CREATE" onClick={() => registerCard()}/>
                <button className="logoutbutton" type="button"  onClick={() => logout()}>
                    LOGOUT
                </button>
            </div>
        </div>
            <div>
                <div className="card-list">
                {cardlist && cardlist.map((card) => {
                    return(
                            <div className="card">
                                <p>Name: {card.name}</p>
                                <p>Email: {card.email}</p>
                                <p>Company: {card.company}</p>
                                <p>Phone number: {card.phone} </p>
                                <button className="editbutton" type="button" onClick={() => editCard() }> EDIT</button>
                            </div>
                    )
                })}
                </div>
            </div>
        </>
    );
};
export default Profile;
