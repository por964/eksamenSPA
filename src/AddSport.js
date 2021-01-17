import React, { useState } from "react";
import facade from "./apiFacade";
import mainURL from "./settings";
import 'bootstrap/dist/css/bootstrap.min.css';

function AddSport() {

    const init = {name: "", description: ""};
    const [sport, setSport] = useState(init);

    const saveNewSport = (evt) => {
    evt.preventDefault();
    const options = facade.makeOptions("POST", true, sport);
    return fetch(mainURL + '/api/destination/sport', options)
    .then(res => res.json())   
    .then(res => {
      console.log(res);
     
      alert(`${res} has been added`);
            
    });
};

const onChange = (evt) => {
  setSport({ ...sport, [evt.target.id]: evt.target.value,
  });
};
    return (
        <div class="sm col-4">
            <h2>Create a New Sport</h2>
            <br/>
            <form onChange={onChange}>
              <input className="form-control" placeholder="Sport Name" id="name" />
              <br />
              <input className="form-control" placeholder="Description" id="description" />
            </form>
            <br/>
            <button className="btn btn-primary" onClick={saveNewSport}>
            Save
          </button> 
           
            
        </div>
    )
}

export default AddSport;
