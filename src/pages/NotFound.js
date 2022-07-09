import { Button } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="login-box">
      <div>Page Not Found</div>
      <div>
        go to{" "}
        <Link className="link-anton" to="/">
          <Button>Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
