import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import PageTitle from "../../../components/shared/PageTitle";
import Sidebar from "../../../components/shared/Sidebar/Sidebar";
import Container from "../../../components/Container";
import SectionTitle from "../../../components/shared/SectionTitle";
import MyOrder from "./MyOrder";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState([]);
  const navigate = useNavigate("");

  useEffect(() => {
    fetch(
      `https://the-memory-maker-server.vercel.app/myOrders/${user?.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => setMyOrders(data));
  }, [user?.email, navigate, myOrders]);

  return (
    <Container>
      <PageTitle title="My Orders" />
      <div className="d-flex align-items-center">
        <Sidebar />

        <div className="w-100">
          <SectionTitle title={`My Orders (${myOrders?.length})`} />
        </div>
      </div>

      <div data-aos="fade-down" data-aos-duration="2000">
        <Table responsive bordered hover className="mb-0">
          <thead>
            <tr>
              <th></th>
              <th className="table-head item">Name</th>
              <th className="table-head text-center">Email</th>
              <th className="table-head text-center">Phone Number</th>
              <th className="table-head text-center">Country</th>
              <th className="table-head text-center">Address</th>
              <th className="table-head text-center">State</th>
              <th className="table-head text-center">City</th>
              <th className="table-head text-center text-nowrap">
                Postal Code
              </th>
              <th className="table-head text-center text-nowrap">
                Date (MM-DD-YYYY)
              </th>
              <th className="table-head text-center">Time</th>
              <th className="table-head text-center">Amount</th>
              <th className="table-head text-center">Transaction ID</th>
              <th className="table-head text-center">Orders</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((data, index) => (
              <MyOrder key={data._id} data={data} index={index} />
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default MyOrders;
