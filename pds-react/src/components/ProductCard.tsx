import { useState } from "react";

export default function ProductCard({ product, addToCart }: any) {
  const [qty, setQty] = useState(1);

  return (
    <div style={{
      background: "#111",
      padding: 15,
      borderRadius: 10,
      width: 160
    }}>
      <img
        src={product.image_url || "https://via.placeholder.com/150"}
        style={{ width: "100%" }}
      />

      <h4>{product.name}</h4>
      <p>₦{product.price}</p>

      <select
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      >
        {Array.from({ length: 60 }, (_, i) => (
          <option key={i + 1}>{i + 1}</option>
        ))}
      </select>

      <button
        onClick={() =>
          addToCart({ ...product, quantity: qty })
        }
      >
        Add {qty}
      </button>
    </div>
  );
}
