import React,{useEffect,useState} from 'react';
import {io} from 'socket.io-client';
import '../styles/marcador.css'
const {REACT_APP_URL} = process.env;
const Marcador = () => {
    const [playerone,setOne] = useState("player1");
    const [p1points,setP1] = useState(0);
    const [playertwo,setTwo] = useState("player2");
    const [p2points,setP2] = useState(0);
    const [p1Change,setP1Change] = useState(false);
    const [p2Change,setP2Change] = useState(false);
    const [open,setOpen] = useState(false)

    useEffect(() => {
        const s = io(`${REACT_APP_URL}`)

        s.on("send-animation",data => {
            setOpen(!open)
        }) 
        s.on("receive-data", data => {
            
            console.log(data)
            try{
                if(data.p1[1] !== p1points){
                    setP1Change(true)
                }
                if(data.p2[1] !== p2points){
                    setP2Change(true)
                }
                setTimeout(() => {
                    setOne(data.p1[0]);
                    setP1(data.p1[1]);
                    setTwo(data.p2[0]);
                    setP2(data.p2[1]);
                },500)
            } catch (err) {
                console.log(err)
            }

        })
        return () => {
            s.disconnect();
        }
    },[p1points,p2points,open])
    return (
        <div className={!open? "d-none":""}>
        <div className={!open ? "" : "hidding-square"}></div>
        <div className={!open ? "" : "hidding-square-right"}></div>
                <div className="wrapper">
        <div className="flx separation">
            <div className="nombre-izq">
                <p className="nombre">{playerone}</p>
            </div>
            <div className="paralelogramo izquierdo neon">
                <p className={p1Change ? "noskew noskewleft flip" : "noskew noskewleft no-flip"} onAnimationEnd={e=>{
                    setP1Change(false)
                }}>{p1points}</p>
            </div>    
        </div>
        <div className="flx">
            <div className="nombre-der">
                <p className="nombre">{playertwo}</p>
            </div>
            <div className="paralelogramo derecho neon">
                <p className={p2Change ? "noskew noskewleft flip" : "noskew noskewleft no-flip"} onAnimationEnd={e=>{
                    setP2Change(false)
                }}>{p2points}</p>
            </div>
        </div>
    </div>
        </div>
    );
}

export default Marcador;
