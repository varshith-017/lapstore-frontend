import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <h2 className="logo">SmartTech</h2>

      <input className="search" placeholder="Search laptops..." />

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/orders">Orders</Link>
        <span onClick={logout}>Logout</span>
      </div>
    </div>
  );
}