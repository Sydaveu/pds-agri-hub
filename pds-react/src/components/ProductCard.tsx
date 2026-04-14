import { useState } from "react";

const ProductCard = ({ name, price, image, onAdd }: any) => {
  const [qty, setQty] = useState(1);

  return (
    <div
      style={{
        background: "#111",
        borderRadius: "12px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: "120px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      <h4>{name}</h4>
      <p>π {price}</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
        <input
          type="number"
          value={qty}
          min={1}
          onChange={(e) => setQty(Number(e.target.value))}
          style={{ width: "50px" }}
        />

        <button onClick={() => onAdd({ name, price }, qty)}>
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
