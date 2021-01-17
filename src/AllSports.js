import { useState } from "react";
import mainURL from "./settings";

const AllSports = () => {
    const [sports, setSports] = useState([]);

    const getSports = async () => {
        const response = await fetch(mainURL + '/api/destination/open/sports')
        const data = await response.json()
        setSports(data.all);
    }

    return (
        <>
        <div>
        <br/>
        <h2>Get a list of all available sports</h2>
        <br/>
        <button className="btn btn-primary" onClick={getSports}>See all sports</button>
        <br/><br/>
            <table className="table">
                <th>Name</th>
                <th>Description</th>
                {sports.map((sport) => {
                    return (
                        <tr key={sport.name}>
                            <td>{sport.name}</td>
                            <td>{sport.description}</td>
                            </tr>
                    )
                })}
            </table>
        </div>

        </>
    )
}
export default AllSports;