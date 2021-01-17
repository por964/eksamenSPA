import React, { useState } from "react";
import facade from "./apiFacade";
import mainURL from "./settings";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function AddNewUser() {

        
  const init = {username: "", password: ""};
  const [newCredentials, setNewCredentials] = useState(init);
  
 
  const saveNewUser = (evt) => {
    evt.preventDefault();
    const options = facade.makeOptions("POST", true, {
      username: newCredentials.username,
      password: newCredentials.password
    });
    return fetch(mainURL + "/api/user/new", options)
    .then(res => res.json())   
    .then(res => {
      console.log(res);
      if(newCredentials.username === res) {
      alert(`Welcome, ${res}. You are now a user. Please log in`);
      window.location = '/login-out';
      } else {
        alert(`${res}. Please try again.`);
      }
      
    });
};

const onChange = (evt) => {
  setNewCredentials({ ...newCredentials, [evt.target.id]: evt.target.value,
  });
};
    return (
        <div class="sm col-4">
            <h2>Create a New User</h2>
            <br/>
            <form onChange={onChange}>
              <input className="form-control" placeholder="User Name" id="username" />
              <br />
              <input type="password" className="form-control" placeholder="Password" id="password" />
            </form>
            <br/>
            <button className="btn btn-primary" onClick={saveNewUser}>
            Save
          </button> 
           
            
        </div>
    )
}