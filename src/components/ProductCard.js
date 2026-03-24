import API from "../api";

export default function ProductCard({ p, refresh }) {
  const userId = localStorage.getItem("userId");

  const addCart = async () => {
    await API.post("/cart/add", { userId, productId: p._id });
    refresh && refresh();
  };

  const addWishlist = async () => {
    await API.post("/wishlist/add", { userId, productId: p._id });
  };

  return (
    <div className="card">
      <img src={p.image} alt="" />
      <h3>{p.name}</h3>
      <p className="brand">{p.brand}</p>
      <p className="price">₹{p.price}</p>
      <p className="features">{p.features}</p>

      <div className="card-btns">
        <button onClick={addCart}>Cart</button>
        <button onClick={addWishlist}>❤️</button>
      </div>
    </div>
  );
}