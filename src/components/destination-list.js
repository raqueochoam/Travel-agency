import React, {useState, useEffect} from 'react';
import DestinationDataService from "../services/destination.js";
import {Link} from "react-router-dom";
import "./destination-list.css";


const DestinationsList = props => {
    const [destinations, setDestinations] = useState([]);
    const [searchName, setSearchName ] = useState("");
    const [searchZone, setSearchZone ] = useState("");
    const [searchState, setSearchState ] = useState("");
    const [states, setStates] = useState(["All States"]);


    useEffect(() => {
        retrieveDestinations();
        retrieveStates();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };
    
      const onChangeSearchZone = e => {
        const searchZone = e.target.value;
        setSearchZone(searchZone);
    };
    
      const onChangeSearchState = e => {
        const searchState = e.target.value;
        setSearchState(searchState);   
    };
    
    const retrieveDestinations = () => {
        DestinationDataService.getAll()
          .then(response => {
            console.log(response.data);
            setDestinations(response.data.destinations);
            
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      const retrieveStates = () => {
        DestinationDataService.getStates()
          .then(response => {
            console.log(response.data);
            setStates(["All States"].concat(response.data));
            
          })
          .catch(e => {
            console.log(e);
          });
      };

      const refreshList = () => {
          retrieveDestinations();
      };

      const find = (query, by) => {
        DestinationDataService.find(query, by)
          .then(response => {
            console.log(response.data);
            setDestinations(response.data.destinations);
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      const findByName = () => {
        find(searchName, "name")
      };
    
      const findByZone = () => {
        find(searchZone, "zone")
      };
    
      const findByState = () => {
        if (searchState === "All States") {
          refreshList();
        } else {
          find(searchState, "state")
        }
      };
    
    return (
        <div>
        <div className="row pb-1">
          <div className="input-group col-lg-4">
            <input
              type="text"
              className="form-control ifs"
              placeholder="Search by name"
              value={searchName}
              onChange={onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary sb"
                type="button"
                onClick={findByName}
              >
                Search
              </button>
            </div>
          </div>
          <div className="input-group col-lg-4">
            <input
              type="text"
              className="form-control ifs"
              placeholder="Search by zone"
              value={searchZone}
              onChange={onChangeSearchZone}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary sb"
                type="button"
                onClick={findByZone}
              >
                Search
              </button>
            </div>
          </div>
          <div className="input-group col-lg-4">
  
            <select onChange={onChangeSearchState} className="form-control ifs">
               {states.map(state => {
                 return (
                   <option value={state}> {state.substr(0, 20)} </option>
                 )
               })}
            </select>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary sb"
                type="button"
                onClick={findByState}
              >
                Search
              </button>
            </div>
  
          </div>
        </div>
        <div className="row">
          {destinations.map((destination) => {
            return (
              <div className="col-lg-4 pb-1">
                <div className="card">
                  <div className="card-body">
                  <img alt="" src={destination.photo_url} className="img"></img>
                    <h5 className="card-title fc"><strong>{destination.name}</strong></h5>
                    <p className="card-text">
                        <br></br>
                      <strong>State: </strong>{destination.state}<br/>
                      <strong>Zone: </strong>{destination.zone}<br/>
                      <strong>Currency: </strong>{destination.currency}<br/>
                      <strong>Language: </strong>{destination.language}<br/>
                    </p>
                    <div className="row">
                    <Link to={"/destinations/"+destination._id} className="btn btn-primary col-lg-5 mx-1 mb-1 cb">
                      View Opinions
                    </Link>
                    <Link to={"/reservations/"+destination._id} className="btn btn-primary col-lg-5 mx-1 mb-1 cb">
                      Make Reservation
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
  
  
        </div>
      </div>
  );
}

export default DestinationsList;
