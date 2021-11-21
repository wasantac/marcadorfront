import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import gogo from '../GoGoNBG.png'
import '../styles/main.css'

const { REACT_APP_URL } = process.env;

const Main = () => {
    const [playerone, setOne] = useState("player1");
    const [p1points, setP1] = useState(0);
    const [playertwo, setTwo] = useState("player2");
    const [p2points, setP2] = useState(0);
    const [socket, setSocket] = useState();
    const [texto, setTexto] = useState('');
    const [pais, setPais] = useState({ p1C: 'Ecuador', p2C: 'Ecuador' });
    useEffect(() => {
        const s = io(`${REACT_APP_URL}`)
        setSocket(s);
        return () => {
            s.disconnect();
        }
    }, []);
    let triangles = [];
    for (let i = 0; i < 25; i++) {
        triangles.push(<span className="triangle" key={i}></span>)
    }
    let paises = ["Ecuador", "Argentina", "Mexico", "Spain", "Estados Unidos"]
    return (
        <div className="arriba contenedor">
            <img src={gogo} alt="" width="auto" height="200px"></img>
            <Form className="mb-5">
                <Row>
                    <Col sm={6} md={6}>
                        <FormGroup>
                            <Label for="p1"><h3 className="text-white">Player 1</h3></Label>
                            <Input type="text" name="p1" id="p1" className="text-center" onChange={e => {
                                setOne(e.target.value)
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="p1points"><h3 className="text-white">Player 1 Points</h3></Label>
                            <Input type="number" name="p1points" id="p1points" className="text-center" onChange={e => {
                                setP1(e.target.value)
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="p1points"><h3 className="text-white">Player 1 Country</h3></Label>
                            <Input type="select" name="p1Country" id="p1Country" className="text-center" onChange={e => {
                                setPais({ ...pais, p1C: e.target.value })
                            }} >
                                {paises.map(pais => {
                                    return (<option value={pais} key={pais}>{pais}</option>)
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm={6} md={6}>
                        <FormGroup>
                            <Label for="p2"><h3 className="text-white">Player 2</h3></Label>
                            <Input type="text" name="p2" id="p2" className="text-center" onChange={e => {
                                setTwo(e.target.value)
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="p2points"><h3 className="text-white">Player 2 Points</h3></Label>
                            <Input type="number" name="p2points" id="p2points" className="text-center" onChange={e => {
                                setP2(e.target.value)
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="p1points"><h3 className="text-white">Player 2 Country</h3></Label>
                            <Input type="select" name="p2Country" id="2Country" className="text-center" onChange={e => {
                                setPais({ ...pais, p2C: e.target.value })
                            }} >
                                {paises.map(pais => {
                                    return (<option value={pais} key={pais}>{pais}</option>)
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm={12} md={12}>
                        <FormGroup>
                            <Label for="p2"><h3 className="text-white">Estado Reto/Torneo</h3></Label>
                            <Input type="text" name="p2" id="p2" className="text-center" onChange={e => {
                                setTexto(e.target.value)
                            }} />
                        </FormGroup>
                    </Col>
                </Row>


            </Form>
            <Button className="my-1" onClick={
                e => {
                    socket.emit("open-points", { open: true });
                }
            }>
                Activar Marcador
            </Button>
            <br></br>
            <Button className="btn-danger my-1" onClick={e => {
                socket.emit("send-data", {
                    p1: [playerone, p1points],
                    p2: [playertwo, p2points],
                    texto: texto,
                    ...pais
                });
            }}>Actualizar Marcador</Button>
            <br></br>
            <a href="/colina" className="btn btn-warning my-1">Ir a marcador Rey de la colina </a>
        </div>
    );
}

export default Main;
