import React from "react";
import Table from "react-bootstrap/Table";

const SummonerInfo = (props) => {
    return (
        <div>
            <Table bordered className="w-25">
                <thead className="text-center">
                    <tr>
                        <th colSpan={2}>{props.summonerData.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="lavel">Summoner level:</td>
                        <td>{props.summonerData.lvl}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default SummonerInfo;
