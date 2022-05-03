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
    const [region, setRegion] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const [dataLoaded, setDataLoadedState] = useState(false);
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState({});
    const [soloQueueData, setSoloQueueData] = useState({});
    const [flexQueueData, setFlexQueueData] = useState({});

    useEffect(() => {}, []);

    const submitHandler = (e) => {
        e.preventDefault();
        setDataLoadedState(false);
        setLoading(true);
        axios
            .get(`http://localhost:5000/summoner/${region}/${searchInput}`)
            .then((response) => {
                console.log(response.data);

                setUserData((userData) => ({
                    name: response.data.name,
                    id: response.data.id,
                    lvl: response.data.summonerLevel,

                    queueType: response.data.queueType,
                    rank: response.data.tier,
                    division: response.data.rank,
                    wins: response.data.wins,
                    losses: response.data.losses,
                }));
                console.log(userData);
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
                        onChange={(e) => setSearchInput(e.target.value)}
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
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th className="lavel">
                                            Summoner name:
                                        </th>
                                        <th>{userData.name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="lavel">
                                            Summoner level:
                                        </td>
                                        <td>{userData.lvl}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Rank:</td>
                                        <td>{userData.rank}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Division:</td>
                                        <td>{userData.division}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Wins:</td>
                                        <td>{userData.wins}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Losses:</td>
                                        <td>{userData.losses}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Queue type:</td>
                                        <td>{userData.queueType}</td>
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
