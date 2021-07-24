import React,{useEffect,useState} from 'react';
import {io} from 'socket.io-client';
import {Container,Form, FormGroup, Label, Input,Button} from 'reactstrap';

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
    return (
        <div>
            <Container>
                <Form>
                    <FormGroup>
                    <Label for="p1">Player 1</Label>
                    <Input type="text" name="p1" id="p1" onChange={ e => {
                        setOne(e.target.value)
                    }}/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="p1points">Player 1 Points</Label>
                    <Input type="number" name="p1points" id="p1points" onChange={ e => {
                        setP1(e.target.value)
                    }}/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="p2">Player 2</Label>
                    <Input type="text" name="p2" id="p2" onChange={ e => {
                        setTwo(e.target.value)
                    }}/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="p2points">Player 2 Points</Label>
                    <Input type="number" name="p2points" id="p2points" onChange={ e => {
                        setP2(e.target.value)
                    }}/>
                    </FormGroup>
                </Form>
                <Button onClick={e => {
                    socket.emit("send-data",{
                        p1: [playerone,p1points],
                        p2: [playertwo,p2points],
                    });
                }}>Boton</Button>
            </Container>

        </div>
    );
}

export default Main;
