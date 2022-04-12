import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { io } from "socket.io-client";
import Marcador from "../../pages/Marcador";
import useWindowDimensions from "./useWindowDimensions";
import "./small.scss";

interface Props {
    players: Players;
}

interface Players {
    player1: string;
    player2: string;
    p1points: number;
    p2points: number;
}

interface PlayerData {
    p1: [string, number];
    p2: [string, number];
    texto: string;
    p1C: string;
    p2C: string;
}

const { REACT_APP_URL } = process.env;

const MarcadorSmall: React.FC<Props> = ({ players }) => {
    const { width } = useWindowDimensions();
    const [receivePlayers, setData] = useState<PlayerData>({
        p1: ["player1", 1],
        p2: ["player2", 0],
        texto: "",
        p1C: "Ecuador",
        p2C: "Ecuador",
    });
    useEffect(() => {
        const s = io(`${REACT_APP_URL}`);
        s.on("receive-data", (data) => {
            console.log(data);
            try {
                setData(data);
            } catch (err) {
                console.log(err);
            }
        });
        return () => {
            s.disconnect();
        };
    }, []);

    return (
        <>
            {" "}
            <div className="my-2">
                <div className="text-danger d-flex justify-content-end pr-5">
                    <div>
                        En vivo <span className="pulse">&#9679;</span>
                    </div>
                </div>
                {width > 1600 ? (
                    <div>
                        <Marcador showReto={false}></Marcador>
                    </div>
                ) : (
                    <Container className="text-white d-flex justify-content-around align-items-center border border-danger">
                        <h4 className="px-2">
                            {receivePlayers.p1[0]} {receivePlayers.p1[1]}
                        </h4>
                        <h4 className="px-2">
                            {receivePlayers.p2[0]} {receivePlayers.p2[1]}
                        </h4>
                    </Container>
                )}
            </div>
        </>
    );
};

export default MarcadorSmall;
