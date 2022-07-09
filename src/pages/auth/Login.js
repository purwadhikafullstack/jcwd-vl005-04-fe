import React, { useState } from "react";
import profile from "../../images/a.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../lib/axios";
import Swal from "sweetalert2";
import { Form, Button, InputGroup } from "react-bootstrap";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
  let navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    let response;
    try {
      const reqBody = {
        username_or_email: usernameOrEmail,
        password: password,
      };
      if (keepLogin === true) {
        reqBody.keep_login = true;
      }

      response = await axios.post("/login", reqBody);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.code &&
        error.response.data.code === 101
      ) {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          showDenyButton: true,
          denyButtonText: "Re-send verification link",
        }).then((result) => {
          if (result.isDenied) {
            axios
              .post("/email-verify/resend", {
                username_or_email: usernameOrEmail,
                password: password,
              })
              .then((res) => {
                Swal.fire("success").then(() => {});
              })
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  text: error.response.data.message,
                });
              });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      }
    }
    if (response && response.data) {
      if (response.data.status === "ok") {
        localStorage.setItem("access_token", response.data.data.access_token);
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          text: "Something went wrong!",
        });
      }
    }
  };

  return (
    <div className="login-box">
      <div className="login__image--wrapper">
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className="text-center"></div>
      <div className="login-form-wrapper">
        <h2 className="text-center mb-3">Login Page</h2>
        <hr className="mb-4" />
        <Form className="mb-3" onSubmit={login}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="email"
              onChange={(e) => {
                setUsernameOrEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type={passwordShow ? "text" : "password"}
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <InputGroup.Text className="p-0">
                <Button
                  onClick={() => {
                    setPasswordShow(!passwordShow);
                  }}
                  variant="light"
                >
                  <FontAwesomeIcon icon={passwordShow ? faEyeSlash : faEye} />
                </Button>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Remember me"
              onChange={(e) => {
                setKeepLogin(e.target.checked);
              }}
            />
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit">
            Login
          </Button>
        </Form>

        <p className="text-center">
          <Link className="link-anton" to="/forgot-password">Forgot Password</Link> Or{" "}
          <Link className="link-anton" to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
