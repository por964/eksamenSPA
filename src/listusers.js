import { useState, useEffect } from "react";
import mainURL from "./settings";

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState("");

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role === "admin") {
            setIsAdmin(true);
        }
    }, [])

    const getUsers = async () => {
        const response = await fetch(mainURL + '/api/user/allusers')
        const data = await response.json()
        setUsers(data);
    }

    return (
        <>
    {!isAdmin && (
        <div>
        <br/>
        <h2>My bookings:</h2>
        </div>
        )}
        {isAdmin && (
        <div>
        <br/>
        <h2>Admin module:</h2>
        <br/>
        <button className="btn btn-primary" onClick={getUsers}>See all users</button>
        <br/><br/>
            <ul className="list">
                {users.map((user) => {
                    return (
                        <li key={user}>{user}</li>
                    )
                })}
            </ul>
        </div>
        )}
        </>
    )
}
export default ListUsers;