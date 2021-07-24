import React,{useEffect,useState} from 'react';
import {io} from 'socket.io-client';
import '../styles/marcador.css'
const {REACT_APP_URL} = process.env;
const Marcador = () => {
    const [playerone,setOne] = useState("player1");
    const [p1points,setP1] = useState(0);
    const [playertwo,setTwo] = useState("player2");
    const [p2points,setP2] = useState(0);
    useEffect(() => {
        const s = io(`${REACT_APP_URL}`)
        s.on("receive-data", data => {
            
            console.log(data)
            try{
                setOne(data.p1[0]);
                setP1(data.p1[1]);
                setTwo(data.p2[0]);
                setP2(data.p2[1]);
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
                <div className="wrapper">
        <div className="flx separation">
            <div className="nombre-izq">
                <span></span>
                <span></span>
                <p className="nombre">{playerone}</p>
            </div>
            <div className="paralelogramo izquierdo neon">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p className="noskew noskewleft">{p1points}</p>
            </div>    
        </div>
        <div className="flx">
            <div className="nombre-der">
                <span></span>
                <span></span>
                <p className="nombre">{playertwo}</p>
            </div>
            <div className="paralelogramo derecho neon">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p className="noskew noskewright">{p2points}</p>
            </div>
        </div>
    </div>
        </div>
    );
}

export default Marcador;
