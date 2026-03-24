import { useEffect, useState } from "react";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    fetch(`http://YOUR_EC2_IP:5000/api/wishlist/${userId}`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div>
      <h2>My Wishlist</h2>

      {items.length === 0 ? (
        <p>No items</p>
      ) : (
        items.map(item => (
          <div key={item._id}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
}