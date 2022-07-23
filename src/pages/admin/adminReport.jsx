import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "../../css/admin/adminMain.css";
import UserData from "./components/userData";
import { useState } from "react";
import { Box, Grid, GridItem, Heading, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import formatThousands from "format-thousands";
import moment from "moment";
import axios from "../../lib/axios";
import SidebarMain from "../product/components/sidebar/sidebarMain";
import { openInNewTab } from "../../utils";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  } from "@fortawesome/free-regular-svg-icons";
import { faMoneyBill1 } from "@fortawesome/free-solid-svg-icons";
import Header from "../user/components/header";

function AdminReport() {
  const global = useSelector((state) => state);
  const user = global.user;
  const [users, setUser] = useState("");

  const [date, setDate] = useState(moment());
  const [profit, setProfit] = useState(0);
  const [gross, setGross] = useState(0);
  const [numOfSales, setNumOfSales] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [trnList, setTrnList] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      transactions: [],
      users_data: [],
    };
    axios.get("/api/users")
      .then((respond1) => {
        setUser(respond1.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  useEffect(() => {
    axios.post("/api/admin/report", {
      date: date.format("YYYY-MM-DD"),
      // date: "2022-07-01",
    })
      .then((res) => {
        console.log("res.data");
        console.log(res.data);
        setProfit(res.data.profit);
        setGross(res.data.gross);
        setNumOfSales(res.data.total_transactions);
        setTopProducts(res.data.top_products);
        setTrnList(res.data.transaction_list)
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
    <div>
      <SidebarMain />
      <div style={{ padding: "40px", width: "85%", marginLeft: "15%" }}>
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
          style={{ marginBottom: "30px", outline: "auto", padding: "20px" }}
        />
        <Stack style={{paddingLeft: "122px"}} spacing={8} direction="row">
          {/* <Stats title={"Omset"} value={formatThousands(100000, ".")} /> */}
          
          <Stats title={"Profit"} value={formatThousands(profit, ".")} />
          <Stats title={"Gross"} value={formatThousands(gross, ".")} />
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
        <br />
        {trnList && trnList.length > 0 && <div>
          <TableContainer overflowX={"scroll"}>
            <Table variant='striped' scroll>
              <Thead>
                <Tr>
                  <Th style={{minWidth: "180px"}} className="text-center">Transaction Time</Th>
                  <Th style={{minWidth: "170px"}} className="text-center">Invoice Number</Th>
                  <Th style={{minWidth: "160px"}} className="text-center">Total Payment</Th>
                  <Th style={{minWidth: "180px"}} className="text-center">Name</Th>
                  <Th style={{minWidth: "130px"}} className="text-center">Quantity</Th>
                  <Th style={{minWidth: "150px"}} className="text-center">Price</Th>
                  <Th style={{minWidth: "150px"}} className="text-center">Cost of Capital</Th>
                  <Th style={{minWidth: "150px"}} className="text-center">Profit</Th>
                  <Th style={{minWidth: "150px"}} className="text-center">Payment Proof Path</Th>
                </Tr>
              </Thead>
              <Tbody>
                {trnList.map((el) => {
                  return <Tr>
                    <Td className="text-center">{moment(el.created_at).format("DD-MM-YYYY")}</Td>
                    <Td className="text-center">{el.inv_number}</Td>
                    <Td className="text-center">{formatThousands(el.total_payment, ".")}</Td>
                    <Td className="text-center">{el.name}</Td>
                    <Td className="text-center">{formatThousands(el.volume, ".")}</Td>
                    <Td className="text-center">{formatThousands(el.price, ".")}</Td>
                    <Td className="text-center">{formatThousands(el.price_capital, ".")}</Td>
                    <Td className="text-center">{formatThousands(el.profit, ".")}</Td>
                    <Td className="text-center"><Button onClick={openInNewTab(el.payment_proof_path)}>Link</Button></Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {trnList.map((el) => {
                    return <Tr>
                      <Td className="text-center">{moment(el.created_at).format("DD-MM-YYYY")}</Td>
                      <Td className="text-center">{el.inv_number}</Td>
                      <Td className="text-center">{formatThousands(el.total_payment, ".")}</Td>
                      <Td className="text-center">{el.name}</Td>
                      <Td className="text-center">{formatThousands(el.volume, ".")}</Td>
                      <Td className="text-center">{formatThousands(el.price, ".")}</Td>
                      <Td className="text-center">{formatThousands(el.price_capital, ".")}</Td>
                      <Td className="text-center">{formatThousands(el.profit, ".")}</Td>
                      <Td className="text-center"><Button onClick={openInNewTab(el.payment_proof_path)}>Link</Button></Td>
                    </Tr>
                  })}
                </Tbody>
                <Tfoot>
                </Tfoot>
              </Table>
            </TableContainer>
          </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminReport;