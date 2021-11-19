import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import gogo from '../GoGoNBG.png'
const { REACT_APP_URL } = process.env;
const Colina = () => {
    const [playerone, setOne] = useState("player1");
    const [p1points, setP1] = useState(0);
    const [socket, setSocket] = useState();
    const [show, setShow] = useState(false);
    const [first, setFirst] = useState(true);
    useEffect(() => {
        const s = io(`${REACT_APP_URL}`)
        setSocket(s);
        return () => {
            s.disconnect();
        }
    }, []);
    return (
        <div className="arriba contenedor">
            <Container>
                <img src={gogo} alt="" width="auto" height="200px"></img>
                <Form>
                    <FormGroup>
                        <Label for="p1"><h3 className="text-white">King</h3></Label>
                        <Input type="text" name="p1" id="p1" className="text-center" onChange={e => {
                            setOne(e.target.value)
                        }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="p1points"><h3 className="text-white">King Points</h3></Label>
                        <Input type="number" name="p1points" id="p1points" className="text-center" onChange={e => {
                            setP1(e.target.value)
                        }} />
                    </FormGroup>
                </Form>
                <Button className="btn-danger mt-5 mx-5" onClick={e => {
                    socket.emit("rey-colina", {
                        p1: [playerone, p1points],
                    });
                }}>Actualizar Marcador</Button>
                <Button className="btn-danger mt-5 mx-5" onClick={e => {
                    setShow(!show)
                    if (first) {
                        setFirst(false);
                    }
                    socket.emit("send-ganador", {
                        ganador: show
                    });
                }}>{first ? "Activar Efecto" : show ? "Mostrar Ganador" : "Ocultar Ganador"}</Button>
                <br></br>
                <a href="/" className="btn btn-warning my-3">Ir a  menu principal</a>
            </Container>
        </div>
    );
}

export default Colina;
