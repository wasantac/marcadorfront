import React,{useEffect,useState} from 'react';
import {io} from 'socket.io-client';
const Main = () => {
    const [playerone,setOne] = useState("player1");
    const [p1points,setP1] = useState(0);
    const [playertwo,setTwo] = useState("player2");
    const [p2points,setP2] = useState(0);
    const [socket,setSocket] = useState();
    useEffect(() => {
        const s = io("https://marcadorback.herokuapp.com/")
        setSocket(s);
        return () => {
            s.disconnect();
        }
    },[])
    return (
        <div>
            <button onClick={e => {
                socket.emit("send-data",{
                    p1: [playerone,p1points],
                    p2: [playertwo,p2points],
                });
            }}>Boton</button>
        </div>
    );
}

export default Main;
