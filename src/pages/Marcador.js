import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import '../styles/marcador.css'
const { REACT_APP_URL } = process.env;
const Marcador = () => {
    const [playerone, setOne] = useState("player1");
    const [p1points, setP1] = useState(0);
    const [playertwo, setTwo] = useState("player2");
    const [p2points, setP2] = useState(0);
    const [p1Change, setP1Change] = useState(false);
    const [p2Change, setP2Change] = useState(false);
    const [open, setOpen] = useState(true)
    const [texto, setTexto] = useState('Reto')
    const [pais, setPais] = useState({ p1C: 'Ecuador', p2C: 'Ecuador' });

    useEffect(() => {
        const s = io(`${REACT_APP_URL}`)

        s.on("send-animation", data => {
            setOpen(!open)
        })
        s.on("receive-data", data => {

            console.log(data)
            try {
                if (data.p1[1] !== p1points) {
                    setP1Change(true)
                }
                if (data.p2[1] !== p2points) {
                    setP2Change(true)
                }
                setTimeout(() => {
                    setOne(data.p1[0]);
                    setP1(data.p1[1]);
                    setTwo(data.p2[0]);
                    setP2(data.p2[1]);
                    setTexto(data.texto)
                    setPais({ p1C: data.p1C, p2C: data.p2C })
                }, 500)
            } catch (err) {
                console.log(err)
            }

        })
        return () => {
            s.disconnect();
        }
    }, [p1points, p2points, open])

    const paisesEscoger = (pais) => {
        switch (pais) {
            case 'Ecuador': {
                return "https://flagcdn.com/w320/ec.png"
            }
            case "Argentina": {
                return "https://flagcdn.com/w320/ar.png"
            }
            case "Mexico": {
                return "https://flagcdn.com/w320/mx.png"
            }
            case "Spain": {
                return "https://flagcdn.com/w320/es.png"
            }
            default:
                return "https://flagcdn.com/w320/ec.png"
        }
    }

    return (
        <React.Fragment>
            <div className={!open ? "rectangle-hide rectangle-hide-left" : "hidding-square"}></div>
            <div className={!open ? "rectangle-hide rectangle-hide-right" : "hidding-square-right"}></div>
            <div className={!open ? "d-none" : ""}>

                <div className="trapecio-nombre"><span className="span-texto">{texto}</span></div>
                <div className="trapecio-nombre-borde"></div>
                <div className="wrapper">

                    <div className="flx separation">

                        <div className="nombre-izq">
                            <div className="d-flex nombre ">
                                <img src={paisesEscoger(pais.p1C)} className="bandera-izq" alt="bandera" />
                                <p className="p-der">{playerone}</p>
                            </div>


                        </div>
                        <div className="paralelogramo izquierdo neon">
                            <p className={p1Change ? "noskew noskewleft flip" : "noskew noskewleft no-flip"} onAnimationEnd={e => {
                                setP1Change(false)
                            }}>{p1points}</p>
                        </div>
                    </div>

                    <div className="flx">
                        <div className="nombre-der ">
                            <div className="d-flex nombre">
                                <p className=" p-izq">{playertwo}</p>
                                <img src={paisesEscoger(pais.p2C)} className="bandera-der" alt="bandera" />
                            </div>
                        </div>
                        <div className="paralelogramo derecho neon">
                            <p className={p2Change ? "noskew noskewleft flip" : "noskew noskewleft no-flip"} onAnimationEnd={e => {
                                setP2Change(false)
                            }}>{p2points}</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Marcador;
