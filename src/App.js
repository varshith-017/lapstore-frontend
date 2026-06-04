import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";

function PrivateRoute({ children }) {
  const userId = localStorage.getItem("userId");
  return userId ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          }
        />
        <Route
  path="/search/:key"
  element={
    <PrivateRoute>
      <Search />
    </PrivateRoute>
  }
/>
      </Routes>
    </BrowserRouter>
      
  );
}
