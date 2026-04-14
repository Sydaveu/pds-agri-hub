import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { useNavigate } from "react-router-dom";

import rice from "../assets/products/rice.jpg";
import maize from "../assets/products/maize.jpg";
import beans from "../assets/products/beans.jpg";
import goat from "../assets/products/goat.jpg";
import chicken from "../assets/products/chicken.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any, qty: number) => {
    const existing = cart.find((item) => item.name === product.name);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? { ...item, qty: item.qty + qty }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  const removeFromCart = (name: string) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const products = [
    { name: "Rice", price: 2, image: rice, category: "Grains" },
    { name: "Maize", price: 1.8, image: maize, category: "Grains" },
    { name: "Beans", price: 1.5, image: beans, category: "Legumes" },
    { name: "Goat", price: 15, image: goat, category: "Livestock" },
    { name: "Chicken", price: 5, image: chicken, category: "Livestock" },
  ];

  const categories = ["Grains", "Legumes", "Livestock"];

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2 style={{ textAlign: "center" }}>
        🌾 PDS Agri Marketplace
      </h2>

      {/* CHAT BUTTON */}
      <button
        onClick={() => navigate("/chat")}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#00bcd4",
          color: "white",
          border: "none",
          padding: "12px",
          borderRadius: "25px",
          cursor: "pointer",
        }}
      >
        💬 Chat
      </button>

      {categories.map((cat) => (
        <div key={cat}>
          <h3>{cat}</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "15px",
            }}
          >
            {products
              .filter((p) => p.category === cat)
              .map((p, i) => (
                <ProductCard
                  key={i}
                  name={p.name}
                  price={p.price}
                  image={p.image}
                  onAdd={addToCart}
                />
              ))}
          </div>
        </div>
      ))}

      <Cart cart={cart} removeFromCart={removeFromCart} total={total} />
    </div>
  );
};

export default Home;
