import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import SummonerInfo from "../components/SummonerInfo";
import RankStats from "../components/RankStats";

const AccountSearch = () => {
    const [region, setRegion] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [dataLoaded, setDataLoadedState] = useState(false);
    const [loading, setLoading] = useState(false);
    const [summonerData, setSummonerData] = useState({});
    const [soloQueueData, setSoloQueueData] = useState(null | {});
    const [flexQueueData, setFlexQueueData] = useState(null | {});

    const submitHandler = (e) => {
        e.preventDefault();
        setDataLoadedState(false);
        setLoading(true);

        axios
            .get(`http://localhost:5000/summoner/${region}/${searchInput}`)
            .then((response) => {
                setSummonerData({
                    name: response.data.name,
                    id: response.data.id,
                    lvl: response.data.lvl,
                });
                if (response.data.hasOwnProperty("soloQueue")) {
                    console.log("SOLO DATA: ", response.data.soloQueue);
                    setSoloQueueData({
                        ...response.data.soloQueue,
                        queueType: "Ranked Solo/Duo",
                        ranked: true,
                    });
                } else {
                    setSoloQueueData({
                        queueType: "Ranked Solo/Duo",
                        ranked: false,
                    });
                }

                if (response.data.hasOwnProperty("flexQueue")) {
                    console.log("FLEX DATA: ", response.data.flexQueue);
                    setFlexQueueData({
                        ...response.data.flexQueue,
                        queueType: "Ranked Flex",
                        ranked: true,
                    });
                } else {
                    setFlexQueueData({
                        queueType: "Ranked Flex",
                        ranked: false,
                    });
                }

                setLoading(false);
                setDataLoadedState(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Container className="p-4">
                <Form
                    className="d-flex w-50 m-auto summoner"
                    onSubmit={submitHandler}
                >
                    <FormControl
                        onChange={(e) => setSearchInput(e.target.value)}
                        type="search"
                        placeholder="Search"
                        className="summoner-search me-2"
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
            <div>
                {dataLoaded ? (
                    <div className="d-flex flex-column">
                        <SummonerInfo summonerData={summonerData} />
                        <div className="d-flex m-auto justify-content-center">
                            <RankStats queueData={soloQueueData} />
                            <RankStats queueData={flexQueueData} />
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
