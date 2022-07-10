import { Button } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="small-box text-center">
      <h1>Page Not Found</h1>
      <br/>
      <div>
        Go to{" "}
        <Link className="link-anton" to="/">
          <Button>Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
