import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import Spinner from "react-spinner-material";

export const AlertError = (text) => {
  let textEl = "Something went wrong!";
  if (text) textEl = text;
  Swal.fire({
    icon: "error",
    text: textEl,
  });
};

export const openInNewTab = (url) => {
  return () => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
};

export const Loader = ({ visible }) => {
  let displayLoader = "none";
  if (visible === true) {
    displayLoader = "block";
  }
  return (
    <div
      style={{
        width: "100vw",
        height: "110vh",
        position: "absolute",
        zIndex: "9999",
        background: "white",
        display: displayLoader,
        top: "0",
      }}
    >
      <Spinner
        style={{
          position: "absolute",
          top: "calc(50% - 60px)",
          left: "calc(50% - 60px)",
        }}
        radius={120}
        color={"#333"}
        stroke={2}
        visible={visible}
      />
    </div>
  );
};

export const getUserInfo = () => {
  const jwtToken = localStorage.getItem("access_token");
  const decoded = jwt_decode(jwtToken);
  if (!decoded || (decoded && !decoded.user)) {
    return null;
  }

  return decoded.user;
};

export const snakeToTitle = (str) => {
  return str
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}