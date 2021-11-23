import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AddReview from './components/add-review';
import Destination from './components/destination';
import DestinationsList from './components/destination-list';
import Login from './components/login';
import Home from './components/home';

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      <nav className="navbar navbar-default navbar-expand-lg navbar-light">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Trav<b>Mex</b></a>
          <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
            <span className="navbar-toggler-icon"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>

        <div id="navbarCollapse" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><a href="#">Home</a></li>
            <li className="nav-item">
              <Link to={"/destinations"} className="nav-link">
                Destinations
              </Link>
            </li>
            <li><a href="#">Reservations</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
            { user ? (
              <a onClick={logout} style={{cursor:'pointer'}} className="btn btn-primary dropdown-toggle get-started-btn mt-1 mb-1 su">
              Logout {user.name}
              </a>
              ) : (            
            <Link to={"/login"} className="btn btn-primary dropdown-toggle get-started-btn mt-1 mb-1 su">
              Login
            </Link>
            )}
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/destinations"]} component={DestinationsList} />
          <Route 
            path="/destinations/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/destinations/:id"
            render={(props) => (
              <Destination {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
