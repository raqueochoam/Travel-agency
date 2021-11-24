import React, { useState, useEffect } from "react";
import DestinationDataService from "../services/destination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import "./destination.css";
import "./reservation.css";

const Reservation = props => {
  let initialPeopleState = ""

  const initialDestinationState = {
    id: null,
    name: "",
    address: {},
    state: "",
    reviews: []
  };
  const [destination, setDestination] = useState(initialDestinationState);
  const [startDate, setStartDate] = useState(new Date().getDate());
  const [finishDate, setFinishDate] = useState(new Date().getDate());
  const [people, setPeople] = useState(initialPeopleState);
  const [submitted, setSubmitted] = useState(false);


  const getDestination = id => {
    DestinationDataService.get(id)
      .then(response => {
        setDestination(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDestination(props.match.params.id);
  }, [props.match.params.id]);


  const handlePeopleChange = event => {
    setPeople(event.target.value);
  };

  const saveReservation = () => {
    var data = {
      start_date: startDate,
      finish_date: finishDate,
      people: people,
      name: props.user.name,
      user_id: props.user.id,
      destination_id: props.match.params.id,
      destination_name: destination.name,
      destination_photo_url: destination.photo_url
    };

    DestinationDataService.createReservation(data)
      .then(response => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  }

  return (
    <div>
      {props.user ? (
        <div>
          {submitted ? (
            <div>
              <h4>Reservation made successfully!</h4>
              <Link to={"/destinations"} className="btn btn-success arb">
                Back to Destinations
              </Link>
            </div>
          ) : (
            <div>
              {destination ? (
                <div>
                  <div className="row r1">
                    <div className="column">
                      <img alt="" src={destination.photo_url} className="img" />
                    </div>
                    <div className="column">
                      <h5 className="fc"><strong>{destination.name}</strong></h5>
                      <p>
                        <br></br>
                        <strong>State: </strong>{destination.state}<br />
                        <strong>Zone: </strong>{destination.zone}<br />
                        <strong>Currency: </strong>{destination.currency}<br />
                        <strong>Language: </strong>{destination.language}<br />
                        <br></br>
                        <br></br>
                      </p>
                      <button onClick={saveReservation} className="btn btn-primary arb">
                        Make Reservation
                      </button>
                    </div>
                    <div className="column depart">
                      <div className="rd1">
                        <p><strong>Pick your departure date:</strong></p>
                        <DatePicker className="datep" selected={startDate} onChange={(date) => setStartDate(date)} />
                      </div>
                      <div className="rd2">
                        <p><strong>Pick your return date:</strong></p>
                        <DatePicker className="datep" selected={finishDate} onChange={(date) => setFinishDate(date)} />
                      </div>
                      <div className="rd3">
                        <p><strong>How many people:</strong></p>
                        <input
                          type="text"
                          className="form-control datep"
                          id="name"
                          required
                          onChange={handlePeopleChange}
                          name="name"></input>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <br />
                  <p>No destination selected.</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="tli">
          Please log in.
        </div>
      )}
    </div>
  );
};

export default Reservation;