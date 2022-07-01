import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "../../css/admin/adminMain.css";
import Axios from "axios";
import UserData from "./components/userData";
import { useState } from "react";
import { Box, Grid, GridItem, Heading, Stack, Text } from "@chakra-ui/react";
import formatThousands from "format-thousands";
import moment from "moment";

function AdminReport() {
  const global = useSelector((state) => state);
  const user = global.user;
  const [users, setUser] = useState("");

  const [date, setDate] = useState(moment());
  const [profit, setProfit] = useState(0);
  const [numOfSales, setNumOfSales] = useState(0);
  const [topProducts, setTopProducts] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      transactions: [],
      users_data: [],
    };
    Axios.get("http://localhost:5001/api/users")
      .then((respond1) => {
        setUser(respond1.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  useEffect(() => {
    Axios.post("http://localhost:5001/api/admin/report", {
      date: date.format("YYYY-MM-DD"),
      // date: "2022-07-01",
    })
      .then((res) => {
        console.log("res.data");
        console.log(res.data);
        setProfit(res.data.profit);
        setNumOfSales(res.data.total_transactions);
        setTopProducts(res.data.top_products);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [date]);

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    if (!token) {
      if (user.role !== "admin" && users) {
        navigate("/");
      }
    }
  }, []);
  const generateUsersData = () => {
    if (users) {
      return users.map((user, index) => {
        return <UserData key={user.id} users={user} />;
      });
    }
  };

  const Stats = ({ title, value, list }) => {
    return (
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        style={{ textAlign: "center", minWidth: "200px" }}
      >
        <Heading
          fontSize="xl"
          style={{ marginBottom: "15px", color: "#777676" }}
        >
          {title}
        </Heading>
        {value ? <Heading fontSize="xxx-large">{value}</Heading> : list}
      </Box>
    );
  };
  return (
    <div style={{ margin: "40px" }}>
      <h1
        style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}
      >
        Report
      </h1>
      <hr style={{ marginBottom: "30px" }} />
      <input
        type={"date"}
        onChange={(e) => {
          console.log("e.target.value");
          console.log(e.target.value);
          setDate(moment(e.target.value));
        }}
        value={date.format("YYYY-MM-DD")}
        style={{ marginBottom: "30px" }}
      />
      <Stack spacing={8} direction="row">
        {/* <Stats title={"Omset"} value={formatThousands(100000, ".")} /> */}
        <Stats title={"Profit"} value={formatThousands(profit, ".")} />
        <Stats
          title={"Number of Sales"}
          value={formatThousands(numOfSales, ".")}
        />
        <Stats
          title={"Top 3 Most Sold"}
          list={
            topProducts.length > 0 ? (
              <ol
                style={{
                  textAlign: "left",
                  marginLeft: "20px",
                  fontWeight: "bold",
                }}
              >
                {topProducts.map((el) => {
                  return <li>{el.product_name}</li>;
                })}
              </ol>
            ) : undefined
          }
          value={topProducts.length === 0 ? "-" : undefined}
        />
      </Stack>
    </div>
  );
}
export default AdminReport;
