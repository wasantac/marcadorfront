import React,{useEffect,useState} from 'react';
import {io} from 'socket.io-client';
const Marcador = () => {
    const [socket,setSocket] = useState();
    useEffect(() => {
        const s = io("https://marcadorback.herokuapp.com/")
        setSocket(s);
        s.on("receive-data", data => {
            console.log(data)
        })
        return () => {
            s.disconnect();
        }
    },[])
    return (
        <div>
            
        </div>
    );
}

export default Marcador;
