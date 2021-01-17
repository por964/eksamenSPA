import mainURL from "./settings";
import facade from "./apiFacade";
import app from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"


const MyProfile = () => {

    const [userMessage, setUserMessage] = useState("");
    
    useEffect(() => {
        fetch(mainURL + "/api/user/user", facade.makeOptions("GET", true))
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setUserMessage(data);
        });
      }, [])

      const deleteProfile = () => {
        const userName = localStorage.getItem('userName');
        console.log(userName);
        fetch(mainURL + "/api/info/open/" + userName, facade.makeOptions("DELETE", true))
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            facade.logout();
            window.location.reload(); 
        });
      }

    return (
        
        <div class="sm col-8">
            <br/><br/>
            <h3 key={userMessage.msg}>{userMessage.msg}</h3>
            <br/><br/>
            <button className="btn btn-primary" onClick={deleteProfile}>Delete my profile</button>
        </div>
    )
}

export default MyProfile;