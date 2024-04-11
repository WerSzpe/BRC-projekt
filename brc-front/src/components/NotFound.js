import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const NotFound = (props) => {
   return <div className="jumbotron">
       <Header />
       <h1 className="display-4">404 - Not found!</h1>
       <p className="lead">Page you are looking for does not exist.</p>
       <hr className="my-4"/>
        <p>Go back to Home</p>
       <Link className="btn btn-primary btn-lg" to="/" role="button">Home</Link>
   </div>;
};

export default NotFound;