import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/home")}>
        SmartTech
      </div>

      <input
        className="search-box"
        placeholder="Search laptops..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/search/${e.target.value}`);
          }
        }}
      />

      <div className="nav-links">
        <span onClick={() => navigate("/wishlist")}>Wishlist</span>
        <span onClick={() => navigate("/cart")}>Cart</span>
        <span onClick={() => navigate("/orders")}>Orders</span>
        <span onClick={logout}>Logout</span>
      </div>
    </div>
  );
}