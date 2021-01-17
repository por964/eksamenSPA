import mainURL from "./settings";
import facade from "./apiFacade";
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";


const GetDestination = () => {

    const [country, setCountry] = useState("");
    const [countryData, setCountryData] = useState("");
    const [countryNameFavourite, setCountryNameFavourite] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [savedStatus, setSavedStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [favouriteAlreadySaved, setFavouriteAlreadySaved] = useState(false);

    const fetchCountryData = (evt) => {
        evt.preventDefault();
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
                setCountryNameFavourite(country);
                setErrorMessage(false);
                setSavedStatus(false);
                setFavouriteAlreadySaved(false);
                setCountryData(res);
                setFormSubmitted(true);
                setErrorMessage("");
            }).catch((error) => {
              error.fullError.then((err) => {
                setErrorMessage(true);
                setFormSubmitted(false);
                console.log("Error: ", errorMessage);
              })
            })
    }

    const onChange = (evt) => {
        setCountry(evt.target.value)
    }

    const saveFavourite = () => {
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        const userName = localStorage.getItem('userName');
        fetch(mainURL + "/api/destination/open/" + country + "/" + userName, options)
            .then(res => res.json())   
            .then(res => {
                if (res === 'You have already saved the destination') {
                setSavedStatus(false);
                setFavouriteAlreadySaved(true);
            } else {
                setSavedStatus(true);
                setFavouriteAlreadySaved(false);
            }
            });
    }

    return (
        <div className="sm col-8">
            <br />
            <h2>Write country name:</h2>
            <br />
            <div className="col-sm-4">
                <form onChange={onChange} >

                    <input className="form-control" placeholder="Write here" id="country" />
                    <br />
                    <button className="btn btn-primary" onClick={fetchCountryData}>Submit</button>
                </form>
            </div>
            <br /><br />

            {formSubmitted && (
                <div>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Country name</th>
                                <td>{countryData.name}</td>
                            </tr>
                            <tr>
                                <th>Capital</th>
                                <td>{countryData.capital}</td>
                            </tr>
                            <tr>
                                <th>Population</th>
                                <td>{countryData.population.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>Currency ISO code</th>
                                <td> {countryData.currencies.code} </td>
                            </tr>
                            <tr>
                                <th>Currency vs USD</th>
                                <td>{Math.round(countryData.fxRate * 10000) / 10000}</td>
                            </tr>
                            <tr>
                                <th>Covid-19 data last updated</th>
                                <td>{moment(countryData.last_update).format('MMMM Do YYYY HH:mm')}</td>
                            </tr>
                            <tr>
                                <th>Total COVID-19 cases</th>
                                <td>{countryData.cases.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>Total COVID-19 deaths</th>
                                <td>{countryData.deaths.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>Total COVID-19 patients recovered</th>
                                <td>{countryData.recovered.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>Infectionrate</th>
                                <td>{countryData.infectionRate} %</td>
                            </tr>
                        </tbody>
                    </table>

                    <button className="btn btn-primary" onClick={saveFavourite}>Save as favourite</button>

                    <br/><br/>

                    {savedStatus && (
                    <div className="alert alert-success" role="alert">{countryNameFavourite.charAt(0).toUpperCase() + countryNameFavourite.slice(1) + ' was saved as favourite!'}</div>
                    )}

                    {favouriteAlreadySaved && (
                    <div className="alert alert-danger" role="alert">{'You have already saved ' + countryNameFavourite.charAt(0).toUpperCase() + countryNameFavourite.slice(1) + ' as favourite!'}</div>
                    )}

                </div>
            )}

                    {errorMessage && (
                    <div className="col-sm-4">
                    <div className="alert alert-danger" role="alert">{errorMessage ? 'Destination not found' : ''}</div>
                    </div>
                    )}
                    <br/><br/><br/>
        </div>

    )
}

export default GetDestination;