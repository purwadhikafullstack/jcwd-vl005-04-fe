import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap";

function ForgotPassword() {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    let response;
    try {
      response = await axios.post("/api/auth/email/forgot-password", {
        username_or_email: usernameOrEmail,
      });
    } catch (error) {
      console.log("error");
      console.log(error);
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }

    if (response && response.data) {
      if (response.data.status === "ok") {
        Swal.fire("success").then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Something went wrong!",
        });
      }
    }
  };

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  return (
    <div className="small-box">
      <Form className="mb-3" onSubmit={onSubmit}>
        <h2 className="text-center mb-3">Forgot Password</h2>
        <hr className="mb-4" />
        <Form.Group className="mb-3">
          <Form.Control
            type={"text"}
            placeholder={"Email address or username"}
            onChange={(e) => {
              setUsernameOrEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Button className="w-100" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p className="text-center">
        <Link className="link-anton" to="/login">
          Login
        </Link>{" "}
        Or{" "}
        <Link className="link-anton" to="/register">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
