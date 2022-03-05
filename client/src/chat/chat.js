import React, { useState, useEffect } from "react";
import io from "socket.io-client";


const ENDPOINT = 'http://localhost:5000/';

const chat = () =>{
    const [name,setName] = useState('') ;
    const [room,setRoom] = useState('') ;
    const [message,setMessage] = useState('') ;
    const [messsages,setMessages] = useState([]) ;
    
    useEffect(()=>{
        setName("Arshad") ;
        setRoom("Arshad") ;

        const fetchMsgs = async() => {
            const res = await axios.get('/api/room/Arshad' );
            setMessages(res.data);
        }
    })




}