import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import "../styles.css";

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });

  const userId = localStorage.getItem("userId");

  // FETCH CART
  const loadCart = () => {
    API.get(`/cart/${userId}`)
      .then(res => setCart(res.data || { items: [] }))
      .catch(() => setCart({ items: [] }));
  };

  useEffect(() => {
    loadCart();
  }, []);

  // REMOVE ITEM
  const removeItem = async (productId) => {
    await API.post("/cart/remove", { userId, productId });
    loadCart();
  };

  const items = cart?.items || [];

  // TOTAL PRICE
  const total = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="cart-container">
        <h2>Your Cart</h2>

        {items.length === 0 ? (
          <h3>Cart is empty 😢</h3>
        ) : (
          <>
            {items.map(item => (
              <div className="cart-card" key={item._id}>
                <img src={item.productId.image} alt="" />

                <div>
                  <h3>{item.productId.name}</h3>
                  <p>₹{item.productId.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.productId._id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <h2>Total: ₹{total}</h2>
          </>
        )}
      </div>
    </>
  );
}