import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const addToCart = async () => {
    const userId = localStorage.getItem("userId");
    try {
      await API.post("/cart/add", { userId, productId: id });
      alert("Added to cart ✅");
    } catch (err) {
      console.log(err);
      alert("Failed to add to cart");
    }
  };

  const addToWishlist = async () => {
    const userId = localStorage.getItem("userId");
    try {
      await API.post("/wishlist/add", { userId, productId: id });
      alert("Added to wishlist ✅");
    } catch (err) {
      console.log(err);
      alert("Failed to add to wishlist");
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="page-center">Loading product...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="product-details">
        <div className="product-image-box">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        <div className="product-info">
          <p className="product-brand">{product.brand}</p>
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price">₹{product.price}</div>
          <p className="product-features">{product.features}</p>

          <div className="product-actions">
            <button className="btn-primary" onClick={addToCart}>
              Add to Cart
            </button>
            <button className="btn-secondary" onClick={addToWishlist}>
              Add to Wishlist
            </button>
          </div>

          <button className="btn-link" onClick={() => navigate("/home")}>
            ← Back to Home
          </button>
        </div>
      </div>
    </>
  );
}