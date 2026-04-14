import { useState } from "react";

export default function PiCalculator() {
  const [amount, setAmount] = useState(1);

  const rate = 314159;

  return (
    <div>
      <h4>π Calculator</h4>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <p>{amount * rate} Pi</p>
    </div>
  );
}
