import React, {useState, useEffect} from 'react';
import DestinationDataService from "../services/destination.js";
import "./reservations-list.css";

const ReservationsList = props => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        retrieverReservations();
    }, []);

    
    const retrieverReservations = () => {
        if (props.user){
          var data = {
            name: props.user.name
          }
          DestinationDataService.getReservations(data.name)
            .then(response => {
              console.log(response.data);
              setReservations(response.data.reservations);
              
            })
            .catch(e => {
              console.log(e);
            });
        }
      };
  return (
    <div >
      { props.user ? (
        <div>
        <div className="row">
          {reservations.map((reservation) => {
            return (
              <div className="col-lg-4 pb-1">
                <div className="card crb">
                  <div className="card-body">
                  <img alt="" src={reservation.destination_photo_url} className="img"></img>
                    <h5 className="card-title fc"><strong>{reservation.destination_name}</strong></h5>
                    <p className="card-text">
                        <br></br>
                        <br></br>
                        <strong>Reservation Name: </strong>{reservation.name}<br/>
                        <br></br>
                        <strong>Begins: </strong>{reservation.start_date}<br/>
                        <strong>Ends: </strong>{reservation.finish_date}<br/>
                        <strong>People: </strong>{reservation.people}<br/>

                    </p>
                    <div className="row">
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
  
  
        </div>
        </div>
      ) : (
        <div className="tli">
          Please log in.
        </div>
      )}
    </div>
  );
}

export default ReservationsList;
