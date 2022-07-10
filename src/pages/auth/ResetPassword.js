import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../lib/axios";
import Swal from "sweetalert2";
import qs from "query-string";
import { Form, Button, InputGroup } from "react-bootstrap";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ResetPassword() {
  const navigate = useNavigate();
  const parsed = qs.parse(useLocation().search);
  const [passwordShow, setPasswordShow] = useState(false);

  useEffect(() => {
    if (parsed && parsed.token) {
      axios
        .post("/api/auth/reset-password-token-validate", {
          token: parsed.token,
        })
        .then((response) => {
          if (response && response.data) {
            if (response.data.status !== "ok") {
              Swal.fire({
                icon: "error",
                text: "Something went wrong!",
              }).then((res) => {
                navigate("/login");
              });
            }
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
          }).then(() => {
            navigate("/login");
          });
        });
    }
  }, [0]);

  const onSubmit = async (e) => {
    e.preventDefault();

    let response;
    try {
      response = await axios.post("/api/auth/reset-password", {
        token: parsed.token,
        password: password,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }

    if (response && response.data) {
      if (response.data.status === "ok") {
        Swal.fire("success").then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Something went wrong!",
        });
      }
    }
  };

  const [password, setPassword] = useState("");
  return (
    <div className="small-box">
      <Form className="mb-3" onSubmit={onSubmit}>
        <h2 className="text-center mb-3">Reset Password</h2>
        <hr className="mb-4" />
        <Form.Group className="mb-3">
          <InputGroup className="mb-3">
            <Form.Control
              type={passwordShow ? "text" : "password"}
              placeholder={"Input new password"}
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
        <Button className="w-100" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;
