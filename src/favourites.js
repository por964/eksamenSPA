import mainURL from "./settings";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"

const GetFavourites = () => {
    const [favourites, setFavourites] = useState([]);
    const [user, setUser] = useState(facade.getUsername);
    const [deletedFavourite, setDeletedFavourite] = useState("");
    const [deletedFavouriteExists, setDeletedFavouriteExists] = useState(false);
    

    const FetchFavourites = () => {
        fetch(mainURL + "/api/destination/open/favourites/" + user)
        .then((res) => res.json())
        .then((data) => {
            setFavourites(data);
        });
    }

    const RemoveFavourite = (country, user) => {
    
        let options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
    
        fetch(mainURL + "/api/destination/open/" + country + "/" + user, options)
        .then((res) => res.json())
        .then((data) => {
        console.log(data);
        setDeletedFavouriteExists(true)
        setDeletedFavourite(data);
        FetchFavourites();
    }
    )}

    useEffect(() => {
        FetchFavourites();
      }, [])

    return (
        <div className="container-align-left">
        <br /><br />
        <div className="row">
        <div className="col-sm">
                    <div className="list-group">
                <h2>Your saved countries: </h2>
                <br></br>
                <table className="table">
                        
                    {favourites.map((country, index) => {
                        
                        return (
                        <tr>
                        <td key={index}>{country.charAt(0).toUpperCase() + country.slice(1)}</td>
                        <td><button type="button" class="btn btn-outline-danger" onClick={() => RemoveFavourite(country,user)}>Remove</button></td>
                        </tr>
                        )
                    })}
                </table>
                </div>
                {deletedFavouriteExists && (
                    `Your favourite ${deletedFavourite.charAt(0).toUpperCase()}${deletedFavourite.slice(1)} was deleted.`
                )}
                </div>
                </div>
                </div>
               
    )
}

function CountryData(country) {

    const [countryData, setCountryData] = useState("");
    const [countryDataExists, setCountryDataExists] = useState(false);

    useEffect(() => {     
            let options = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        fetch(mainURL + "/api/destination/open/" + country, options)
            .then(facade.handleHttpErrors)
            .then((res) => {
                setCountryDataExists(true);
                setCountryData(res);
            })

     }, [])

return (
  <div>
    <h2>Data here</h2>
    {countryDataExists && (
    {countryData}
    )}
  </div>
);
}

export default GetFavourites;