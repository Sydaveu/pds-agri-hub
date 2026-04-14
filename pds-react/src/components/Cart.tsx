const Cart = ({ cart, removeFromCart, total }: any) => {
  return (
    <div
      style={{
        marginTop: "20px",
        background: "#000",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <h3>🛒 Cart</h3>

      {cart.length === 0 && <p>No items</p>}

      {cart.map((item: any, index: number) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          {item.name} x {item.qty} — π {item.price * item.qty}

          <button
            onClick={() => removeFromCart(item.name)}
            style={{ marginLeft: "10px" }}
          >
            ❌
          </button>
        </div>
      ))}

      <hr />

      <h4>Total: π {total}</h4>

      <button
        style={{
          width: "100%",
          padding: "10px",
          background: "green",
          color: "#fff",
          border: "none",
        }}
      >
        Checkout (Pi 🚀)
      </button>
    </div>
  );
};

export default Cart;
