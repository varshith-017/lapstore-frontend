import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    API.get(`/wishlist/${userId}`)
      .then((res) => setItems(res.data || []))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="wishlist-container">
        <h2>My Wishlist</h2>

        {items.length === 0 ? (
          <p>No items in wishlist</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="wishlist-card">
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
