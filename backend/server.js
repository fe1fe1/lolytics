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
    const summonerIdResponse = await axios
        .get(
            `https://${req.params.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}?api_key=${process.env.LOL_KEY}`
        )
        .catch((err) => console.log(err));
    const { id, summonerLevel, name } = summonerIdResponse.data;
    const responseRanked = await axios
        .get(
            `https://${req.params.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.LOL_KEY}`
        )
        .catch((err) => console.log(err));

    console.log("DATA------------------------", responseRanked.data);

    responseRanked.data[1]
        ? res.json({ ...responseRanked.data[1], summonerLevel, id, name })
        : res.json({ ...responseRanked.data[0], summonerLevel, id, name });
});

app.listen(5000, () => {
    console.log("Server at http://localhost:5000");
});
