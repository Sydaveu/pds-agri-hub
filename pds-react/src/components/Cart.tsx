import PiCalculator from "./PiCalculator";

export default function Cart({ cart, setCart }: any) {
  function removeItem(index: number) {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  }

  const total = cart.reduce((sum: number, item: any) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);

  return (
    <div style={{
      marginTop: 20,
      background: "#000",
      padding: 20,
      borderRadius: 10
    }}>
      <h3>🛒 Cart</h3>

      {cart.length === 0 ? (
        <p>No items</p>
      ) : (
        <>
          {cart.map((item: any, i: number) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between"
            }}>
              <span>{item.name} x{item.quantity}</span>
              <span>₦{item.price * item.quantity}</span>
              <button onClick={() => removeItem(i)}>❌</button>
            </div>
          ))}

          <hr />

          <h4>Total: ₦{total}</h4>

          <button style={{
            background: "green",
            width: "100%",
            padding: 10
          }}>
            Checkout (Pi Coming 🚀)
          </button>

          <PiCalculator />
        </>
      )}
    </div>
  );
}
