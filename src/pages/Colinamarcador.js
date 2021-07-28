import React,{useEffect,useState} from 'react';
import {io} from 'socket.io-client';
import '../styles/colina.css'
const {REACT_APP_URL} = process.env;
const Colinamarcador = () => {
    const [playerone,setOne] = useState("player1");
    const [p1points,setP1] = useState(0);
    useEffect(() => {
        const s = io(`${REACT_APP_URL}`)
        s.on("send-colina", data => {
            
            console.log(data)
            try{
                setOne(data.p1[0]);
                setP1(data.p1[1]);
            } catch (err) {
                console.log(err)
            }

        })
        return () => {
            s.disconnect();
        }
    },[])
    return (
        <div>
            <div className="nombreking">
                {playerone}
            </div>
            <div className="puntoking">
                <span className="puntos">{p1points}</span>
            </div>
            
        </div>
    );
}

export default Colinamarcador;
