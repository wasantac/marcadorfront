import React,{useEffect,useState} from 'react';
import {io} from 'socket.io-client';
import {Container,Form, FormGroup, Label, Input,Button} from 'reactstrap';
const {REACT_APP_URL} = process.env;
const Colina = () => {
    const [playerone,setOne] = useState("player1");
    const [p1points,setP1] = useState(0);
    const [socket,setSocket] = useState();
    useEffect(() => {
        const s = io(`${REACT_APP_URL}`)
        setSocket(s);
        return () => {
            s.disconnect();
        }
    },[]);
    return (
        <div className="mh-100 fondo">
            <Container>
            <img className="Sirv logo593" data-src="https://baxpidan.sirv.com/logo593.png?cy=75&cw=0&ch=150&w=300&h=300" alt="" />
            <Form>
                <FormGroup>
                    <Label for="p1"><h3 className="text-white">King</h3></Label>
                        <Input type="text" name="p1" id="p1" className="text-center" onChange={ e => {
                            setOne(e.target.value)
                        }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="p1points"><h3 className="text-white">King Points</h3></Label>
                        <Input type="number" name="p1points" id="p1points" className="text-center" onChange={ e => {
                            setP1(e.target.value)
                        }}/>
                </FormGroup>
            </Form>
            <Button className="btn-danger mt-5" onClick={e => {
                    socket.emit("rey-colina",{
                        p1: [playerone,p1points],
                    });
                }}>Actualizar Marcador</Button>
                <br></br>
                <a href="/" className="btn btn-warning my-3">Ir a  menu principal</a>
            </Container>
        </div>
    );
}

export default Colina;
