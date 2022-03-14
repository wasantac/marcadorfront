import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col,
    Row,
    Container,
} from "reactstrap";
import gogo from "../GoGoNBG.png";
import "../styles/main.css";
import axios from "axios";
import MarcadorSmall from "../components/MarcadorSmall";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

const { REACT_APP_URL } = process.env;

const Main = () => {
    const [playerone, setOne] = useState("player1");
    const [p1points, setP1] = useState(0);
    const [playertwo, setTwo] = useState("player2");
    const [p2points, setP2] = useState(0);
    const [socket, setSocket] =
        useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
    const [texto, setTexto] = useState("");
    const [pais, setPais] = useState({ p1C: "Ecuador", p2C: "Ecuador" });
    const [paises, setPaises] = useState([]);
    useEffect(() => {
        const s = io(`${REACT_APP_URL}`);
        setSocket(s);

        s.on("receive-request-marcador", (data) => {
            console.log(data);
            setOne(data.p1[0]);
            setTwo(data.p2[0]);
            setP1(data.p1[1]);
            setP2(data.p2[1]);
            setTexto(data.texto);
            setPais({ p1C: data.p1C, p2C: data.p2C });
        });
        return () => {
            s.disconnect();
        };
    }, []);

    interface Country {
        name: string;
        Iso2: string;
        Iso3: string;
    }

    useEffect(() => {
        axios
            .get("https://countriesnow.space/api/v0.1/countries/iso")
            .then((res) => {
                let data = res.data.data;
                setPaises(
                    data.map((country: Country) => {
                        return country["name"];
                    })
                );
            });
    }, []);

    const handleObtenerDatos = () => {
        socket!.emit("send-request", { getData: true });
    };

    const handleActualizarDatos = () => {
        socket!.emit("send-data", {
            p1: [playerone, p1points],
            p2: [playertwo, p2points],
            texto: texto,
            ...pais,
        });
    };
    //let paises = ["Ecuador", "Argentina", "Mexico", "Spain", "Estados Unidos", "Peru", "Colombia", "Chile", "Puerto Rico"]
    return (
        <div className="arriba contenedor">
            <img src={gogo} alt="" width="auto" height="200px"></img>
            <MarcadorSmall
                players={{
                    player1: playerone,
                    player2: playertwo,
                    p1points: p1points,
                    p2points: p2points,
                }}
            ></MarcadorSmall>
            <Form className="mb-5">
                <Row>
                    <Col sm={6} md={6}>
                        <FormGroup>
                            <Label for="p1">
                                <h3 className="text-white">Player 1</h3>
                            </Label>
                            <Input
                                type="text"
                                name="p1"
                                id="p1"
                                className="text-center"
                                value={playerone}
                                onChange={(e) => {
                                    setOne(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="p1points">
                                <h3 className="text-white">Player 1 Points</h3>
                            </Label>
                            <Input
                                type="number"
                                name="p1points"
                                id="p1points"
                                className="text-center"
                                value={p1points}
                                onChange={(e) => {
                                    setP1(parseInt(e.target.value));
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="p1points">
                                <h3 className="text-white">Player 1 Country</h3>
                            </Label>
                            <Input
                                type="select"
                                name="p1Country"
                                id="p1Country"
                                className="text-center"
                                value={pais.p1C}
                                onChange={(e) => {
                                    setPais({ ...pais, p1C: e.target.value });
                                }}
                            >
                                {paises.map((pais) => {
                                    return (
                                        <option value={pais} key={pais}>
                                            {pais}
                                        </option>
                                    );
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm={6} md={6}>
                        <FormGroup>
                            <Label for="p2">
                                <h3 className="text-white">Player 2</h3>
                            </Label>
                            <Input
                                type="text"
                                name="p2"
                                id="p2"
                                className="text-center"
                                value={playertwo}
                                onChange={(e) => {
                                    setTwo(e.target.value);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="p2points">
                                <h3 className="text-white">Player 2 Points</h3>
                            </Label>
                            <Input
                                type="number"
                                name="p2points"
                                id="p2points"
                                className="text-center"
                                value={p2points}
                                onChange={(e) => {
                                    setP2(parseInt(e.target.value));
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="p1points">
                                <h3 className="text-white">Player 2 Country</h3>
                            </Label>
                            <Input
                                type="select"
                                name="p2Country"
                                id="2Country"
                                className="text-center"
                                value={pais.p2C}
                                onChange={(e) => {
                                    setPais({ ...pais, p2C: e.target.value });
                                }}
                            >
                                {paises.map((pais) => {
                                    return (
                                        <option value={pais} key={pais}>
                                            {pais}
                                        </option>
                                    );
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm={12} md={12}>
                        <FormGroup>
                            <Label for="p2">
                                <h3 className="text-white">
                                    Estado Reto/Torneo
                                </h3>
                            </Label>
                            <Input
                                type="text"
                                name="p2"
                                id="p2"
                                className="text-center"
                                value={texto}
                                onChange={(e) => {
                                    setTexto(e.target.value);
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            <Container>
                <Row>
                    <Col className="my-1">
                        <Button
                            className="btn-success h-100"
                            onClick={handleObtenerDatos}
                        >
                            Obtener datos del Marcador
                        </Button>
                    </Col>
                    <Col className="my-1">
                        <Button
                            className="btn-danger h-100"
                            onClick={handleActualizarDatos}
                        >
                            Actualizar Marcador
                        </Button>
                    </Col>
                    <Col className="my-1">
                        <Button href="/colina" className="h-100">
                            Ir a marcador Rey de la colina
                        </Button>
                    </Col>
                </Row>
            </Container>

            <br></br>
        </div>
    );
};

export default Main;
