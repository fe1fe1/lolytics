import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.get("/summonerId/:region/:summonerName", async (req, res) => {});

app.get("/summoner/:region/:summonerName", async (req, res) => {
    const idResponse = await axios
        .get(
            `https://${req.params.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}?api_key=${process.env.LOL_KEY}`
        )
        .catch((err) => console.log(err));
    const summonerData = {
        id: idResponse.data.id,
        lvl: idResponse.data.summonerLevel,
        name: idResponse.data.name,
    };

    const rankedResponse = await axios
        .get(
            `https://${req.params.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}?api_key=${process.env.LOL_KEY}`
        )
        .catch((err) => console.log(err));

    rankedResponse.data.forEach((queueData) => {
        if (queueData.queueType.includes("RANKED_SOLO"))
            summonerData.soloQueue = queueData;
        if (queueData.queueType.includes("RANKED_FLEX"))
            summonerData.flexQueue = queueData;
    });
    console.log(summonerData);
    res.json(summonerData);
});

app.listen(5000, () => {
    console.log("Server at http://localhost:5000");
});
