import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import axios from "axios";
import MainNav from "../components/MainNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

const AccountSearch = ({}) => {
    const [summonerName, setSummonerName] = useState("");
    const [region, setRegion] = useState("");
    const [id, setId] = useState("");
    const [lvl, setLvl] = useState();
    const [tier, setTier] = useState();
    const [rank, setRank] = useState();
    const [wins, setWins] = useState();
    const [losses, setLosses] = useState();
    const [queueType, setQueueType] = useState();
    const [userName, setUserName] = useState();
    const [dataLoaded, setDataLoadedState] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {}, []);

    const submitHandler = (e) => {
        e.preventDefault();
        setDataLoadedState(false);
        setLoading(true);
        axios
            .get(`http://localhost:5000/summoner/${region}/${summonerName}`)
            .then((response) => {
                console.log(response.data);
                setId(response.data.id);
                setLvl(response.data.summonerLevel);
                setTier(response.data.tier);
                setRank(response.data.rank);
                setWins(response.data.wins);
                setLosses(response.data.losses);
                setQueueType(response.data.queueType);
                setUserName(summonerName);

                setLoading(false);
                setDataLoadedState(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Container className="p-4">
                <Form className="d-flex w-50 m-auto" onSubmit={submitHandler}>
                    <FormControl
                        onChange={(e) => setSummonerName(e.target.value)}
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Form.Select
                        aria-label="Select a region"
                        onChange={(e) => setRegion(e.target.value)}
                    >
                        <option value="BR1">BR</option>
                        <option value="EUN1">EUN</option>
                        <option value="EUW1">EUW</option>
                        <option value="JP1">JP</option>
                        <option value="KR">KR</option>
                        <option value="LA1">LAN</option>
                        <option value="LA2">LAS</option>
                        <option value="NA1">NA</option>
                        <option value="OC1">OC</option>
                        <option value="RU">RU</option>
                        <option value="TR1">TR</option>
                    </Form.Select>
                    <Button type="submit" className="mx-2">
                        Search
                    </Button>
                </Form>
            </Container>
            <div className="p-3">
                {dataLoaded ? (
                    <div>
                        <div>
                            <Table striped bordered hover className="mt-5">
                                <thead>
                                    <tr>
                                        <th className="lavel">
                                            Summoner name:
                                        </th>
                                        <th>{userName}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="lavel">
                                            Summoner level:
                                        </td>
                                        <td>{lvl}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Rank:</td>
                                        <td>{tier}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Division:</td>
                                        <td>{rank}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Wins:</td>
                                        <td>{wins}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Losses:</td>
                                        <td>{losses}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Queue type:</td>
                                        <td>{queueType}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                ) : loading ? (
                    <div className="m-auto w-25 text-center">
                        <FontAwesomeIcon icon={faRotate} />
                        <p className="empty-search">Loading</p>
                    </div>
                ) : (
                    <div className="m-auto w-25 text-center">
                        <p className="empty-search">Enter your search</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountSearch;
