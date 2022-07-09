import { useState } from "react";
import axios from "../../lib/axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import freeEmailDomains from "free-email-domains";
import emailvalidator from "email-validator";
import passwordValidator from "password-validator";
import { AlertError } from "../../utils";

const Register = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmShow, setPasswordConfirmShow] = useState(false);

  const validPassword = (pwd) => {
    var schema = new passwordValidator();

    schema
      .is()
      .min(8) // Minimum length 8
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase()
      .has()
      .digits(1);

    return schema.validate(pwd);
  };

  const validUsername = (input) => {
    var schema = new passwordValidator();

    schema.is().min(5).max(10);

    return schema.validate(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validasi

    if (!validUsername(username)) {
      return AlertError("Username should be min 5-10 characters!");
    }

    const isValidEmail = emailvalidator.validate(email);
    if (!isValidEmail) {
      return AlertError("Invalid email format");
    }

    const emailDomain = email.split("@")[1];
    const isValidEmailDomains = freeEmailDomains.includes(emailDomain);
    if (!isValidEmailDomains) {
      return AlertError(`Invalid email domain: ${emailDomain}`);
    }

    if (password !== passwordConfirm) {
      return AlertError("Password different with confirmation");
    }

    if (!validPassword(password)) {
      return AlertError(
        "Password should have min 8 char, uppercase and lowercase alphabets, and number"
      );
    }

    axios
      .post("/api/auth/register", {
        username: username,
        email: email,
        birthday: birthday,
        password: password,
        confirm_password: passwordConfirm,
      })
      .then(() => {
        Swal.fire("Verification link has sent to your email!").then(() => {
          navigate("/login");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  return (
    <div className="small-box">
      <Form onSubmit={handleSubmit} className="mb-3">
        <h2 className="text-center mb-3">Register</h2>
        <hr className="mb-4" />
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type={"text"}
            placeholder={"Username"}
            label={"Username"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type={"email"}
            placeholder={"Email"}
            label={"Email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type={"date"}
            placeholder={"Birthday"}
            label={"Birthday"}
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type={passwordShow ? "text" : "password"}
              placeholder={"Password"}
              label={"Password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <InputGroup.Text className="p-0">
              <Button
                variant="light"
                onClick={() => {
                  setPasswordShow(!passwordShow);
                }}
              >
                <FontAwesomeIcon icon={passwordShow ? faEyeSlash : faEye} />
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type={passwordConfirmShow ? "text" : "password"}
              placeholder={"Confirm Password"}
              label={"Confirm Password"}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
            />
            <InputGroup.Text className="p-0">
              <Button
                variant="light"
                onClick={() => {
                  setPasswordConfirmShow(!passwordConfirmShow);
                }}
              >
                <FontAwesomeIcon
                  icon={passwordConfirmShow ? faEyeSlash : faEye}
                />
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Button className="w-100" variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <p className="text-center">
        <Link className="link-anton" to="/forgot-password">Forgot Password</Link> Or{" "}
        <Link className="link-anton" to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
