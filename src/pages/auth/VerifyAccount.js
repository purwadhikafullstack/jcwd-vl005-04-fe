import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import { Loader } from "../../utils";
import Swal from "sweetalert2";
import axios from "../../lib/axios";

function VerifyAccount(props) {
  const parsed = qs.parse(useLocation().search);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (parsed && parsed.token) {
      axios
        .post("/api/auth/email-verify", {
          token: parsed.token,
        })
        .then(() => {
          setIsLoading(false);
          Swal.fire("Your email has been verified!").then(() => {
            navigate("/login");
          });
        })
        .catch((error) => {
          setIsLoading(false);
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
          }).then(() => {
            navigate("/login");
          });
        });
    } else {
      navigate("/login");
    }
  }, []);

  return <Loader visible={isLoading} />;
}

export default VerifyAccount;
