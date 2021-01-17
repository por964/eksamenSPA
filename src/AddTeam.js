import React, { useState , useEffect } from "react";
import facade from "./apiFacade";
import mainURL from "./settings";
import 'bootstrap/dist/css/bootstrap.min.css';

function AddTeam() {

    const init = {pricePerYear: "", teamName: "", minAge: "", maxAge: "", sportname: ""};
    const [team, setTeam] = useState(init);


    const saveTeam = (evt) => {
    evt.preventDefault();
    const options = facade.makeOptions("POST", true, team);
    return fetch(mainURL + `/api/destination/addteam/${team.sportname}`, options)
    .then(res => res.json())   
    .then(res => {
      console.log(res);
      if(team.teamName === res) {
      alert(`${team.teamName} has been added`);
      //window.location = '/login-out';
      } else {
        alert(`${res}. Please try again.`);
        setTeam(init);
      }
      
      
    });
};

const onChange = (evt) => {
  setTeam({ ...team, [evt.target.id]: evt.target.value,
  });
};
    return (
        <>

        <div class="sm col-4">
            <h2>Add new team</h2>
            <br/>
            <form onChange={onChange}>
              <input className="form-control" placeholder="Team name" id="teamName" />
              <br />
              <input className="form-control" placeholder="Price per year" id="pricePerYear" />
              <br />
              <input className="form-control" placeholder="Minimum age" id="minAge" />
              <br />
              <input className="form-control" placeholder="Maximum age" id="maxAge" />
              <br />
              <input className="form-control" placeholder="Sport name" id="sportname" />
            </form>
            <br/>
            <button className="btn btn-primary" onClick={saveTeam}>
            Save
          </button> 
        </div>

        </>
    )
}

export default AddTeam;