import { useState } from "react";
import mainURL from "./settings";
import facade from "./apiFacade";
import { Container, Col, Row , Table, Button } from 'react-bootstrap';




const UserList = () => {

    const [users, setUsers] = useState([]);
    const [reqSent, setReqSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [usersFavourites, setUsersFavourites] = useState([]);
    const [userSelected, setUserSelected] = useState(false);
    const [selectedUser , setSelectedUser] = useState('');

    const getUsers = (evt) => {
        evt.preventDefault();
        let options = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        fetch(mainURL + '/api/user/allusers' , options)
        .then(facade.handleHttpErrors)
        .then((res) => {
            setUsers(res);
            setReqSent(true)
            setErrorMessage("");
            }).catch((error) => {
              error.fullError.then((err) => {
                setErrorMessage(true);
                setReqSent(true);
                console.log("Error: ", errorMessage);
              })
            })
    }

    const GetUsersFavourites = (user) => {
        fetch(mainURL + "/api/destination/open/favourites/" + user)
        .then((res) => res.json())
        .then((data) => {
            setUsersFavourites(data);
            setUserSelected(true);
            setSelectedUser(user)
            console.log(data)
            });
    }
            
    return (
        <Container fluid>

                    <br />
                    <h2>Press button to get a list of all registered non-admin usernames: </h2>
                    <br/>
                    <button className="btn btn-primary" onClick={getUsers}>Get all users</button>
                    <br/>
                    <br/>        
                      <Row>
                          <Col>

            {reqSent && (
                
                <div>
                    {users.map((user) => {
                        return (
                        <Table striped bordered hover>
                        <th>User name</th>
                        <tr>
                        <td key={user} colSpan="2">{user}</td>
                        </tr>
                        <tr>
                        <td colSpan="1"><Button size="sm" variant="info" onClick={() => GetUsersFavourites(user)}>Show users favourites</Button>{' '}</td>
                        </tr>
                        </Table>
                        )
                    })}
                </div>
                

                )}
                </Col>
                    <Col>
                {userSelected && (

                    <Table striped bordered hover>
                    <thead>
                    <th>Countries saved by user: {selectedUser}</th>
                    </thead>                     
                    {usersFavourites.map((country) => {
                        return (
                        <tr>
                        <td key={country}>{country.charAt(0).toUpperCase() + country.slice(1)}</td>
                        </tr>
                        )
                    })}
                </Table>
                    

                )}
                </Col>
                </Row>
                
        
        
        </Container>
    )
}


export default UserList;