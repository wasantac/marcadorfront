import React,{useEffect,useState} from 'react';
import {io} from 'socket.io-client';
import {Container,Form, FormGroup, Label, Input,Button,Col,Row} from 'reactstrap';

import '../styles/main.css'

const {REACT_APP_URL} = process.env;

const Main = () => {
    const [playerone,setOne] = useState("player1");
    const [p1points,setP1] = useState(0);
    const [playertwo,setTwo] = useState("player2");
    const [p2points,setP2] = useState(0);
    const [socket,setSocket] = useState();
    useEffect(() => {
        const s = io(`${REACT_APP_URL}`)
        setSocket(s);
        return () => {
            s.disconnect();
        }
    },[]);
    let triangles = [];
    for(let i = 0; i < 25 ; i++){
      triangles.push(<span className="triangle" key={i}></span>)
    }
    return (
        <div className="mh-100 fondo">

            <Container className="arriba">
            <img className="Sirv logo593" data-src="https://baxpidan.sirv.com/logo593.png?cy=75&cw=0&ch=150&w=300&h=300" alt="" />
                <Form className="mb-5">
                    <Row>
                        <Col sm={6} md={6}>
                            <FormGroup>
                                <Label for="p1"><h3 className="text-white">Player 1</h3></Label>
                                <Input type="text" name="p1" id="p1" className="text-center" onChange={ e => {
                                    setOne(e.target.value)
                                }}/>
                            </FormGroup>
                                <FormGroup>
                                <Label for="p1points"><h3 className="text-white">Player 1 Points</h3></Label>
                                <Input type="number" name="p1points" id="p1points" className="text-center" onChange={ e => {
                                    setP1(e.target.value)
                                }}/>
                            </FormGroup>
                        </Col>
                        <Col sm={6} md={6}>
                        <FormGroup>
                            <Label for="p2"><h3 className="text-white">Player 2</h3></Label>
                            <Input type="text" name="p2" id="p2" className="text-center" onChange={ e => {
                                setTwo(e.target.value)
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="p2points"><h3 className="text-white">Player 2 Points</h3></Label>
                            <Input type="number" name="p2points" id="p2points" className="text-center" onChange={ e => {
                                setP2(e.target.value)
                            }}/>
                        </FormGroup>
                        </Col>
                    </Row>
                    

                </Form>
                <Button className="btn-danger" onClick={e => {
                    socket.emit("send-data",{
                        p1: [playerone,p1points],
                        p2: [playertwo,p2points],
                    });
                }}>Actualizar Marcador</Button>
                <br></br>
                <a href="/colina" className="btn btn-warning my-3">Ir a marcador Rey de la colina </a>
            </Container>
        
        </div>
    );
}

export default Main;
