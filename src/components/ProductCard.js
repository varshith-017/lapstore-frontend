import API from "../api";

export default function ProductCard({ p, refresh }) {
  const userId = localStorage.getItem("userId");

  const addCart = async () => {
    await API.post("/cart/add", { userId, productId: p._id });
    refresh && refresh();
  };

 const addToWishlist = async (id) => {
  const userId = localStorage.getItem("userId");

  await fetch("http://51.21.250.111:5000/api/wishlist/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId,
      productId: id
    })
  });

  alert("Added to wishlist");
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
        <button onClick={() => addToWishlist(p._id)}>❤️</button>
      </div>
    </div>
  );
}