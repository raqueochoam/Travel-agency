import React, { useState, useEffect } from "react";
import DestinationDataService from "../services/destination";
import { Link } from "react-router-dom";

const Destination = props => {
  const initialDestinationState = {
    id: null,
    name: "",
    address: {},
    state: "",
    reviews: []
  };
  const [destination, setDestination] = useState(initialDestinationState);

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

  const deleteReview = (reviewId, index) => {
    DestinationDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setDestination((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {destination ? (
        <div>
          <h5>{destination.name}</h5>
          <p>
            <strong>State: </strong>{destination.state}<br/>
            <strong>Other Info: </strong>{destination.currency}, {destination.language}, {destination.zone}
          </p>
          <Link to={"/destinations/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {destination.reviews.length > 0 ? (
              destination.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {review.text}<br/>
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date}
                       </p>
                       {props.user && props.user.id === review.user_id &&
                          <div className="row">
                            <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={{
                              pathname: "/destinations/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No destination selected.</p>
        </div>
      )}
    </div>
  );
};

export default Destination;