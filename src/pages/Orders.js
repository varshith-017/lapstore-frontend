import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return; // prevent crash

    API.get(`/orders/${userId}`)
      .then((res) => setOrders(res.data || []))
      .catch((err) => {
        console.log(err);
        setOrders([]); // fallback
      });
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="orders">
        {orders.length === 0 ? (
          <p>No Orders Found</p>
        ) : (
          orders.map((o) => (
            <div className="order-card" key={o._id}>
              <p>Total: ₹{o.total}</p>
              <p>Status: {o.status}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}