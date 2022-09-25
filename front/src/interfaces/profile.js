import React, {useEffect, useState} from 'react';
import axios from "axios";
const cardURL = 'http://localhost:5001/cards';

const Profile = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState(null);
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cardlist, setCardlist] = useState("");
    const userId = localStorage.getItem("userId");

    const registerCard = async () => {
        await axios.post(cardURL, {email, phone, name, company, userId })
            .then((res ) => {
                setUser(res.data._id) // Dès que user change reload la page.
            })
    };

    const fetchCards = async (userId) => {
        const cards = await axios.get(cardURL + "/" + userId);
        setCardlist(cards.data);
    }

    const logout = async () => {
        localStorage.clear()
        window.location.assign("/login")

    }

    useEffect(() =>{
        if(localStorage.getItem("userId") === null){
            window.location.assign("/login")
        }
        fetchCards(userId)
    }, [])

    useEffect(() =>{
      fetchCards(userId)
    }, [user])

    return (
        <>
        <div>

            <input className='descr' type="text" name="email" id="email" placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
            <input className='descr' type="text" name="email" id="email" placeholder=" Company " onChange={(e) => {setCompany(e.target.value)}}/>
            <input className='descr' type="text" name="email" id="email" placeholder=" Email " onChange={(e) => {setEmail(e.target.value)}}/>
            <input className='descr' type="text" name="email" id="email" placeholder=" Phone number " onChange={(e) => {setPhone(e.target.value)}}/>
            <input type="button" value="CREATE" onClick={() => registerCard()}/>
            <button type="button"  onClick={() => logout()}>
                LOGOUT
            </button>
        </div>

            <div>
                <div className="card-list">
                {cardlist && cardlist.map((card) => {
                    return(
                            <div className="card">
                                <p> {card.name}</p>
                                <p> {card.email}</p>
                                <p> {card.company}</p>
                                <p> {card.phone} </p>
                            </div>
                    )
                })}
                </div>
            </div>

        </>
    );
};

export default Profile;