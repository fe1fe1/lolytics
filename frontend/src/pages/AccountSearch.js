import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

const AccountSearch = () => {
    const [region, setRegion] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const [dataLoaded, setDataLoadedState] = useState(false);
    const [loading, setLoading] = useState(false);

    const [summonerData, setSummonerData] = useState({});
    const [soloQueueData, setSoloQueueData] = useState(null | {});
    const [flexQueueData, setFlexQueueData] = useState(null | {});

    useEffect(() => {}, []);

    const submitHandler = (e) => {
        e.preventDefault();
        setDataLoadedState(false);
        setLoading(true);
        axios
            .get(`http://localhost:5000/summoner/${region}/${searchInput}`)
            .then((response) => {
                console.log(response);
                setSummonerData((summonerData) => ({
                    name: response.data.name,
                    id: response.data.id,
                    lvl: response.data.lvl,
                }));
                if (response.data.soloQueue)
                    setSoloQueueData({ ...response.data.soloQueue });

                if (response.data.felxQueue)
                    setFlexQueueData(...response.data.felxQueue);

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
                                        <th>{summonerData.name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="lavel">
                                            Summoner level:
                                        </td>
                                        <td>{summonerData.lvl}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Rank:</td>
                                        <td>{soloQueueData.tier}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Division:</td>
                                        <td>{soloQueueData.rank}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Wins:</td>
                                        <td>{soloQueueData.wins}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Losses:</td>
                                        <td>{soloQueueData.losses}</td>
                                    </tr>
                                    <tr>
                                        <td className="lavel">Queue type:</td>
                                        <td>{soloQueueData.queueType}</td>
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
