import Table from "react-bootstrap/Table";

const RankStats = (props) => {
    return (
        <div className="mt-4">
            <Table bordered>
                <thead className="text-center">
                    <tr>
                        <th colSpan={2}>{props.queueData.queueType}</th>
                    </tr>
                </thead>
                {props.queueData.ranked ? (
                    <tbody size="sm">
                        <tr>
                            <td>Rank:</td>
                            <td>{props.queueData.tier}</td>
                        </tr>
                        <tr>
                            <td>Division:</td>
                            <td>{props.queueData.rank}</td>
                        </tr>
                        <tr>
                            <td>Wins:</td>
                            <td>{props.queueData.wins}</td>
                        </tr>
                        <tr>
                            <td>Losses:</td>
                            <td>{props.queueData.losses}</td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody className="text-center" size="sm">
                        <tr>
                            <td>Unranked</td>
                        </tr>
                    </tbody>
                )}
            </Table>
        </div>
    );
};

export default RankStats;
